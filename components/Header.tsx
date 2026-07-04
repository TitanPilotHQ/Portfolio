"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { NAV_ITEMS, GITHUB_URL } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Titan Pilot logo"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-sm font-semibold tracking-wide">
            Titan <span className="text-gradient">Pilot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-secondary transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm text-secondary transition-colors hover:border-white/25 hover:text-white"
          >
            <Github className="size-4" aria-hidden />
            View GitHub
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_28px_-4px_rgba(0,215,255,0.55)]"
          >
            Join Early Access
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
      {open ? (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="overflow-hidden border-t border-white/5 bg-bg/95 backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-secondary"
              >
                <Github className="size-4" aria-hidden />
                View GitHub
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2.5 text-center text-sm font-medium text-bg"
              >
                Join Early Access
              </a>
            </div>
          </div>
        </motion.nav>
      ) : null}
      </AnimatePresence>
    </header>
  );
}
