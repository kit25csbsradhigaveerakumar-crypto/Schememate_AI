import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { getOpportunity } from "@/lib/knowledge";
import { useSchemeMate, setState } from "@/lib/store";
import { PROFILE_FIELD_LABELS } from "@/lib/profile";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My dashboard — SchemeMate" },
      {
        name: "description",
        content: "Track your government applications, saved opportunities, deadlines and past conversations.",
      },
      { property: "og:title", content: "My dashboard — SchemeMate" },
      {
        property: "og:description",
        content: "Applications, saved schemes, deadlines and conversation history in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state, hydrated } = useSchemeMate();
  if (!hydrated) return <Shell>{null}</Shell>;

  const name = state.account?.name ?? "there";
  const profileEntries = Object.entries(state.profile).filter(
    ([k, v]) => PROFILE_FIELD_LABELS[k] && v !== undefined && v !== "",
  );

  return (
    <Shell
      right={
        <Button size="sm" asChild>
          <Link to="/">Talk to SchemeMate</Link>
        </Button>
      }
    >
      <h1 className="text-2xl font-semibold">Hi, {name} 👋</h1>
      <p className="mt-1 text-sm text-muted-foreground">What do you need help with today?</p>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">My applications</h2>
        {state.applications.length === 0 ? (
          <p className="glass-card p-4 text-sm text-muted-foreground">
            No applications yet. Tell SchemeMate what you need and start one with guidance.
          </p>
        ) : (
          <ul className="space-y-3">
            {state.applications.map((a) => (
              <li key={a.application_id}>
                <Link
                  to="/application/$id"
                  params={{ id: a.application_id }}
                  className="glass-card block p-4 transition-colors hover:border-primary/50"
                >
                  <p className="font-medium leading-snug">{a.opportunity_name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ID {a.application_id} · {a.status.replaceAll("_", " ").toLowerCase()}
                  </p>
                  <p className="mt-2 text-sm">Next: {a.next_action}</p>
                  {a.deadline && <p className="mt-1 text-xs text-warning">Deadline: {a.deadline}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Saved opportunities</h2>
        {state.saved.length === 0 ? (
          <p className="glass-card p-4 text-sm text-muted-foreground">Nothing saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {state.saved.map((id) => {
              const o = getOpportunity(id);
              if (!o) return null;
              return (
                <li key={id} className="glass-card flex items-center justify-between gap-3 p-3">
                  <span className="text-sm">{o.name}</span>
                  {o.official_url && (
                    <a
                      href={o.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent underline underline-offset-4"
                    >
                      Portal
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">What I know about you</h2>
        <div className="glass-card p-4">
          {profileEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              SchemeMate learns your details from the conversation — only what a scheme actually needs.
            </p>
          ) : (
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {profileEntries.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted-foreground">{PROFILE_FIELD_LABELS[k]}</dt>
                  <dd>{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Recent conversations</h2>
        {state.conversations.length === 0 ? (
          <p className="glass-card p-4 text-sm text-muted-foreground">No conversations yet.</p>
        ) : (
          <ul className="space-y-2">
            {state.conversations.slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link
                  to="/"
                  onClick={() => setState((s) => ({ ...s, activeConversationId: c.id }))}
                  className="glass-card block p-3 text-sm transition-colors hover:border-primary/50"
                >
                  <span className="font-medium">{c.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {new Date(c.updated_at).toLocaleDateString()} · {c.messages.length} messages
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}