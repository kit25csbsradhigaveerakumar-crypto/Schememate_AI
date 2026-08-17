import { useCallback, useEffect, useState } from "react";
import type { UserProfile } from "./profile";

export type AppStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_VERIFICATION"
  | "ACTION_REQUIRED"
  | "VERIFIED"
  | "APPROVED"
  | "REJECTED";

export const STATUS_FLOW: AppStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_VERIFICATION",
  "VERIFIED",
  "APPROVED",
];

export interface TrackedApplication {
  application_id: string;
  opportunity_id: string;
  opportunity_name: string;
  status: AppStatus;
  reference_number?: string | undefined;
  created_at: string;
  last_updated: string;
  next_action: string;
  completed_steps: number[];
  documents_done: string[];
  deadline?: string | undefined;
  history: { status: AppStatus; at: string }[];
}

export interface Reminder {
  id: string;
  title: string;
  due: string;
  application_id?: string;
  done: boolean;
}

export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
  ids?: string[];
  at: string;
}

export interface Conversation {
  id: string;
  title: string;
  intent: string;
  language: string;
  messages: StoredMessage[];
  created_at: string;
  updated_at: string;
}

export interface SchemeMateState {
  onboarded: boolean;
  language: string | null;
  account: { mode: "guest" | "signed_in"; name?: string; email?: string } | null;
  profile: UserProfile;
  saved: string[];
  applications: TrackedApplication[];
  reminders: Reminder[];
  conversations: Conversation[];
  activeConversationId: string | null;
}

export const EMPTY_STATE: SchemeMateState = {
  onboarded: false,
  language: null,
  account: null,
  profile: {},
  saved: [],
  applications: [],
  reminders: [],
  conversations: [],
  activeConversationId: null,
};

const KEY = "schememate:v1";
const listeners = new Set<(s: SchemeMateState) => void>();
let cache: SchemeMateState | null = null;

function read(): SchemeMateState {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...EMPTY_STATE, ...(JSON.parse(raw) as SchemeMateState) } : EMPTY_STATE;
  } catch {
    cache = EMPTY_STATE;
  }
  return cache;
}

export function setState(updater: (s: SchemeMateState) => SchemeMateState) {
  const next = updater(read());
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l(next));
}

export function useSchemeMate() {
  const [state, setLocal] = useState<SchemeMateState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocal(read());
    setHydrated(true);
    const l = (s: SchemeMateState) => setLocal(s);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const update = useCallback((fn: (s: SchemeMateState) => SchemeMateState) => setState(fn), []);
  return { state, update, hydrated };
}

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function createApplication(opportunity_id: string, opportunity_name: string, deadline?: string) {
  const now = new Date().toISOString();
  const app: TrackedApplication = {
    application_id: newId("SM"),
    opportunity_id,
    opportunity_name,
    status: "DRAFT",
    created_at: now,
    last_updated: now,
    next_action: "Start step 1 of the application guide",
    completed_steps: [],
    documents_done: [],
    deadline,
    history: [{ status: "DRAFT", at: now }],
  };
  setState((s) => ({ ...s, applications: [app, ...s.applications] }));
  return app;
}

export function updateApplication(id: string, patch: Partial<TrackedApplication>) {
  setState((s) => ({
    ...s,
    applications: s.applications.map((a) =>
      a.application_id === id
        ? {
            ...a,
            ...patch,
            last_updated: new Date().toISOString(),
            history:
              patch.status && patch.status !== a.status
                ? [...a.history, { status: patch.status, at: new Date().toISOString() }]
                : a.history,
          }
        : a,
    ),
  }));
}