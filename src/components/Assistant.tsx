import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/Shell";
import { VoiceOrb, type OrbState } from "@/components/VoiceOrb";
import { OpportunityCard } from "@/components/OpportunityCard";
import { LANGUAGES, getLanguage } from "@/lib/languages";
import { getOpportunity } from "@/lib/knowledge";
import { checkEligibility } from "@/lib/eligibility";
import { mergeProfile, type UserProfile } from "@/lib/profile";
import { sendChat } from "@/lib/chat.functions";
import { newId, setState, useSchemeMate, type StoredMessage } from "@/lib/store";
import { voiceService } from "@/lib/voice";
import { cn } from "@/lib/utils";

export function Assistant() {
  const { state, hydrated } = useSchemeMate();

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <span className="size-16 rounded-full orb-surface animate-orb-pulse" />
      </div>
    );
  }
  if (!state.onboarded) return <Onboarding />;
  if (!state.language) return <LanguagePicker />;
  return <Conversation />;
}

function Onboarding() {
  return (
    <div className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid place-items-center">
          <VoiceOrb state="idle" size={170} />
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-[0.22em]">SCHEMEMATE</h1>
        <p className="mt-4 text-lg leading-snug">Just tell me what you need. I'll guide you all the way.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Discover government schemes, scholarships, exams and services in your language.
        </p>
        <div className="mt-9 space-y-2.5">
          <Button
            className="h-12 w-full text-base"
            onClick={() => setState((s) => ({ ...s, onboarded: true, account: { mode: "guest" } }))}
          >
            Get Started
          </Button>
          <Button
            variant="secondary"
            className="h-12 w-full text-base"
            onClick={() => {
              const name = window.prompt("Your name") ?? "";
              setState((s) => ({
                ...s,
                onboarded: true,
                account: { mode: "signed_in", name: name || "Friend" },
                profile: name ? { ...s.profile, name } : s.profile,
              }));
            }}
          >
            Sign In
          </Button>
          <Button
            variant="ghost"
            className="h-12 w-full text-base"
            onClick={() => setState((s) => ({ ...s, onboarded: true, account: { mode: "guest" } }))}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}

function LanguagePicker({ onDone }: { onDone?: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-2xl font-semibold">Which language would you like to speak?</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          You can change this any time — your conversation stays.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setState((s) => ({ ...s, language: l.code }));
                toast.success(`Okay! You can now talk to me in ${l.english}.`);
                onDone?.();
              }}
              className="glass-card p-5 text-left transition-transform hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="block text-xl font-semibold">{l.native}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{l.english}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Conversation() {
  const { state } = useSchemeMate();
  const lang = getLanguage(state.language ?? "en-IN");
  const chat = useServerFn(sendChat);

  const conversationId = useMemo(() => state.activeConversationId ?? newId("conv"), [state.activeConversationId]);
  const conversation = state.conversations.find((c) => c.id === conversationId);
  const messages = conversation?.messages ?? [];

  const [orb, setOrb] = useState<OrbState>("idle");
  const [partial, setPartial] = useState("");
  const [draft, setDraft] = useState("");
  const [showLangs, setShowLangs] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, orb]);

  const speak = useCallback(
    (text: string) => {
      setOrb("speaking");
      voiceService.speak(text, lang.code, () => setOrb("idle"));
    },
    [lang.code],
  );

  const persist = useCallback(
    (msgs: StoredMessage[], meta?: { title?: string; intent?: string }) => {
      setState((s) => {
        const existing = s.conversations.find((c) => c.id === conversationId);
        const now = new Date().toISOString();
        const updated = existing
          ? {
              ...existing,
              messages: msgs,
              updated_at: now,
              title: meta?.title ?? existing.title,
              intent: meta?.intent ?? existing.intent,
              language: s.language ?? existing.language,
            }
          : {
              id: conversationId,
              title: meta?.title ?? "Government help",
              intent: meta?.intent ?? "general",
              language: s.language ?? "en-IN",
              messages: msgs,
              created_at: now,
              updated_at: now,
            };
        return {
          ...s,
          activeConversationId: conversationId,
          conversations: [updated, ...s.conversations.filter((c) => c.id !== conversationId)],
        };
      });
    },
    [conversationId],
  );

  const ask = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || orb === "processing" || orb === "searching") return;
      voiceService.stopSpeaking();
      setPartial("");
      setDraft("");

      const withUser: StoredMessage[] = [...messages, { role: "user", content: clean, at: new Date().toISOString() }];
      persist(withUser);
      setOrb("processing");
      window.setTimeout(() => setOrb((o) => (o === "processing" ? "searching" : o)), 900);

      try {
        const currentProfile = (state.profile ?? {}) as UserProfile;
        const reply = await chat({
          data: {
            conversation_id: conversationId,
            language: lang.code,
            language_instruction: lang.prompt,
            messages: withUser.slice(-14).map((m) => ({ role: m.role, content: m.content })),
            profile: currentProfile as Record<string, unknown>,
            applications: state.applications.map((a) => ({
              application_id: a.application_id,
              opportunity_name: a.opportunity_name,
              status: a.status,
              next_action: a.next_action,
            })),
          },
        });

        const next: StoredMessage[] = [
          ...withUser,
          {
            role: "assistant",
            content: reply.reply,
            ids: reply.recommended_ids,
            at: new Date().toISOString(),
          },
        ];
        persist(next, { title: reply.conversation_title, intent: reply.intent });

        const updates = normaliseProfileUpdates(reply.profile_updates);
        if (Object.keys(updates).length) {
          setState((s) => ({ ...s, profile: mergeProfile(s.profile, updates) }));
        }

        if (autoSpeak) speak(reply.reply);
        else setOrb("idle");
      } catch (e) {
        setOrb("error");
        const msg = String((e as Error)?.message ?? "");
        toast.error(
          msg.includes("RATE_LIMIT")
            ? "Too many requests right now. Please try again in a moment."
            : msg.includes("CREDITS")
              ? "AI usage limit reached. Please add credits and retry."
              : "Sorry, I couldn't generate a response. Please try once more.",
        );
        window.setTimeout(() => setOrb("idle"), 1200);
      }
    },
    [messages, orb, persist, chat, conversationId, lang, state.profile, state.applications, autoSpeak, speak],
  );

  const startListening = useCallback(() => {
    if (orb === "listening") {
      voiceService.stopListening();
      return;
    }
    voiceService.stopSpeaking();
    if (!voiceService.isRecognitionSupported()) {
      toast.error("Voice input isn't supported in this browser. You can type instead.");
      return;
    }
    setPartial("");
    setOrb("listening");
    voiceService.startListening({
      lang: lang.code,
      onPartial: setPartial,
      onFinal: (t) => void ask(t),
      onError: (reason) => {
        setOrb("idle");
        setPartial("");
        if (reason === "not-allowed") toast.error("Microphone permission is blocked. Allow it and try again.");
        else if (reason !== "aborted") toast.error("I couldn't hear that clearly. Please try again.");
      },
    });
  }, [orb, lang.code, ask]);

  const statusText =
    orb === "listening"
      ? lang.ui.listening
      : orb === "processing"
        ? lang.ui.understanding
        : orb === "searching"
          ? lang.ui.searching
          : orb === "speaking"
            ? lang.ui.speaking
            : orb === "error"
              ? "Something went wrong. Try again."
              : lang.ui.tapToSpeak;

  if (showLangs) return <LanguagePicker onDone={() => setShowLangs(false)} />;

  const empty = messages.length === 0;

  return (
    <Shell
      right={
        <>
          <button
            onClick={() => setShowLangs(true)}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            🌐 {lang.native}
          </button>
          <Button size="sm" variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </>
      }
    >
      {empty ? (
        <div className="flex flex-col items-center pt-6 text-center">
          <VoiceOrb state={orb} size={210} onClick={startListening} label={lang.ui.startSpeaking} />
          <h1 className="mt-8 text-2xl font-semibold">{lang.ui.tagline}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{statusText}</p>
          <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
            {lang.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => void ask(s)}
                className="glass-card p-3 text-left text-sm transition-colors hover:border-primary/50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m, i) => (
            <MessageBlock
              key={i}
              message={m}
              profile={state.profile}
              onReplay={() => speak(m.content)}
              onStop={() => {
                voiceService.stopSpeaking();
                setOrb("idle");
              }}
            />
          ))}
          {partial && (
            <p className="ml-auto max-w-[85%] rounded-2xl bg-primary/15 px-4 py-2 text-sm italic text-muted-foreground">
              {partial}
            </p>
          )}
          {(orb === "processing" || orb === "searching") && (
            <p className="text-sm text-muted-foreground">{statusText}</p>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <button
            onClick={startListening}
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-full transition-transform",
              orb === "listening" ? "bg-destructive text-destructive-foreground scale-105" : "bg-primary text-primary-foreground",
            )}
            aria-label={lang.ui.startSpeaking}
          >
            {orb === "listening" ? "■" : "🎤"}
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void ask(draft);
            }}
            placeholder={lang.ui.placeholder}
            className="h-12 flex-1 rounded-full border border-input bg-secondary/50 px-4 text-sm outline-none focus:border-primary"
          />
          <Button size="sm" className="h-12 rounded-full px-5" onClick={() => void ask(draft)} disabled={!draft.trim()}>
            Send
          </Button>
        </div>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 pb-2 text-[11px] text-muted-foreground">
          <span>{statusText}</span>
          <button onClick={() => setAutoSpeak((v) => !v)} className="hover:text-foreground">
            {autoSpeak ? "🔊 Voice replies on" : "🔇 Voice replies off"}
          </button>
        </div>
      </div>
    </Shell>
  );
}

function MessageBlock({
  message,
  profile,
  onReplay,
  onStop,
}: {
  message: StoredMessage;
  profile: UserProfile;
  onReplay: () => void;
  onStop: () => void;
}) {
  if (message.role === "user") {
    return (
      <p className="ml-auto max-w-[85%] animate-rise-in rounded-2xl rounded-br-sm bg-primary/20 px-4 py-2.5 text-sm">
        {message.content}
      </p>
    );
  }
  const recs = (message.ids ?? []).map((id) => getOpportunity(id)).filter(Boolean);
  return (
    <div className="animate-rise-in space-y-3">
      <div className="glass-card max-w-[92%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}
        <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
          <button onClick={onReplay} className="hover:text-foreground">
            🔊 Replay
          </button>
          <button onClick={onStop} className="hover:text-foreground">
            ⏹ Stop
          </button>
        </div>
      </div>
      {recs.length > 0 && (
        <div className="space-y-3">
          {recs.map((o, i) => (
            <OpportunityCard
              key={o!.id}
              opportunity={o!}
              eligibility={checkEligibility(o!, profile)}
              best={i === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function normaliseProfileUpdates(raw: Record<string, string>): Partial<UserProfile> {
  const out: Partial<UserProfile> = {};
  for (const [k, value] of Object.entries(raw ?? {})) {
    if (!value) continue;
    if (k === "age" || k === "family_income") {
      const n = Number(String(value).replace(/[^\d.]/g, ""));
      if (!Number.isNaN(n) && n > 0) (out as Record<string, unknown>)[k] = n;
    } else if (k === "gender") {
      const g = value.toLowerCase();
      out.gender = g.startsWith("f") ? "female" : g.startsWith("m") ? "male" : "other";
    } else {
      (out as Record<string, unknown>)[k] = value;
    }
  }
  return out;
}