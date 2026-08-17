export interface Language {
  code: string; // BCP-47 for speech APIs
  key: string;
  native: string;
  english: string;
  prompt: string; // instruction to the model
  ui: {
    tagline: string;
    tapToSpeak: string;
    listening: string;
    understanding: string;
    searching: string;
    speaking: string;
    startSpeaking: string;
    typeInstead: string;
    placeholder: string;
  };
  suggestions: string[];
}

export const LANGUAGES: Language[] = [
  {
    code: "ta-IN",
    key: "ta",
    native: "தமிழ்",
    english: "Tamil",
    prompt:
      "Reply in natural spoken Tamil (Tamil script). Use everyday conversational Tamil the way people actually speak, mixing common English words like scholarship, apply, document, portal where that is normal. Never use stiff textbook Tamil.",
    ui: {
      tagline: "என்ன தேவைன்னு சொல்லுங்க. நான் step by step guide பண்றேன்.",
      tapToSpeak: "பேச tap பண்ணுங்க",
      listening: "கேட்டுட்டு இருக்கேன்...",
      understanding: "புரிஞ்சுக்குறேன்...",
      searching: "Government information தேடுறேன்...",
      speaking: "பேசுறேன்...",
      startSpeaking: "பேச ஆரம்பிங்க",
      typeInstead: "Type பண்ணுங்க",
      placeholder: "உங்களுக்கு என்ன help வேணும்?",
    },
    suggestions: [
      "எனக்கு படிப்புக்கு financial help வேணும்",
      "நான் farmer, crop insurance எப்படி எடுக்குறது?",
      "எனக்கு income certificate எடுக்கணும்",
      "என் அப்பாவுக்கு pension கிடைக்குமா?",
    ],
  },
  {
    code: "en-IN",
    key: "en",
    native: "English",
    english: "English",
    prompt: "Reply in simple conversational Indian English. Short sentences, no jargon.",
    ui: {
      tagline: "Just tell me what you need. I'll guide you all the way.",
      tapToSpeak: "Tap to speak",
      listening: "Listening...",
      understanding: "Understanding...",
      searching: "Finding relevant government information...",
      speaking: "Speaking...",
      startSpeaking: "Start Speaking",
      typeInstead: "Type Instead",
      placeholder: "What do you need help with?",
    },
    suggestions: [
      "I am struggling to pay my college fees",
      "How do I apply for a government exam?",
      "I need an income certificate",
      "What is the status of my application?",
    ],
  },
  {
    code: "hi-IN",
    key: "hi",
    native: "हिन्दी",
    english: "Hindi",
    prompt:
      "Reply in natural spoken Hindi (Devanagari). Use everyday conversational Hindi with common English words like apply, document, portal where normal.",
    ui: {
      tagline: "बस बताइए आपको क्या चाहिए. मैं पूरी मदद करूँगा.",
      tapToSpeak: "बोलने के लिए दबाएँ",
      listening: "सुन रहा हूँ...",
      understanding: "समझ रहा हूँ...",
      searching: "सरकारी जानकारी ढूँढ रहा हूँ...",
      speaking: "बोल रहा हूँ...",
      startSpeaking: "बोलना शुरू करें",
      typeInstead: "टाइप करें",
      placeholder: "आपको किस चीज़ में मदद चाहिए?",
    },
    suggestions: [
      "मुझे पढ़ाई के लिए आर्थिक मदद चाहिए",
      "किसान योजना के बारे में बताइए",
      "आय प्रमाण पत्र कैसे बनवाएँ?",
      "मेरे आवेदन की स्थिति क्या है?",
    ],
  },
  {
    code: "te-IN",
    key: "te",
    native: "తెలుగు",
    english: "Telugu",
    prompt: "Reply in natural spoken Telugu (Telugu script), conversational, with common English words where normal.",
    ui: {
      tagline: "మీకు ఏమి కావాలో చెప్పండి. నేను స్టెప్ బై స్టెప్ సాయం చేస్తాను.",
      tapToSpeak: "మాట్లాడటానికి నొక్కండి",
      listening: "వింటున్నాను...",
      understanding: "అర్థం చేసుకుంటున్నాను...",
      searching: "ప్రభుత్వ సమాచారం వెతుకుతున్నాను...",
      speaking: "చెబుతున్నాను...",
      startSpeaking: "మాట్లాడటం మొదలుపెట్టండి",
      typeInstead: "టైప్ చేయండి",
      placeholder: "మీకు ఏ సాయం కావాలి?",
    },
    suggestions: [
      "చదువుకు ఆర్థిక సాయం కావాలి",
      "రైతు పథకాల గురించి చెప్పండి",
      "ఆదాయ ధృవీకరణ పత్రం ఎలా తీసుకోవాలి?",
      "నా దరఖాస్తు స్థితి ఏమిటి?",
    ],
  },
  {
    code: "kn-IN",
    key: "kn",
    native: "ಕನ್ನಡ",
    english: "Kannada",
    prompt: "Reply in natural spoken Kannada (Kannada script), conversational, with common English words where normal.",
    ui: {
      tagline: "ನಿಮಗೆ ಏನು ಬೇಕು ಅಂತ ಹೇಳಿ. ನಾನು ಹಂತ ಹಂತವಾಗಿ ಸಹಾಯ ಮಾಡ್ತೀನಿ.",
      tapToSpeak: "ಮಾತನಾಡಲು ಒತ್ತಿ",
      listening: "ಕೇಳ್ತಾ ಇದ್ದೀನಿ...",
      understanding: "ಅರ್ಥ ಮಾಡ್ಕೊಳ್ತಾ ಇದ್ದೀನಿ...",
      searching: "ಸರ್ಕಾರಿ ಮಾಹಿತಿ ಹುಡುಕ್ತಾ ಇದ್ದೀನಿ...",
      speaking: "ಹೇಳ್ತಾ ಇದ್ದೀನಿ...",
      startSpeaking: "ಮಾತು ಶುರು ಮಾಡಿ",
      typeInstead: "ಟೈಪ್ ಮಾಡಿ",
      placeholder: "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?",
    },
    suggestions: [
      "ಓದಿಗೆ ಹಣಕಾಸಿನ ಸಹಾಯ ಬೇಕು",
      "ರೈತ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಹೇಳಿ",
      "ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ ಹೇಗೆ ಪಡೆಯೋದು?",
      "ನನ್ನ ಅರ್ಜಿಯ ಸ್ಥಿತಿ ಏನು?",
    ],
  },
  {
    code: "ml-IN",
    key: "ml",
    native: "മലയാളം",
    english: "Malayalam",
    prompt: "Reply in natural spoken Malayalam (Malayalam script), conversational, with common English words where normal.",
    ui: {
      tagline: "എന്താണ് വേണ്ടതെന്ന് പറയൂ. ഞാൻ സ്റ്റെപ്പ് ബൈ സ്റ്റെപ്പ് സഹായിക്കാം.",
      tapToSpeak: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യൂ",
      listening: "കേൾക്കുന്നു...",
      understanding: "മനസ്സിലാക്കുന്നു...",
      searching: "സർക്കാർ വിവരങ്ങൾ തിരയുന്നു...",
      speaking: "പറയുന്നു...",
      startSpeaking: "സംസാരിച്ചു തുടങ്ങൂ",
      typeInstead: "ടൈപ്പ് ചെയ്യൂ",
      placeholder: "എന്ത് സഹായമാണ് വേണ്ടത്?",
    },
    suggestions: [
      "പഠനത്തിന് സാമ്പത്തിക സഹായം വേണം",
      "കർഷക പദ്ധതികളെക്കുറിച്ച് പറയൂ",
      "വരുമാന സർട്ടിഫിക്കറ്റ് എങ്ങനെ എടുക്കാം?",
      "എന്റെ അപേക്ഷയുടെ സ്ഥിതി എന്താണ്?",
    ],
  },
];

export function getLanguage(code: string): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[1]!;
}