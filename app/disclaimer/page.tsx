import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Titan Pilot is experimental software infrastructure. Nothing on this website is financial advice, investment advice, or a promise of trading performance.",
  alternates: { canonical: "/disclaimer" },
};

const CLARIFICATIONS = [
  {
    title: "Not financial advice",
    body: "Nothing on this website, in Titan Pilot software, documentation, or communications constitutes financial advice, investment advice, or trading advice of any kind.",
  },
  {
    title: "No performance claims",
    body: "Titan Pilot makes no claims about trading performance, profitability, win rates, or returns. Any interface visuals on this website are product simulations with non-live data, not records of real trading results.",
  },
  {
    title: "No guaranteed returns",
    body: "There are no guaranteed returns. Trading foreign exchange and other leveraged products involves substantial risk of loss and is not suitable for every investor.",
  },
  {
    title: "AI outputs may be wrong",
    body: "AI-generated market reasoning can be incomplete, outdated, or incorrect. Titan Pilot treats AI output as evidence to be scored and gated — never as authority — and you should too.",
  },
  {
    title: "Shadow mode is not proof of profitability",
    body: "Shadow-mode validation records and evaluates signals without placing orders. Recorded signals, scores, and artifacts are engineering evidence, not evidence of future or past profitability.",
  },
  {
    title: "Autonomous mode is evidence-gated",
    body: "Any autonomous operation remains outside the current public promise. Promotion toward autonomy requires objective evidence, explicit approval, and safety gates — and may never occur.",
  },
  {
    title: "You are responsible for your decisions",
    body: "Users and visitors remain solely responsible for their own trading and investment decisions, including any decision informed by Titan Pilot software or content.",
  },
  {
    title: "Jurisdiction limitations may apply",
    body: "Availability of software and services may be limited by the laws and regulations of your jurisdiction. Nothing here is an offer or solicitation in any jurisdiction where such an offer would be unlawful.",
  },
  {
    title: "Experimental software",
    body: "Titan Pilot is experimental trading infrastructure under active development. Features, timelines, and behavior may change or be discontinued without notice.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-32 pb-24 lg:pt-40">
        <div className="grid-lines absolute inset-0" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-amber">
              Disclaimer
            </p>
            <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
              Read This Before Anything Else.
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
              Titan Pilot is a software infrastructure project. Nothing on this
              website is financial advice, investment advice, or a promise of
              trading performance. Trading involves risk.
            </p>
          </Reveal>

          <div className="mt-12 space-y-5">
            {CLARIFICATIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <section className="glass rounded-2xl p-6">
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {item.body}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-center text-sm text-secondary">
              Questions? Contact{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-cyan underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
