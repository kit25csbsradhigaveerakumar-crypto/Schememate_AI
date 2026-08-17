import { OPPORTUNITIES, retrieve, type Category, type Opportunity } from "./knowledge";
import { checkEligibility } from "./eligibility";
import type { UserProfile } from "./profile";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  conversation_id: string;
  messages: ChatTurn[];
  language: string;
  language_instruction: string;
  profile: UserProfile;
  applications: {
    application_id: string;
    opportunity_name: string;
    status: string;
    next_action: string;
  }[];
}

export interface ChatReply {
  reply: string;
  intent: string;
  category: string;
  stage: string;
  next_question: string;
  recommended_ids: string[];
  profile_updates: Record<string, string>;
  conversation_title: string;
  out_of_scope: boolean;
  no_verified_info: boolean;
}

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

function opportunityContext(o: Opportunity, profile: UserProfile) {
  const e = checkEligibility(o, profile);
  return [
    `ID: ${o.id}`,
    `Name: ${o.name} (${o.type}, category ${o.category}, state ${o.state})`,
    `What it is: ${o.description}`,
    `Who it is for: ${o.target_users}`,
    `Eligibility notes: ${o.eligibility_notes.join(" | ") || "none recorded"}`,
    `Engine verdict for this user: ${e.verdict} — ${e.summary}`,
    `Benefits: ${o.benefits.join(" | ")}`,
    `Documents: ${o.required_documents.join(", ")}`,
    `Application steps: ${o.application_steps.map((s, i) => `${i + 1}. ${s}`).join(" ")}`,
    `Deadline: ${o.deadline}`,
    `Official portal: ${o.official_url ?? "not configured"}`,
    `Source: ${o.official_source} (last verified ${o.last_verified})`,
  ].join("\n");
}

function buildRetrieval(req: ChatRequest) {
  const recentUser = req.messages
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => m.content)
    .join(" ");
  const profileHint = [req.profile.occupation, req.profile.education_level, req.profile.course].filter(Boolean).join(" ");
  const opts: { state?: string; limit: number } = { limit: 6 };
  if (req.profile.state) opts.state = req.profile.state;
  let docs = retrieve(`${recentUser} ${profileHint}`, opts);
  if (docs.length === 0) docs = OPPORTUNITIES.slice(0, 5);
  return docs;
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    intent: { type: "string" },
    category: { type: "string" },
    stage: { type: "string" },
    next_question: { type: "string" },
    recommended_ids: { type: "array", items: { type: "string" } },
    profile_updates: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        age: { type: "string" },
        gender: { type: "string" },
        state: { type: "string" },
        district: { type: "string" },
        occupation: { type: "string" },
        education_level: { type: "string" },
        course: { type: "string" },
        year: { type: "string" },
        family_income: { type: "string" },
        category: { type: "string" },
      },
      required: [],
    },
    conversation_title: { type: "string" },
    out_of_scope: { type: "boolean" },
    no_verified_info: { type: "boolean" },
  },
  required: [
    "reply",
    "intent",
    "category",
    "stage",
    "next_question",
    "recommended_ids",
    "profile_updates",
    "conversation_title",
    "out_of_scope",
    "no_verified_info",
  ],
} as const;

function systemPrompt(req: ChatRequest, docs: Opportunity[]) {
  const profileLines = Object.entries(req.profile)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `- ${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  return `You are SchemeMate, a voice-first multilingual assistant that helps Indian citizens find and complete government schemes, scholarships, exams, certificates and services.

LANGUAGE
${req.language_instruction}
Keep replies short enough to be spoken aloud: 2-5 sentences normally, or a numbered list when guiding an application step.

HOW YOU WORK
1. Understand the citizen's real need from how they naturally speak, even if they never name a scheme.
2. Ask ONE relevant follow-up question at a time to collect only the details you actually need for this need. Never ask for something already known.
3. Once you have enough, recommend the most relevant options from the RETRIEVED GOVERNMENT INFORMATION below and explain in plain words why they may suit this person.
4. Explain eligibility using the engine verdict given for each option. Always say final approval happens after official verification.
5. Explain required documents when asked or when relevant.
6. When the person wants to apply, guide step by step, one step at a time, and wait for them to say the step is done. If they say it is their first time, explain registration, OTP, application number, uploads and submission in beginner language.
7. Help them track a saved application using the APPLICATIONS list.

HARD RULES
- Never invent scheme names, benefits, eligibility rules, deadlines or URLs. Use ONLY the retrieved information below. If nothing relevant is retrieved, set no_verified_info true and honestly say verified information is not available for that request, then offer to help with something close.
- If the question has nothing to do with government schemes/services, set out_of_scope true and politely redirect.
- recommended_ids must contain only IDs that appear in the retrieved information, at most 3, most relevant first. Leave it empty while you are still asking clarifying questions.
- Do not read out raw URLs in a long form; mention the portal name, the UI shows the link.
- profile_updates: include ONLY details newly learned in the last user message (values as plain strings; family_income as a number in rupees per year, e.g. "150000").

KNOWN USER PROFILE
${profileLines || "- nothing known yet"}

SAVED APPLICATIONS
${
  req.applications.length
    ? req.applications
        .map((a) => `- ${a.opportunity_name} | ID ${a.application_id} | status ${a.status} | next: ${a.next_action}`)
        .join("\n")
    : "- none saved yet"
}

RETRIEVED GOVERNMENT INFORMATION
${docs.map((d) => opportunityContext(d, req.profile)).join("\n---\n")}

Return JSON matching the schema. "stage" is one of: understanding, collecting_details, recommending, eligibility, documents, applying, tracking, general.`;
}

export async function runChat(req: ChatRequest): Promise<ChatReply> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured");

  const docs = buildRetrieval(req);

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt(req, docs) },
        ...req.messages.slice(-14),
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "schememate_reply", strict: false, schema: SCHEMA },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("AI gateway error", res.status, body.slice(0, 500));
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    throw new Error("AI_FAILED");
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = data.choices?.[0]?.message?.content ?? "";
  let parsed: Partial<ChatReply> = {};
  try {
    parsed = JSON.parse(raw) as Partial<ChatReply>;
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        parsed = JSON.parse(m[0]) as Partial<ChatReply>;
      } catch {
        parsed = {};
      }
    }
  }

  const validIds = new Set(docs.map((d) => d.id));
  const knownCategories: Category[] = [
    "education",
    "exam",
    "agriculture",
    "employment",
    "healthcare",
    "social_welfare",
    "certificate",
    "financial",
  ];

  return {
    reply: parsed.reply?.trim() || raw.trim() || "…",
    intent: parsed.intent ?? "general",
    category: knownCategories.includes(parsed.category as Category) ? parsed.category! : "general",
    stage: parsed.stage ?? "understanding",
    next_question: parsed.next_question ?? "",
    recommended_ids: (parsed.recommended_ids ?? []).filter((id) => validIds.has(id)).slice(0, 3),
    profile_updates: parsed.profile_updates ?? {},
    conversation_title: parsed.conversation_title ?? "Government help",
    out_of_scope: Boolean(parsed.out_of_scope),
    no_verified_info: Boolean(parsed.no_verified_info),
  };
}