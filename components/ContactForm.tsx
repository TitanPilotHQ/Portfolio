"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import {
  AI_USAGE_VALUES,
  ASSET_CLASS_VALUES,
  DESK_SIZE_VALUES,
  GOVERNANCE_METHOD_VALUES,
  PRIMARY_GOAL_VALUES,
} from "@/lib/contactSchema";
import {
  CONTACT_CONFIRMATION,
  CONTACT_FORM_SECTIONS,
  CONTACT_PRIVACY_STATEMENT,
  CONTACT_WHAT_HAPPENS_NEXT,
} from "@/lib/content";
import { Reveal } from "./ui";
import { SearchableSelect } from "./SearchableSelect";
import { MultiSelectField } from "./MultiSelectField";

interface FormState {
  company: string;
  name: string;
  workEmail: string;
  jobTitle: string;
  deskSize: string;
  jurisdiction: string;
  assetClasses: string[];
  assetClassesOther: string;
  aiUsage: string;
  aiUsageOther: string;
  governanceMethod: string;
  governanceMethodOther: string;
  primaryGoal: string[];
  primaryGoalOther: string;
  message: string;
  consent: boolean;
}

const EMPTY_STATE: FormState = {
  company: "",
  name: "",
  workEmail: "",
  jobTitle: "",
  deskSize: "",
  jurisdiction: "",
  assetClasses: [],
  assetClassesOther: "",
  aiUsage: "",
  aiUsageOther: "",
  governanceMethod: "",
  governanceMethodOther: "",
  primaryGoal: [],
  primaryGoalOther: "",
  message: "",
  consent: false,
};

const SECTION_FIELDS: Record<string, (keyof FormState)[]> = {
  aboutYou: ["company", "name", "workEmail", "jobTitle", "deskSize", "jurisdiction"],
  tradingProfile: ["assetClasses", "aiUsage", "governanceMethod"],
  lookingFor: ["primaryGoal", "message"],
  consent: ["consent"],
};

function isSectionComplete(state: FormState, fields: (keyof FormState)[]): boolean {
  return fields.every((field) => {
    const v = state[field];
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "boolean") return v;
    return v.trim().length > 0;
  });
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY_STATE);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [utm, setUtm] = useState<Record<string, string> | null>(null);

  const startedRef = useRef(false);
  const completedSectionsRef = useRef(new Set<string>());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries = ["source", "medium", "campaign", "term", "content"]
      .map((key) => [key, params.get(`utm_${key}`)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1]));
    if (entries.length > 0) setUtm(Object.fromEntries(entries));
  }, []);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_started");
    }
  }

  function checkSectionCompletion(nextValues: FormState) {
    for (const [section, fields] of Object.entries(SECTION_FIELDS)) {
      if (!completedSectionsRef.current.has(section) && isSectionComplete(nextValues, fields)) {
        completedSectionsRef.current.add(section);
        track("contact_step_completed", { section });
      }
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    markStarted();
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      checkSectionCompletion(next);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    setErrors({});
    setSubmitting(true);
    track("contact_submitted");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, honeypot, utm }),
      });

      if (response.status === 429) {
        track("contact_rate_limited");
        const errBody = await response.json().catch(() => null);
        setServerError(errBody?.error ?? "Too many submissions. Please try again later.");
        return;
      }

      if (response.status === 400) {
        const errBody = await response.json().catch(() => null);
        const fieldErrors = errBody?.fieldErrors ?? {};
        track("contact_validation_failed", { fields: Object.keys(fieldErrors).join(",") });
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([k, v]) => [
              k,
              Array.isArray(v) ? String(v[0]) : String(v),
            ]),
          ),
        );
        return;
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        setServerError(errBody?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const okBody = await response.json();
      track("contact_success");
      setLeadId(okBody.leadId ?? null);
      setSubmitted(true);
    } catch {
      setServerError("Network error — please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";
  const labelClass = "mb-1.5 block text-xs font-medium text-secondary";
  const errorClass = "mt-1.5 text-xs text-amber";

  if (submitted) {
    return (
      <Reveal className="mx-auto max-w-xl">
        <div className="glass-strong rounded-2xl p-10 text-center sm:p-14">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {CONTACT_CONFIRMATION.title}
          </h2>
          <p className="mt-3 text-base text-secondary">{CONTACT_CONFIRMATION.subtitle}</p>
          {leadId ? (
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              Reference {leadId}
            </p>
          ) : null}
          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {CONTACT_WHAT_HAPPENS_NEXT.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-secondary">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="glass-strong space-y-12 rounded-2xl p-8 sm:p-12">
        <input
          type="text"
          name="hp-field"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] size-px opacity-0"
          aria-label="Leave this field blank"
        />

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.aboutYou}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-company" className={labelClass}>Company Name</label>
              <input
                id="cf-company"
                required
                className={inputClass}
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
              />
              {errors.company ? <p className={errorClass}>{errors.company}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-name" className={labelClass}>Full Name</label>
              <input
                id="cf-name"
                required
                className={inputClass}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name ? <p className={errorClass}>{errors.name}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>Work Email</label>
              <input
                id="cf-email"
                type="email"
                required
                className={inputClass}
                value={values.workEmail}
                onChange={(e) => update("workEmail", e.target.value)}
              />
              {errors.workEmail ? <p className={errorClass}>{errors.workEmail}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-title" className={labelClass}>Job Title</label>
              <input
                id="cf-title"
                required
                className={inputClass}
                value={values.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
              />
              {errors.jobTitle ? <p className={errorClass}>{errors.jobTitle}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-desk-size" className={labelClass}>Desk Size</label>
              <select
                id="cf-desk-size"
                required
                className={inputClass}
                value={values.deskSize}
                onChange={(e) => update("deskSize", e.target.value)}
              >
                <option value="" disabled>Select…</option>
                {DESK_SIZE_VALUES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.deskSize ? <p className={errorClass}>{errors.deskSize}</p> : null}
            </div>
            <div>
              <SearchableSelect
                label="Jurisdiction"
                options={COUNTRIES}
                value={values.jurisdiction}
                onChange={(v) => update("jurisdiction", v)}
                required
              />
              {errors.jurisdiction ? <p className={errorClass}>{errors.jurisdiction}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.tradingProfile}
          </h3>
          <div>
            <MultiSelectField
              label="Asset Classes"
              options={ASSET_CLASS_VALUES}
              value={values.assetClasses}
              onChange={(v) => update("assetClasses", v)}
              otherValue={values.assetClassesOther}
              onOtherChange={(v) => update("assetClassesOther", v)}
            />
            {errors.assetClasses ? <p className={errorClass}>{errors.assetClasses}</p> : null}
          </div>
          <div>
            <label htmlFor="cf-ai-usage" className={labelClass}>Current AI Usage</label>
            <select
              id="cf-ai-usage"
              required
              className={inputClass}
              value={values.aiUsage}
              onChange={(e) => update("aiUsage", e.target.value)}
            >
              <option value="" disabled>Select…</option>
              {AI_USAGE_VALUES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {values.aiUsage === "Other" ? (
              <input
                className={`${inputClass} mt-2.5`}
                placeholder="Please specify…"
                value={values.aiUsageOther}
                onChange={(e) => update("aiUsageOther", e.target.value)}
              />
            ) : null}
          </div>
          <div>
            <label htmlFor="cf-governance" className={labelClass}>
              Current Governance Method
            </label>
            <select
              id="cf-governance"
              required
              className={inputClass}
              value={values.governanceMethod}
              onChange={(e) => update("governanceMethod", e.target.value)}
            >
              <option value="" disabled>Select…</option>
              {GOVERNANCE_METHOD_VALUES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {values.governanceMethod === "Other" ? (
              <input
                className={`${inputClass} mt-2.5`}
                placeholder="Please specify…"
                value={values.governanceMethodOther}
                onChange={(e) => update("governanceMethodOther", e.target.value)}
              />
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.lookingFor}
          </h3>
          <div>
            <MultiSelectField
              label="Primary Goal"
              options={PRIMARY_GOAL_VALUES}
              value={values.primaryGoal}
              onChange={(v) => update("primaryGoal", v)}
              otherValue={values.primaryGoalOther}
              onOtherChange={(v) => update("primaryGoalOther", v)}
            />
            {errors.primaryGoal ? <p className={errorClass}>{errors.primaryGoal}</p> : null}
          </div>
          <div>
            <label htmlFor="cf-message" className={labelClass}>Message</label>
            <textarea
              id="cf-message"
              required
              rows={5}
              className={inputClass}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
            />
            {errors.message ? <p className={errorClass}>{errors.message}</p> : null}
          </div>
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <label className="flex items-start gap-3 text-sm text-secondary">
            <input
              type="checkbox"
              required
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5 size-4 rounded border-white/20 bg-transparent text-cyan focus:ring-1 focus:ring-cyan/40"
            />
            <span>
              I agree to be contacted about this enquiry. {CONTACT_PRIVACY_STATEMENT}
            </span>
          </label>
          {errors.consent ? <p className={errorClass}>{errors.consent}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3.5 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_36px_-6px_rgba(0,215,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Book an AI Desk Audit"}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </button>
          {serverError ? (
            <p className="text-center text-sm text-amber">{serverError}</p>
          ) : null}
        </div>
      </form>
    </Reveal>
  );
}
