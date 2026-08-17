# Scheme Navigator

============================================================

PROJECT NAME: SCHEMEMATE

============================================================

Build a complete, real, working AI application called:

SCHEMEMATE

Full concept:

"SchemeMate is a multilingual, voice-first AI assistant that understands what a citizen needs, finds relevant government schemes, scholarships, exams, services and opportunities, checks eligibility, explains required documents, guides the user through the application process step-by-step, and helps track the application until completion."

IMPORTANT:

SchemeMate is NOT a scholarship-only chatbot.

SchemeMate is NOT a predefined question-answer system.

SchemeMate is NOT a static list of government schemes.

SchemeMate is NOT a simple ChatGPT clone.

The examples provided in this prompt are ONLY examples for testing.

The AI must dynamically understand NEW and UNSEEN user problems and respond appropriately.

============================================================

1. CORE PURPOSE

============================================================

The user should NOT need to know:

- the name of a government scheme

- the name of a scholarship

- the government department

- the application website

- the eligibility criteria

- the required documents

- how to apply

- how to track the application

The user should simply explain their need naturally.

Example:

User:

"எனக்கு படிப்புக்கு financial help வேணும்."

SchemeMate should understand:

Intent:

Education Support

Then ask relevant questions dynamically:

"சரி, உங்களுக்கு education support தேவைன்னு புரிஞ்சுது. நீங்க இப்போ என்ன course படிக்கிறீங்க?"

If the user says:

"B.Tech second year."

SchemeMate remembers this information and asks the next relevant question.

It should NOT assume that every education user is a B.Tech student.

============================================================

2. SCHEMEMATE MUST SUPPORT MANY TYPES OF NEEDS

============================================================

The system must work for:

EDUCATION

- Scholarships

- Fee assistance

- Fellowships

- Student welfare schemes

- Education financial assistance

GOVERNMENT EXAMS

- Government exams

- Competitive exams

- Entrance exams

- Exam registration

- Eligibility

- Application process

- Exam dates

- First-time applicant guidance

AGRICULTURE

- Farmer schemes

- Subsidies

- Crop insurance

- Agricultural assistance

- Farmer welfare programs

EMPLOYMENT

- Employment schemes

- Skill-development programs

- Training

- Government employment opportunities

HEALTHCARE

- Government health schemes

- Medical assistance

- Insurance schemes

- Healthcare benefits

SOCIAL WELFARE

- Pension

- Women welfare

- Disability support

- Housing assistance

- Family welfare

CERTIFICATES AND DOCUMENTS

- Income certificate

- Caste certificate

- Residence certificate

- Birth/death certificates

- Other government services

FINANCIAL ASSISTANCE

- Government financial support

- Subsidies

- Welfare benefits

GENERAL GOVERNMENT SERVICES

- Registration

- Renewal

- Application

- Verification

- Status tracking

The architecture must allow new categories to be added without changing the core AI logic.

============================================================

3. DYNAMIC AI — MOST IMPORTANT

============================================================

DO NOT build the system around fixed examples.

NEVER use logic like:

if user says "education":

    show scholarship A

NEVER use:

if message == "I need scholarship":

    return fixed answer

Instead use:

LLM

+

Intent Detection

+

Conversation Memory

+

Knowledge Retrieval

+

Eligibility Engine

+

Application Workflow Engine

The AI must understand the MEANING of the user's message.

Examples:

"எனக்கு college fees கட்ட கஷ்டமா இருக்கு."

"எனக்கு படிப்புக்கு பண உதவி வேணும்."

"Enakku education ku financial help venum."

"I am struggling to pay my college fees."

"Is there any government support for my studies?"

All should be understood as related to:

Education + Financial Assistance

But they must not all return the same fixed response.

The AI should dynamically continue the conversation.

============================================================

4. VOICE-FIRST EXPERIENCE

============================================================

Voice is the PRIMARY interface of SchemeMate.

The user should be able to speak naturally.

Main screen:

Large animated AI orb / microphone.

Text:

"Tell me what you need."

Subtext:

"Speak naturally in your language. I'll guide you step by step."

Main button:

🎤 Start Speaking

Secondary option:

⌨ Type Instead

When the user speaks:

LISTENING

↓

UNDERSTANDING

↓

PROCESSING

↓

RESPONDING

↓

SPEAKING

The response must:

1. Appear as text.

2. Automatically play as voice.

3. Provide Replay.

4. Provide Stop.

5. Allow the user to speak again.

Text is a fallback/supporting interface, not the main experience.

============================================================

5. LANGUAGE SUPPORT

============================================================

SchemeMate must be multilingual.

Initially support:

1. Tamil

2. English

3. Hindi

4. Telugu

5. Kannada

6. Malayalam

Design the architecture to scale to 50+ Indian languages.

Language selection must affect:

- Speech recognition

- AI understanding

- Questions

- Text responses

- Voice responses

- Application guidance

Example language codes:

Tamil:

ta-IN

English:

en-IN

Hindi:

hi-IN

Telugu:

te-IN

Kannada:

kn-IN

Malayalam:

ml-IN

The user must be able to change language at any time.

Changing language must NOT erase conversation context.

============================================================

6. NATURAL SPOKEN LANGUAGE

============================================================

This is extremely important.

Do NOT use overly formal or textbook language.

If the user speaks casual Tamil, SchemeMate should respond in natural conversational Tamil.

Example:

User:

"எனக்கு படிப்புக்கு help வேணும்."

Good:

"சரி, உங்களுக்கு படிப்புக்கு financial help தேவைன்னு புரிஞ்சுது. நீங்க என்ன course படிக்கிறீங்க?"

Bad:

"உங்களுக்கு கல்வி சார்ந்த நிதி உதவி தேவைப்படுவதாக நான் புரிந்துகொண்டேன்."

Similarly:

Tamil should sound like normal spoken Tamil.

Kannada should sound like normal conversational Kannada.

Hindi should sound natural.

Telugu should sound natural.

Malayalam should sound natural.

English should be simple and conversational.

Support Tamil + Tanglish input where possible.

============================================================

7. ONBOARDING

============================================================

When SchemeMate opens:

Show a premium onboarding screen.

Logo:

SCHEMEMATE

Tagline:

"Just tell me what you need. I'll guide you all the way."

Description:

"Discover government schemes, scholarships, exams and services in your language."

Buttons:

[ Get Started ]

[ Sign In ]

[ Continue as Guest ]

Do not force users to sign in before they can explore the assistant.

============================================================

8. LANGUAGE SELECTION SCREEN

============================================================

First-time user:

"Which language would you like to speak?"

Display language cards:

தமிழ்

English

हिन्दी

తెలుగు

ಕನ್ನಡ

മലയാളം

After selection:

"Okay! You can now talk to me in Tamil."

The selected language should immediately control voice recognition and response generation.

============================================================

9. USER PROFILE

============================================================

For better personalization, allow the user to create a profile.

Possible details:

- Name

- Age

- State

- District

- Occupation

- Education

- Course

- Year

- Family income

- User category

IMPORTANT:

Do NOT ask all details at once.

Ask only information that is relevant.

Example:

If user asks about agriculture, do not ask course/year of study.

If user asks about a government exam, ask relevant education/age/state information.

If user asks about a certificate, ask certificate-specific information.

============================================================

10. DYNAMIC CONVERSATION

============================================================

SchemeMate must decide what question to ask next.

Example:

User:

"I need government help."

SchemeMate:

"Sure. எந்த விஷயத்துக்கு help தேவை? Education, job, farming, health, அல்லது வேற ஏதாவது?"

User:

"Education."

SchemeMate:

"சரி. நீங்க student-ஆ?"

User:

"Yes."

SchemeMate:

"என்ன course படிக்கிறீங்க?"

User:

"B.Tech."

SchemeMate:

"எந்த year?"

User:

"Second year."

The system should remember:

Need = Education support

User = Student

Course = B.Tech

Year = Second year

It must not ask the same questions again.

============================================================

11. CONVERSATION MEMORY

============================================================

Maintain conversation state.

Store during the active conversation:

conversation_id

language

intent

user_need

collected_information

missing_information

recommended_opportunities

current_stage

application_id

Example:

User already said:

B.Tech

Second year

Tamil Nadu

Later:

"What scholarship can I get?"

SchemeMate should use the existing information.

Do not ask again unless the information is outdated or insufficient.

============================================================

12. GOVERNMENT KNOWLEDGE BASE

============================================================

Create a structured knowledge base.

Each government opportunity/service should contain:

id

name

category

description

purpose

target_users

eligibility_rules

benefits

required_documents

application_steps

deadline

state

official_url

official_source

last_verified

The knowledge base should include different types:

Scholarships

Government schemes

Farmer schemes

Employment schemes

Government exams

Certificates

Healthcare programs

Social welfare programs

Financial assistance

Other government services

Start with verified sample data.

Architecture must support hundreds or thousands of records later.

============================================================

13. OFFICIAL SOURCES

============================================================

Use official government sources wherever possible.

Important:

Never invent:

- Scheme names

- Benefits

- Eligibility criteria

- Deadlines

- Application URLs

Every important recommendation should show:

Official Source

Last Verified

Application Portal

If a verified application URL is not available:

"Official application link is not configured."

Do not create a fake URL.

============================================================

14. RAG — RETRIEVAL AUGMENTED GENERATION

============================================================

Use RAG for government information.

Flow:

User Question

↓

Language Processing

↓

Intent Detection

↓

Multilingual Embedding

↓

Vector Search

↓

Relevant Government Information

↓

LLM

↓

Grounded Answer

Technology:

ChromaDB

Sentence Transformers

Multilingual embeddings

The LLM should use retrieved official information instead of relying only on its internal knowledge.

If no verified information exists:

"இந்த request-க்கு verified information என்கிட்ட கிடைக்கல."

Do not hallucinate.

============================================================

15. ELIGIBILITY ENGINE

============================================================

Eligibility must NOT depend entirely on the LLM.

Create a structured eligibility engine.

Example:

income <= limit

AND

age within range

AND

state matches

AND

course matches

Return:

POTENTIALLY ELIGIBLE

NOT ELIGIBLE

NEEDS VERIFICATION

Explain why.

Example:

"நீங்க கொடுத்த details அடிப்படையில basic eligibility match ஆகுது. Final approval official verification-க்கு பிறகுதான்."

============================================================

16. OPPORTUNITY RECOMMENDATION

============================================================

Do not simply display a huge list.

Rank relevant opportunities.

Example:

BEST MATCH

🎓 Scholarship A

Why it matches:

✓ Course matches

✓ State matches

✓ Income appears to match

Benefits:

...

Documents:

...

Deadline:

...

[View Details]

[Apply]

[Save]

Then:

OTHER RELEVANT OPTIONS

Scholarship B

Scholarship C

============================================================

17. APPLICATION GUIDANCE

============================================================

This is one of SchemeMate's MAIN FEATURES.

SchemeMate must not stop after recommending a scheme.

When the user says:

"Apply பண்ணணும்."

SchemeMate should say:

"சரி. நான் உங்களை step-by-step guide பண்றேன். ஒவ்வொரு step முடிச்சதும் சொல்லுங்க."

Then:

STEP 1

"Official portal-ஐ open பண்ணுங்க."

STEP 2

"Register அல்லது Login பண்ணுங்க."

STEP 3

"Relevant scheme/service select பண்ணுங்க."

STEP 4

"உங்க details fill பண்ணுங்க."

STEP 5

"Required documents upload பண்ணுங்க."

STEP 6

"Details சரியா இருக்கானு check பண்ணுங்க."

STEP 7

"Submit பண்ணுங்க."

After each step:

User:

"Done."

SchemeMate:

"சரி. அடுத்த step போகலாம்."

============================================================

18. GOVERNMENT EXAM APPLICATION

============================================================

SchemeMate must also guide users through government exam applications.

Example:

User:

"இந்த government examக்கு எப்படி apply பண்ணுறதுன்னு தெரியல."

SchemeMate should:

1. Understand which exam.

2. Retrieve official exam information.

3. Check basic eligibility.

4. Explain registration.

5. Explain documents.

6. Explain fees if applicable.

7. Explain form filling.

8. Explain submission.

9. Explain application/reference number.

10. Explain how to track application.

11. Explain exam date/admit card information.

This must work for different exams.

Do NOT hard-code one specific exam.

============================================================

19. FIRST-TIME APPLICANT MODE

============================================================

If user says:

"First time apply பண்றேன்."

Activate beginner-friendly mode.

Explain:

- Registration

- Login

- OTP

- Application number

- Document upload

- Verification

- Payment if applicable

- Submission

- Confirmation

Use simple language.

============================================================

20. DOCUMENT ASSISTANCE

============================================================

After identifying an opportunity:

Show:

REQUIRED DOCUMENTS

✓ Aadhaar

✓ Student ID

□ Income Certificate

□ Bonafide Certificate

□ Bank details

Users can ask:

"Income certificate எங்க கிடைக்கும்?"

"What is this document?"

"Why do I need this?"

SchemeMate should dynamically answer.

============================================================

21. APPLICATION TRACKING

============================================================

After submission, allow the user to save the application.

Store:

application_id

opportunity_id

submission_date

status

next_action

last_updated

Statuses:

DRAFT

SUBMITTED

UNDER_VERIFICATION

ACTION_REQUIRED

VERIFIED

APPROVED

REJECTED

Show a visual timeline:

Application Started

↓

Submitted

↓

Under Verification

↓

Verified

↓

Approved / Rejected

============================================================

22. STATUS ASSISTANT

============================================================

User can ask:

"என்னோட application status என்ன?"

SchemeMate should answer based on saved application data.

Example:

"உங்க scholarship application இப்போ Under Verification-ல இருக்கு."

If action is required:

"Income certificate upload பண்ண சொல்லி இருக்கு. அதை complete பண்ணினா அடுத்த step போகும்."

============================================================

23. REMINDERS

============================================================

Support reminders for:

- Application deadline

- Document submission

- Exam date

- Verification

- Renewal

- Action required

Example:

"உங்க application-க்கு document submission இன்னும் pending-ல இருக்கு."

============================================================

24. DASHBOARD

============================================================

After login:

Dashboard:

"Hi, [Name] 👋"

"What do you need help with today?"

Main voice assistant button.

Cards:

My Applications

Saved Opportunities

Upcoming Deadlines

Recent Conversations

Example application card:

🎓 Scholarship

Status:

Under Verification

Application ID:

XXXXXX

Next Action:

No action required

============================================================

25. CONVERSATION HISTORY

============================================================

Allow users to view previous conversations.

Examples:

Education Support

Government Exam

Farmer Assistance

Certificate Application

Users can reopen conversations.

============================================================

26. VOICE RESPONSE

============================================================

Every AI answer should have:

Text response

+

Voice response

Controls:

🔊 Replay

⏹ Stop

🎤 Speak Again

The voice response must be generated in the selected language.

If voice output fails:

Text must still be displayed.

Never leave the user without an answer.

============================================================

27. VOICE TECHNOLOGY

============================================================

Primary:

Bhashini ASR

Bhashini Translation

Bhashini TTS

Fallback:

Browser Web Speech API

Whisper

Browser SpeechSynthesis

Architecture should use a voice service abstraction so providers can be changed easily.

Example:

VoiceService

├── BhashiniVoiceService

├── WhisperVoiceService

└── BrowserVoiceService

============================================================

28. FRONTEND TECHNOLOGY

============================================================

Use:

React

TypeScript

Tailwind CSS

Recommended:

Vite

Create reusable components:

VoiceOrb

VoiceButton

Waveform

LanguageSelector

ConversationView

MessageCard

OpportunityCard

EligibilityCard

DocumentChecklist

ApplicationTimeline

ApplicationStatus

ReminderCard

SourceCard

ProfileCard

LoadingState

ErrorState

============================================================

29. BACKEND TECHNOLOGY

============================================================

Use:

Python

FastAPI

Uvicorn

Backend responsibilities:

- Conversation management

- LLM calls

- Intent detection

- RAG

- Eligibility

- Opportunity search

- Application management

- Tracking

- Reminders

- Voice services

============================================================

30. DATABASE

============================================================

Use:

PostgreSQL

Tables:

users

profiles

conversations

messages

opportunities

eligibility_rules

documents

applications

application_status

reminders

sources

For local prototype:

SQLite may be used initially if PostgreSQL setup becomes unnecessary.

Design ORM models so PostgreSQL can be enabled later.

============================================================

31. VECTOR DATABASE

============================================================

Use:

ChromaDB

Store:

Government documents

Scheme information

Exam information

Service information

FAQs

Use multilingual embeddings.

============================================================

32. AI / LLM

============================================================

Use an LLM provider through a modular AI service.

Support:

OpenAI

Gemini

Groq / Llama-compatible providers

Do not tightly couple the entire application to one provider.

Create:

LLMService

Possible implementations:

OpenAIService

GeminiService

GroqService

============================================================

33. EMBEDDINGS

============================================================

Use multilingual embeddings.

Recommended:

Sentence Transformers

Examples:

multilingual-e5-base

The embedding layer must support Indian-language queries.

============================================================

34. AUTHENTICATION

============================================================

Use:

Firebase Authentication

OR

Supabase Authentication

Support:

Google

Email

Mobile/OTP

For prototype:

Guest mode must also work.

============================================================

35. PROJECT STRUCTURE

============================================================

Create an actual project folder:

SchemeMate/

frontend/

    src/

        components/

        pages/

        services/

        hooks/

        utils/

        types/

backend/

    app/

        api/

        services/

        models/

        schemas/

        rag/

        eligibility/

        conversation/

        voice/

        database/

data/

    opportunities.json

    documents/

    sources/

docs/

    architecture.md

.env.example

README.md

requirements.txt

package.json

============================================================

36. API ENDPOINTS

============================================================

Create:

POST /api/auth

POST /api/chat

POST /api/voice/transcribe

POST /api/voice/speak

POST /api/language

POST /api/opportunities/search

GET /api/opportunities/{id}

POST /api/eligibility/check

GET /api/applications

POST /api/applications

GET /api/applications/{id}

GET /api/applications/{id}/status

POST /api/reminders

============================================================

37. CHAT API

============================================================

POST:

/api/chat

Request:

{

    "conversation_id": "...",

    "message": "...",

    "language": "ta-IN"

}

Response:

{

    "reply": "...",

    "intent": "...",

    "next_question": "...",

    "stage": "...",

    "language": "ta-IN"

}

The backend must maintain conversation context.

============================================================

38. UI DESIGN

============================================================

The interface must be modern and impressive.

Avoid:

- Boring forms

- Plain white screens

- Generic chatbot bubbles

- Government-portal-like appearance

- Excessive gradients

- Overloaded dashboards

Use:

- AI orb

- Voice waveform

- Smooth animations

- Large touch-friendly controls

- Modern cards

- Progress indicators

- Application timeline

- Clear typography

- Accessible contrast

- Responsive design

Mobile-first.

The app must look good on:

Mobile

Tablet

Desktop

============================================================

39. MAIN SCREEN

============================================================

Display:

SCHEMEMATE

"Just tell me what you need."

"Government help, explained simply in your language."

Large animated AI orb.

🎤 Start Speaking

⌨ Type Instead

🌐 Tamil

Example suggestions:

"எனக்கு scholarship வேணும்"

"இந்த examக்கு எப்படி apply பண்ணுறது?"

"எனக்கு farmer scheme பற்றி தெரிஞ்சிக்கணும்"

"என்னோட application status என்ன?"

These suggestions are ONLY examples.

============================================================

40. AI STATES

============================================================

Show clear states:

IDLE

"Tap to speak"

LISTENING

"Listening..."

PROCESSING

"Understanding..."

SEARCHING

"Finding relevant government information..."

RESPONDING

"Preparing your answer..."

SPEAKING

"Speaking..."

ERROR

"Something went wrong. Try again."

============================================================

41. UNSEEN QUERY TESTING

============================================================

The application MUST be tested using queries not explicitly hard-coded.

Test examples:

1.

"எனக்கு college fees கட்ட முடியல. Government help ஏதாவது இருக்கா?"

2.

"என் அப்பாவுக்கு pension கிடைக்குமா?"

3.

"என் வயசுக்கு எந்த government exam apply பண்ணலாம்?"

4.

"நான் farmer. Crop insurance எப்படி எடுக்குறது?"

5.

"எனக்கு income certificate எடுக்கணும்."

6.

"என்னோட scholarship application எங்கே இருக்கு?"

7.

"என் தங்கச்சி படிப்புக்கு ஏதாவது government help கிடைக்குமா?"

8.

"I don't know which scheme I qualify for."

9.

"I have never applied for a government exam before."

10.

"எனக்கு என்ன documents தேவைன்னே தெரியல."

The AI must understand these dynamically.

============================================================

42. UNEXPECTED QUERY HANDLING

============================================================

If the user gives a completely new government-related problem:

Do NOT return:

"Sorry, this is not supported."

Instead:

Understand the intent.

Ask relevant questions.

Search the knowledge base.

If information is unavailable:

Explain honestly that verified information is unavailable.

============================================================

43. OUT-OF-SCOPE HANDLING

============================================================

If the user asks unrelated questions:

Example:

"What's the weather today?"

Respond politely:

"நான் mainly government schemes, services, exams and applications பற்றி help பண்ணுற AI assistant. அதுல உங்களுக்கு என்ன help வேணும்னு சொல்லுங்க."

Do not crash.

============================================================

44. SECURITY AND PRIVACY

============================================================

Never expose API keys.

Use:

.env

Example:

LLM_API_KEY=

BHASHINI_API_KEY=

DATABASE_URL=

AUTH_CONFIG=

Implement:

Input validation

Authentication

Authorization

Secure database access

Minimal personal-data storage

Do not store unnecessary sensitive information.

============================================================

45. ERROR HANDLING

============================================================

Voice failure:

"Voice input சரியா கேட்கல. இன்னொரு தடவை try பண்ணுங்க."

AI failure:

"Sorry, இப்போ response generate பண்ண முடியல. இன்னொரு தடவை try பண்ணுங்க."

Knowledge unavailable:

"இந்த service-க்கு verified information இப்போ என்கிட்ட கிடைக்கல."

Never expose:

API errors

Stack traces

Internal server errors

Developer messages

============================================================

46. LOCAL DEVELOPMENT

============================================================

The application must run locally from VS Code.

Frontend:

npm install

npm run dev

Backend:

python -m venv venv

Windows:

venv\Scripts\activate

Then:

pip install -r requirements.txt

Run:

uvicorn app.main:app --reload

Create a clear README with:

1. Requirements

2. Installation

3. Environment variables

4. Backend setup

5. Frontend setup

6. Running the project

7. Testing voice

8. Adding government data

Do not require the user to open generated external links to run the project.

============================================================

47. DEVELOPMENT STRATEGY

============================================================

Build in phases.

PHASE 1:

Project structure

Onboarding

Language selection

Beautiful UI

PHASE 2:

Authentication

Guest mode

User profile

PHASE 3:

Working microphone

Speech-to-text

PHASE 4:

LLM integration

Text response

PHASE 5:

Text-to-speech

Voice response

PHASE 6:

Conversation memory

PHASE 7:

Dynamic follow-up questions

PHASE 8:

Government knowledge base

PHASE 9:

RAG

PHASE 10:

Eligibility engine

PHASE 11:

Opportunity recommendation

PHASE 12:

Document assistance

PHASE 13:

Application guidance

PHASE 14:

Application tracking

PHASE 15:

Reminders

PHASE 16:

UI polish

Animations

Accessibility

Mobile responsiveness

DO NOT build everything as a fake prototype simultaneously.

Each phase must actually work before moving to the next.

============================================================

48. MOST IMPORTANT PRODUCT PRINCIPLE

============================================================

SchemeMate should feel like:

"I don't know what government scheme I need.

I don't know if I am eligible.

I don't know what documents I need.

I don't know which website to use.

I don't know how to apply.

I don't know how to track it.

But I can simply TALK to SchemeMate in my own language.

SchemeMate understands me.

SchemeMate asks what it needs to know.

SchemeMate finds relevant opportunities.

SchemeMate explains why they may suit me.

SchemeMate checks my basic eligibility.

SchemeMate tells me what documents I need.

SchemeMate guides me through the application.

SchemeMate helps me track the application afterwards."

============================================================

49. CORE WORKFLOW

============================================================

TELL

↓

UNDERSTAND

↓

ASK

↓

COLLECT REQUIRED DETAILS

↓

SEARCH

↓

MATCH

↓

CHECK ELIGIBILITY

↓

EXPLAIN

↓

DOCUMENTS

↓

APPLY

↓

SUBMIT

↓

TRACK

↓

REMIND

↓

COMPLETE

============================================================

50. FINAL PRODUCT POSITIONING

============================================================

SchemeMate is NOT:

"An AI chatbot for government schemes."

SchemeMate IS:

"A multilingual, voice-first AI assistant that helps citizens navigate government opportunities and services from discovering the right opportunity to completing the application and tracking its status."

============================================================

51. FINAL TAGLINE

============================================================

"Just tell me what you need.

SchemeMate will guide you all the way."

============================================================

FINAL NON-NEGOTIABLE REQUIREMENTS

============================================================

Build a REAL WORKING APPLICATION.

Do NOT build:

- Static UI

- Fake microphone

- Predefined responses

- One scholarship demo

- One exam demo

- Hard-coded conversation

- Fake application tracking

The AI must dynamically understand new user problems.

The examples in this prompt are ONLY examples.

SchemeMate must be capable of handling:

ANY relevant government scheme

ANY relevant scholarship

ANY relevant government exam

ANY relevant government service

ANY relevant application process

ANY relevant status-tracking request

as long as verified information is available.

The most important experience is:

USER SPEAKS

↓

SCHEMEMATE UNDERSTANDS

↓

SCHEMEMATE RESPONDS IN THE SAME NATURAL LANGUAGE

↓

SCHEMEMATE ASKS THE RIGHT NEXT QUESTION

↓

SCHEMEMATE REMEMBERS THE ANSWER

↓

SCHEMEMATE FINDS RELEVANT GOVERNMENT OPPORTUNITIES

↓

SCHEMEMATE CHECKS ELIGIBILITY

↓

SCHEMEMATE EXPLAINS DOCUMENTS

↓

SCHEMEMATE GUIDES APPLICATION

↓

SCHEMEMATE TRACKS APPLICATION

↓

SCHEMEMATE REMINDS USER ABOUT REQUIRED ACTIONS

Build everything around this exact product experience.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/09dec24f-f0cf-42fb-9d88-8ea76b0cf80b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
