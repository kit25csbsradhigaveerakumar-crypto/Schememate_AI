import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { getOpportunity } from "@/lib/knowledge";
import { STATUS_FLOW, updateApplication, useSchemeMate, type AppStatus } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/application/$id")({
  head: () => ({
    meta: [
      { title: "Application guide & tracking — SchemeMate" },
      {
        name: "description",
        content:
          "Step-by-step guidance, document checklist and status timeline for your government scheme application.",
      },
      { property: "og:title", content: "Application guide & tracking — SchemeMate" },
      {
        property: "og:description",
        content: "Follow each application step, tick off documents and track status until approval.",
      },
    ],
  }),
  component: ApplicationPage,
});

const STATUS_OPTIONS: AppStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_VERIFICATION",
  "ACTION_REQUIRED",
  "VERIFIED",
  "APPROVED",
  "REJECTED",
];

function ApplicationPage() {
  const { id } = Route.useParams();
  const { state, hydrated } = useSchemeMate();
  const app = state.applications.find((a) => a.application_id === id);

  if (!hydrated) return <Shell>{null}</Shell>;

  if (!app) {
    return (
      <Shell>
        <h1 className="text-xl font-semibold">Application not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">It may have been removed from this device.</p>
        <Button className="mt-4" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </Shell>
    );
  }

  const opp = getOpportunity(app.opportunity_id);
  const steps = opp?.application_steps ?? [];
  const docs = opp?.required_documents ?? [];
  const done = app.completed_steps.length;
  const progress = steps.length ? Math.round((done / steps.length) * 100) : 0;

  return (
    <Shell
      right={
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      }
    >
      <h1 className="text-xl font-semibold leading-snug">{app.opportunity_name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Application ID {app.application_id}
        {app.reference_number ? ` · Portal ref ${app.reference_number}` : ""}
      </p>

      <section className="glass-card mt-5 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Status</h2>
        <ol className="mt-4 space-y-3">
          {STATUS_FLOW.map((s) => {
            const reached = app.history.some((h) => h.status === s) || STATUS_FLOW.indexOf(app.status) >= STATUS_FLOW.indexOf(s);
            return (
              <li key={s} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full border text-[11px]",
                    reached ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
                  )}
                >
                  {reached ? "✓" : ""}
                </span>
                <span className={cn("text-sm", reached ? "text-foreground" : "text-muted-foreground")}>
                  {s.replaceAll("_", " ").toLowerCase()}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                updateApplication(app.application_id, {
                  status: s,
                  next_action:
                    s === "ACTION_REQUIRED"
                      ? "Complete the action requested by the department"
                      : s === "SUBMITTED"
                        ? "Wait for verification and keep the reference number safe"
                        : "No action required",
                });
                toast.success(`Status set to ${s.replaceAll("_", " ").toLowerCase()}`);
              }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                app.status === s
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.replaceAll("_", " ").toLowerCase()}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm">
          <span className="text-muted-foreground">Next action:</span> {app.next_action}
        </p>
      </section>

      <section className="glass-card mt-5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Application steps</h2>
          <span className="text-xs text-muted-foreground">{progress}% done</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 space-y-2">
          {steps.map((step, i) => {
            const isDone = app.completed_steps.includes(i);
            return (
              <li key={step}>
                <button
                  onClick={() =>
                    updateApplication(app.application_id, {
                      completed_steps: isDone
                        ? app.completed_steps.filter((x) => x !== i)
                        : [...app.completed_steps, i],
                      next_action: isDone ? app.next_action : `Step ${i + 2} of the application guide`,
                    })
                  }
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition-colors",
                    isDone ? "border-success/40 bg-success/10" : "border-border hover:border-primary/50",
                  )}
                >
                  <span className="mt-0.5 text-xs text-muted-foreground">{i + 1}</span>
                  <span className={cn(isDone && "line-through opacity-70")}>{step}</span>
                </button>
              </li>
            );
          })}
        </ol>
        {opp?.official_url && (
          <Button className="mt-4" asChild>
            <a href={opp.official_url} target="_blank" rel="noreferrer">
              Open official portal
            </a>
          </Button>
        )}
      </section>

      <section className="glass-card mt-5 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Documents</h2>
        <ul className="mt-3 space-y-2">
          {docs.map((d) => {
            const ok = app.documents_done.includes(d);
            return (
              <li key={d}>
                <button
                  onClick={() =>
                    updateApplication(app.application_id, {
                      documents_done: ok ? app.documents_done.filter((x) => x !== d) : [...app.documents_done, d],
                    })
                  }
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
                >
                  <span className={cn("text-base", ok ? "text-success" : "text-muted-foreground")}>{ok ? "✓" : "□"}</span>
                  <span className={cn(ok && "opacity-70")}>{d}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="secondary" asChild>
          <Link to="/">Ask SchemeMate about this</Link>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            const ref = window.prompt("Enter the reference / application number from the portal");
            if (ref) updateApplication(app.application_id, { reference_number: ref });
          }}
        >
          Add portal reference number
        </Button>
      </div>
    </Shell>
  );
}