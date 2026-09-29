"use client";

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";

import { trackUserEvent } from "@/lib/analytics/track-user-event";
import { createClient } from "@/utils/supabase/client";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  children: ReactNode;
};

function currentLocale() {
  if (typeof window === "undefined") return "en";
  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
  return firstSegment === "tr" ? "tr" : "en";
}

export default function TrackedCheckoutLink({
  href,
  children,
  target,
  rel,
  ...props
}: Props) {
  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const locale = currentLocale();
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.assign(
        `/${locale}/login?next=${encodeURIComponent(next)}`,
      );
      return;
    }

    void trackUserEvent("checkout_start", {
      provider: "lemonsqueezy",
      product: "sernem-premium",
    });

    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(href);
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      {...props}
      onClick={(event) => {
        void handleClick(event);
      }}
    >
      {children}
    </a>
  );
}
