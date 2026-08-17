import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/knowledge";
import type { EligibilityResult } from "@/lib/eligibility";
import { createApplication, setState, useSchemeMate } from "@/lib/store";
import { toast } from "sonner";

export function EligibilityBadge({ verdict }: { verdict: EligibilityResult["verdict"] }) {
  const map = {
    POTENTIALLY_ELIGIBLE: { text: "Potentially eligible", cls: "bg-success/15 text-success border-success/30" },
    NEEDS_VERIFICATION: { text: "Needs more details", cls: "bg-warning/15 text-warning border-warning/30" },
    NOT_ELIGIBLE: { text: "Basic criteria not met", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  } as const;
  const m = map[verdict];
  return <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", m.cls)}>{m.text}</span>;
}

export function OpportunityCard({
  opportunity,
  eligibility,
  best,
}: {
  opportunity: Opportunity;
  eligibility: EligibilityResult;
  best?: boolean;
}) {
  const [open, setOpen] = useState(Boolean(best));
  const { state } = useSchemeMate();
  const saved = state.saved.includes(opportunity.id);
  const existing = state.applications.find((a) => a.opportunity_id === opportunity.id);

  return (
    <article className={cn("glass-card animate-rise-in p-4 sm:p-5", best && "ring-1 ring-primary/40")}>
      {best && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Best match</p>
      )}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="max-w-[32ch] text-base font-semibold leading-snug">{opportunity.name}</h3>
        <EligibilityBadge verdict={eligibility.verdict} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge variant="secondary">{opportunity.type}</Badge>
        <Badge variant="secondary">{opportunity.state === "ALL" ? "All India" : opportunity.state}</Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{opportunity.description}</p>
      <p className="mt-2 text-sm">{eligibility.summary}</p>

      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
          {eligibility.results.length > 0 && (
            <section>
              <h4 className="mb-1.5 font-semibold">Eligibility check</h4>
              <ul className="space-y-1 text-muted-foreground">
                {eligibility.results.map((r) => (
                  <li key={r.label}>
                    <span
                      className={cn(
                        "mr-1.5",
                        r.status === "pass" && "text-success",
                        r.status === "fail" && "text-destructive",
                        r.status === "unknown" && "text-warning",
                      )}
                    >
                      {r.status === "pass" ? "✓" : r.status === "fail" ? "✕" : "?"}
                    </span>
                    <span className="text-foreground">{r.label}:</span> {r.detail}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h4 className="mb-1.5 font-semibold">Benefits</h4>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {opportunity.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="mb-1.5 font-semibold">Required documents</h4>
            <ul className="space-y-1 text-muted-foreground">
              {opportunity.required_documents.map((d) => (
                <li key={d}>□ {d}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
            <p>
              <span className="text-foreground">Deadline:</span> {opportunity.deadline}
            </p>
            <p className="mt-1">
              <span className="text-foreground">Official source:</span> {opportunity.official_source} · last verified{" "}
              {opportunity.last_verified}
            </p>
            <p className="mt-1">
              {opportunity.official_url ? (
                <a
                  href={opportunity.official_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {opportunity.official_url}
                </a>
              ) : (
                "Official application link is not configured."
              )}
            </p>
          </section>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? "Hide details" : "View details"}
        </Button>
        {existing ? (
          <Button size="sm" asChild>
            <Link to="/application/$id" params={{ id: existing.application_id }}>
              Continue application
            </Link>
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => {
              const app = createApplication(opportunity.id, opportunity.name, opportunity.deadline);
              toast.success(`Application ${app.application_id} started`);
            }}
          >
            Apply with guidance
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setState((s) => ({
              ...s,
              saved: saved ? s.saved.filter((i) => i !== opportunity.id) : [...s.saved, opportunity.id],
            }));
            toast(saved ? "Removed from saved" : "Saved");
          }}
        >
          {saved ? "★ Saved" : "☆ Save"}
        </Button>
      </div>
    </article>
  );
}