"use client";

import type {
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

import { trackUserEvent } from "@/lib/analytics/track-user-event";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  children: ReactNode;
};

export default function TrackedCheckoutLink({
  href,
  children,
  ...props
}: Props) {
  return (
    <a
      href={href}
      {...props}
      onClick={() => {
        void trackUserEvent(
          "checkout_start",
          {
            provider: "lemonsqueezy",
            product: "sernem-premium",
          }
        );
      }}
    >
      {children}
    </a>
  );
}
