import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/server/hashIp", () => ({
  hashIp: vi.fn(async () => "hashed-ip-fixture"),
}));

vi.mock("@/lib/server/rateLimit", () => ({
  getRateLimiter: vi.fn(),
}));

vi.mock("@/lib/server/notification", () => ({
  getNotificationProvider: vi.fn(),
}));

vi.mock("@/lib/server/leadStore", () => ({
  getLeadStore: vi.fn(),
}));

import { hashIp } from "@/lib/server/hashIp";
import { getRateLimiter } from "@/lib/server/rateLimit";
import { getNotificationProvider, type NotificationParams } from "@/lib/server/notification";
import { getLeadStore, type LeadRecord } from "@/lib/server/leadStore";
import { POST } from "./route";

const VALID_PAYLOAD = {
  company: "Acme Trading",
  name: "Jane Doe",
  workEmail: "jane@example.com",
  jobTitle: "Head of Trading",
  deskSize: "6–10",
  jurisdiction: "United States",
  assetClasses: ["FX"],
  aiUsage: "ChatGPT",
  governanceMethod: "Manual Review",
  primaryGoal: ["AI Governance"],
  message: "We want to evaluate Titan Pilot for our desk.",
  consent: true,
};

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

let consoleWarn: ReturnType<typeof vi.spyOn>;
let consoleError: ReturnType<typeof vi.spyOn>;
let nextLeadId: number;
let saveMock: Mock<(record: LeadRecord) => Promise<void>>;
let sendMock: Mock<(params: NotificationParams) => Promise<{ success: boolean; error?: string }>>;
let checkAndConsumeMock: Mock<(key: string) => Promise<{ allowed: boolean; retryAfterSeconds?: number }>>;

beforeEach(() => {
  consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
  consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

  nextLeadId = 1;
  saveMock = vi.fn(async () => {});
  sendMock = vi.fn(async () => ({ success: true }));
  checkAndConsumeMock = vi.fn(async () => ({ allowed: true }));

  vi.mocked(getLeadStore).mockReturnValue({
    getNextLeadId: vi.fn(async () => `TP-2026-${String(nextLeadId++).padStart(6, "0")}`),
    save: saveMock,
  });
  vi.mocked(getNotificationProvider).mockReturnValue({ send: sendMock });
  vi.mocked(getRateLimiter).mockReturnValue({ checkAndConsume: checkAndConsumeMock });
  vi.mocked(hashIp).mockResolvedValue("hashed-ip-fixture");
});

afterEach(() => {
  vi.restoreAllMocks();
});

function allConsoleOutput() {
  return JSON.stringify([...consoleWarn.mock.calls, ...consoleError.mock.calls]);
}

describe("POST /api/contact", () => {
  it("rejects an unparsable JSON body with 400 and no-store", async () => {
    const res = await POST(makeRequest("{not valid json"));
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.error).toBe("Invalid request body");
  });

  it("returns field-level validation errors for invalid form data", async () => {
    const res = await POST(makeRequest({ ...VALID_PAYLOAD, workEmail: "not-an-email", consent: false }));
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.fieldErrors.workEmail).toBeTruthy();
    expect(body.fieldErrors.consent).toBeTruthy();
    expect(saveMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns a fake success for honeypot submissions without touching storage or email", async () => {
    const res = await POST(makeRequest({ ...VALID_PAYLOAD, honeypot: "i-am-a-bot" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.leadId).toMatch(/^TP-\d{4}-000000$/);
    expect(saveMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
    expect(checkAndConsumeMock).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After when the rate limiter rejects the request", async () => {
    checkAndConsumeMock.mockResolvedValue({ allowed: false, retryAfterSeconds: 120 });
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("120");
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect(saveMock).not.toHaveBeenCalled();
  });

  it("still succeeds and logs PII-safely when only email delivery fails", async () => {
    sendMock.mockResolvedValue({ success: false, error: "provider unavailable" });
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalled();
    const output = allConsoleOutput();
    expect(output).not.toContain(VALID_PAYLOAD.name);
    expect(output).not.toContain(VALID_PAYLOAD.workEmail);
    expect(output).not.toContain(VALID_PAYLOAD.message);
  });

  it("still succeeds and logs PII-safely when only lead persistence fails", async () => {
    saveMock.mockRejectedValue(new Error("redis unavailable"));
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalled();
    const output = allConsoleOutput();
    expect(output).not.toContain(VALID_PAYLOAD.name);
    expect(output).not.toContain(VALID_PAYLOAD.workEmail);
    expect(output).not.toContain(VALID_PAYLOAD.message);
  });

  it("returns a generic 500 fallback and leaks no PII when both email and storage fail", async () => {
    sendMock.mockResolvedValue({ success: false, error: "provider unavailable" });
    saveMock.mockRejectedValue(new Error("redis unavailable"));
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(500);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.error).toContain("email us directly");
    const output = allConsoleOutput();
    expect(output).not.toContain(VALID_PAYLOAD.name);
    expect(output).not.toContain(VALID_PAYLOAD.workEmail);
    expect(output).not.toContain(VALID_PAYLOAD.message);
  });

  it("has no idempotency guard: identical resubmissions consume distinct sequential lead IDs", async () => {
    const first = await POST(makeRequest(VALID_PAYLOAD));
    const second = await POST(makeRequest(VALID_PAYLOAD));
    const firstBody = await first.json();
    const secondBody = await second.json();
    expect(firstBody.leadId).toBe("TP-2026-000001");
    expect(secondBody.leadId).toBe("TP-2026-000002");
    expect(firstBody.leadId).not.toBe(secondBody.leadId);
    expect(saveMock).toHaveBeenCalledTimes(2);
  });

  it("returns Cache-Control: no-store on a fully successful submission", async () => {
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.leadId).toBe("TP-2026-000001");
  });
});
