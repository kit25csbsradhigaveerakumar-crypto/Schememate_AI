/**
 * Voice service abstraction. Browser Web Speech API implementation today;
 * a Bhashini/Whisper implementation can be swapped in behind the same interface.
 */
export interface VoiceService {
  readonly name: string;
  isRecognitionSupported(): boolean;
  startListening(opts: {
    lang: string;
    onPartial: (text: string) => void;
    onFinal: (text: string) => void;
    onError: (reason: string) => void;
  }): void;
  stopListening(): void;
  speak(text: string, lang: string, onEnd?: () => void): Promise<void>;
  stopSpeaking(): void;
}

type AnyRec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};

class BrowserVoiceService implements VoiceService {
  readonly name = "browser";
  private rec: AnyRec | null = null;
  private finalText = "";

  isRecognitionSupported() {
    if (typeof window === "undefined") return false;
    return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  startListening({
    lang,
    onPartial,
    onFinal,
    onError,
  }: {
    lang: string;
    onPartial: (t: string) => void;
    onFinal: (t: string) => void;
    onError: (r: string) => void;
  }) {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) return onError("unsupported");
    this.stopListening();
    this.finalText = "";

    const rec: AnyRec = new Ctor();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) this.finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      onPartial((this.finalText + " " + interim).trim());
    };
    rec.onerror = (e: any) => onError(e?.error ?? "error");
    rec.onend = () => {
      const text = this.finalText.trim();
      this.rec = null;
      if (text) onFinal(text);
      else onError("no-speech");
    };

    this.rec = rec;
    try {
      rec.start();
    } catch {
      onError("start-failed");
    }
  }

  stopListening() {
    try {
      this.rec?.stop();
    } catch {
      /* ignore */
    }
  }

  async speak(text: string, lang: string, onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#`]/g, "");
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = lang;
    u.rate = 0.98;
    const voices = window.speechSynthesis.getVoices();
    const match =
      voices.find((v) => v.lang === lang) ||
      voices.find((v) => v.lang.replace("_", "-").startsWith(lang.split("-")[0]!));
    if (match) u.voice = match;
    u.onend = () => onEnd?.();
    u.onerror = () => onEnd?.();
    window.speechSynthesis.speak(u);
  }

  stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }
}

export const voiceService: VoiceService = new BrowserVoiceService();