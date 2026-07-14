import Image from "next/image";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { CONTACT_EMAIL, DISCLAIMER, GITHUB_URL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Titan Pilot logo"
                width={56}
                height={56}
                className="rounded-xl"
              />
              <div>
                <p className="text-base font-semibold">Titan Pilot</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  AI Trading Infrastructure
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/60">{DISCLAIMER}</p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
                Platform
              </p>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li>
                  <a href="/product" className="transition-colors hover:text-white">
                    Product
                  </a>
                </li>
                <li>
                  <a href="/architecture" className="transition-colors hover:text-white">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="/security" className="transition-colors hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <Link href="/research" className="transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="transition-colors hover:text-white">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/#roadmap" className="transition-colors hover:text-white">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/manifesto" className="transition-colors hover:text-white">
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="transition-colors hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
                Connect
              </p>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Github className="size-4" aria-hidden /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mail className="size-4" aria-hidden /> {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.titanpilot.app"
                    className="font-mono text-xs transition-colors hover:text-cyan"
                  >
                    titanpilot.app
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] tracking-widest text-white/60">
            © {new Date().getFullYear()} TITAN PILOT — TITANPILOT.APP
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/60">
            AI REASONS. SOFTWARE DECIDES.
          </p>
        </div>
      </div>
    </footer>
  );
}
