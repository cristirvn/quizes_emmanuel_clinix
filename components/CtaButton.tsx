"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The ONE call-to-action used across the site (guide §4). It points at the
 * single evaluation funnel (`/evaluare`) everywhere — that one quiz is now the
 * site's only entry into lead capture. There are intentionally no other button
 * types.
 *
 * `href` overrides that default — e.g. result pages point it at /contact.
 */
export function CtaButton({
  children,
  className = "",
  href: hrefProp,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const href = hrefProp ?? "/evaluare";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl bg-navy px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${className}`}
    >
      {children}
    </Link>
  );
}
