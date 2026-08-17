import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runChat } from "./chat.server";

const schema = z.object({
  conversation_id: z.string(),
  language: z.string(),
  language_instruction: z.string(),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) })).min(1),
  profile: z.record(z.any()).default({}),
  applications: z
    .array(
      z.object({
        application_id: z.string(),
        opportunity_name: z.string(),
        status: z.string(),
        next_action: z.string(),
      }),
    )
    .default([]),
});

export const sendChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => runChat(data as Parameters<typeof runChat>[0]));