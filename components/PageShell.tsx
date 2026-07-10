import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  glow,
}: {
  children: ReactNode;
  glow?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-32 pb-24 lg:pt-40">
        <div className="grid-lines absolute inset-0" aria-hidden />
        {glow}
        {children}
      </main>
      <Footer />
    </>
  );
}
