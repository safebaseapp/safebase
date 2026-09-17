"use client";

import type { ReactNode } from "react";
import { trackUserEvent } from "@/lib/analytics/track-user-event";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function TrackedCheckoutLink({
  href,
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        void trackUserEvent("checkout_start", {
          provider: "lemonsqueezy",
          product: "sernem-premium",
        });
      }}
    >
      {children}
    </a>
  );
}
