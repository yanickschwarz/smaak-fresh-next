"use client";

import type { ReactNode } from "react";

/**
 * Shared form field wrapper used across all Bestelle / Order form pages.
 * Renders a label + inline error.
 */
export default function OrderField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="font-mono-label text-xs text-foreground/60 block mb-1.5">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
