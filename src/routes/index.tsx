import { createFileRoute } from "@tanstack/react-router";
import { Assistant } from "@/components/Assistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SchemeMate — Government help in your language" },
      {
        name: "description",
        content:
          "Speak naturally in Tamil, Hindi, Telugu, Kannada, Malayalam or English. SchemeMate finds schemes, checks eligibility and guides your application.",
      },
      { property: "og:title", content: "SchemeMate — Government help in your language" },
      {
        property: "og:description",
        content: "A voice-first AI assistant for government schemes, scholarships, exams and services.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Assistant />;
}
