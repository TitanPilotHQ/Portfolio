import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV };
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

describe("getRateLimiter degradation observability", () => {
  it("logs a privacy-safe warning and reports degraded mode when Upstash credentials are absent", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getRateLimiter, isRateLimiterDegraded } = await import("./rateLimit");

    expect(isRateLimiterDegraded()).toBe(false);
    getRateLimiter();

    expect(isRateLimiterDegraded()).toBe(true);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    const [message] = warnSpy.mock.calls[0];
    expect(message).toContain("memory rate limiting");
    // Never logs IPs, hashes, emails, names, or message content.
    expect(message).not.toMatch(/@/);
  });

  it("does not warn or report degraded mode when Upstash credentials are present", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "fixture-token";
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getRateLimiter, isRateLimiterDegraded } = await import("./rateLimit");

    getRateLimiter();

    expect(isRateLimiterDegraded()).toBe(false);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
