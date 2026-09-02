"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FunnelHeader } from "@/components/FunnelHeader";
import { FunnelFooter } from "@/components/FunnelFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/**
 * Chrome switch. Most pages render inside the full-site Header + Footer, but the
 * funnel pages — the questionnaire (`/evaluare`), a scored self-test
 * (`/chestionare/<slug>`) and the personalized result pages (`/rezultat/*`) —
 * get a distraction-free variant: a minimal topbar (logo + phone + one CTA, no
 * nav) and a minimal footer, so nothing competes with reaching the lead form
 * (client spec / funnel redesign). The result page topbar carries a "book" CTA
 * that jumps to the offer; a quiz needs none — the page itself is the action.
 *
 * Note the Chestionare *hub* (`/chestionare`, exactly) is a normal site page —
 * only the individual tests inside it are funnel pages. Server-rendered
 * `children` pass straight through.
 */
function isFunnel(pathname: string): boolean {
  return (
    pathname === "/evaluare" ||
    pathname.startsWith("/rezultat") ||
    pathname.startsWith("/chestionare/")
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const funnel = isFunnel(pathname);
  const isResult = pathname.startsWith("/rezultat");

  // Standalone campaign landing pages (`/lp/*`) are fully self-contained — they
  // ship the client's own header + footer baked into the page — so they render
  // with no site chrome at all.
  if (pathname.startsWith("/lp/")) {
    return <main className="flex-1">{children}</main>;
  }

  if (funnel) {
    return (
      <>
        <FunnelHeader
          cta={isResult ? { label: "Rezervă BrainMap", href: "#oferta" } : undefined}
        />
        <main className="flex-1">{children}</main>
        <FunnelFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
