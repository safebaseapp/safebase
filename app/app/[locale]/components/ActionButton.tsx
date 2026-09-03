"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loadingText?: string;
  successText?: string;
  showSuccess?: boolean;
};

export default function ActionButton({
  children,
  loadingText = "Processing...",
  successText = "✓ Done",
  showSuccess = true,
  onClick,
  disabled,
  ...props
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!onClick || status === "loading") return;

    setStatus("loading");

    try {
      await onClick(event);

      if (showSuccess) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 1200);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
      throw new Error("Action failed");
    }
  }

  return (
    <button
      {...props}
      disabled={disabled || status === "loading"}
      onClick={handleClick}
    >
      {status === "loading"
        ? loadingText
        : status === "success"
          ? successText
          : children}
    </button>
  );
}
