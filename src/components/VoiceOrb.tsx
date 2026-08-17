import { cn } from "@/lib/utils";

export type OrbState = "idle" | "listening" | "processing" | "searching" | "speaking" | "error";

export function VoiceOrb({
  state,
  size = 200,
  onClick,
  label,
}: {
  state: OrbState;
  size?: number;
  onClick?: () => void;
  label?: string;
}) {
  const active = state !== "idle";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? "Voice assistant"}
      className="group relative grid place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
      style={{ width: size, height: size }}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full orb-surface animate-orb-spin opacity-70 blur-xl transition-opacity",
          active && "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute inset-[10%] rounded-full orb-surface transition-transform duration-500",
          state === "listening" && "animate-orb-pulse",
          state === "speaking" && "animate-orb-pulse",
          state === "error" && "opacity-50 grayscale",
        )}
      />
      <span className="absolute inset-[19%] rounded-full bg-background/85 backdrop-blur-sm" />
      <span className="relative flex flex-col items-center gap-2">
        {state === "listening" || state === "speaking" ? (
          <Waveform />
        ) : (
          <MicGlyph muted={state === "error"} />
        )}
      </span>
    </button>
  );
}

function Waveform() {
  return (
    <span className="flex h-10 items-end gap-1.5">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-primary"
          style={{
            height: 34,
            animation: `wave-bar 0.9s ease-in-out ${i * 0.09}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function MicGlyph({ muted }: { muted?: boolean }) {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={cn("text-primary transition-transform group-hover:scale-110", muted && "text-destructive")}
    >
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
    </svg>
  );
}