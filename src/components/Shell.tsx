import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="size-6 rounded-full orb-surface" />
            <span className="text-sm font-bold tracking-[0.2em]">SCHEMEMATE</span>
          </Link>
          <div className="flex items-center gap-2">{right}</div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">{children}</main>
    </div>
  );
}