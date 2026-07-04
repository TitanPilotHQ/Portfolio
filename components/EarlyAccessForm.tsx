"use client";

import { Check, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  CONTACT_EMAIL,
  EARLY_ACCESS_DISCLAIMER,
  EARLY_ACCESS_GETS,
  EARLY_ACCESS_NOT_GETS,
} from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

// TODO: Replace the mailto handoff with a real backend (server action,
// Resend, or a form service) before scale. Kept dependency-free for v1.

export function EarlyAccessForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Titan Pilot — Early Access Request");
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Role: ${data.get("role")}`,
        "",
        `${data.get("message")}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 lg:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/[0.07] blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Early Access"
          title="Follow the Build. Join Early Access."
          copy="Early access is for technical traders, AI automation builders, and infrastructure-minded market participants who want to follow or test Titan Pilot's shadow-mode validation."
        />

        {/* What early access means — sets expectations, filters the audience */}
        <Reveal className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-success">
              You may receive
            </p>
            <ul className="space-y-2.5">
              {EARLY_ACCESS_GETS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
              You will not receive
            </p>
            <ul className="space-y-2.5">
              {EARLY_ACCESS_NOT_GETS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                  <X className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ea-name" className="mb-1.5 block text-xs font-medium text-secondary">
                  Name
                </label>
                <input
                  id="ea-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ea-email" className="mb-1.5 block text-xs font-medium text-secondary">
                  Email
                </label>
                <input
                  id="ea-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="ea-role" className="mb-1.5 block text-xs font-medium text-secondary">
                Role
              </label>
              <input
                id="ea-role"
                name="role"
                placeholder="Trader, engineer, researcher…"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ea-message" className="mb-1.5 block text-xs font-medium text-secondary">
                Message
              </label>
              <textarea
                id="ea-message"
                name="message"
                rows={4}
                placeholder="What interests you about Titan Pilot?"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3.5 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_36px_-6px_rgba(0,215,255,0.6)]"
            >
              Request Early Access
              <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            {submitted ? (
              <p className="text-center font-mono text-xs text-success">
                Your email client should open — send the drafted message to finish.
              </p>
            ) : null}
            <p className="pt-1 text-center text-[11px] leading-relaxed text-white/35">
              {EARLY_ACCESS_DISCLAIMER}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
