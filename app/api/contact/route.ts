import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contactSchema";
import { hashIp } from "@/lib/server/hashIp";
import { getRateLimiter } from "@/lib/server/rateLimit";
import { getNotificationProvider } from "@/lib/server/notification";
import { getLeadStore, type LeadRecord } from "@/lib/server/leadStore";
import { CONTACT_EMAIL } from "@/lib/content";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailBody(record: LeadRecord): { html: string; text: string } {
  const rows: [string, string][] = [
    ["Lead ID", record.lead_id],
    ["Company", record.company],
    ["Name", record.name],
    ["Work Email", record.work_email],
    ["Job Title", record.job_title],
    ["Desk Size", record.desk_size],
    ["Jurisdiction", record.jurisdiction],
    ["Asset Classes", record.asset_classes.join(", ")],
    ["Current AI Usage", record.ai_usage],
    ["Current Governance Method", record.governance_method],
    ["Primary Goal", record.primary_goal.join(", ")],
    ["Message", record.message],
    ["Submitted At (UTC)", record.submitted_at],
  ];

  const html = `<table>${rows
    .map(
      ([label, value]) =>
        `<tr><td><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { html, text };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const honeypotValue =
    typeof body === "object" && body !== null && "honeypot" in body
      ? (body as { honeypot?: unknown }).honeypot
      : undefined;
  if (typeof honeypotValue === "string" && honeypotValue.length > 0) {
    console.warn("[contact] spam attempt caught by honeypot", {
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "unknown",
    });
    return NextResponse.json({ success: true, leadId: null }, { status: 200 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const values = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const hashedIp = await hashIp(ip);

  const rateLimiter = getRateLimiter();
  const rateLimitResult = await rateLimiter.checkAndConsume(hashedIp);
  if (!rateLimitResult.allowed) {
    console.warn("[contact] rate limit exceeded", {
      hashedIp,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSeconds ?? 3600) },
      },
    );
  }

  const leadStore = getLeadStore();
  const leadId = await leadStore.getNextLeadId();

  const record: LeadRecord = {
    schema_version: 1,
    lead_id: leadId,
    uuid: crypto.randomUUID(),
    submitted_at: new Date().toISOString(),
    form_version: 1,
    source: "website/contact",
    company: values.company,
    name: values.name,
    work_email: values.workEmail,
    job_title: values.jobTitle,
    desk_size: values.deskSize,
    jurisdiction: values.jurisdiction,
    asset_classes: values.assetClassesOther
      ? [
          ...values.assetClasses.filter((v) => v !== "Other"),
          `Other: ${values.assetClassesOther}`,
        ]
      : values.assetClasses,
    ai_usage: values.aiUsageOther ? `Other: ${values.aiUsageOther}` : values.aiUsage,
    governance_method: values.governanceMethodOther
      ? `Other: ${values.governanceMethodOther}`
      : values.governanceMethod,
    primary_goal: values.primaryGoalOther
      ? [
          ...values.primaryGoal.filter((v) => v !== "Other"),
          `Other: ${values.primaryGoalOther}`,
        ]
      : values.primaryGoal,
    message: values.message,
    consent: values.consent,
    hashed_ip: hashedIp,
    user_agent: req.headers.get("user-agent") ?? "unknown",
    referrer: req.headers.get("referer"),
    utm: values.utm ?? null,
  };

  const { html, text } = buildEmailBody(record);

  const [emailResult, storageResult] = await Promise.allSettled([
    getNotificationProvider().send({
      to: CONTACT_EMAIL,
      subject: `New AI Desk Audit request — ${record.company} (${record.lead_id})`,
      html,
      text,
    }),
    leadStore.save(record),
  ]);

  const emailOk = emailResult.status === "fulfilled" && emailResult.value.success;
  const storageOk = storageResult.status === "fulfilled";

  if (!emailOk) {
    console.error("[contact] notification send failed", {
      leadId: record.lead_id,
      error:
        emailResult.status === "rejected" ? emailResult.reason : emailResult.value.error,
    });
  }
  if (!storageOk) {
    console.error("[contact] lead storage failed", {
      leadId: record.lead_id,
      error: storageResult.status === "rejected" ? storageResult.reason : undefined,
      record,
    });
  }

  if (!emailOk && !storageOk) {
    return NextResponse.json(
      { error: `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, leadId: record.lead_id }, { status: 200 });
}
