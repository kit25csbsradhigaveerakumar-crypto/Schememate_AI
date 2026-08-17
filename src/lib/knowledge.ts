// SchemeMate government knowledge base.
// Verified public information with official portals. Extendable: add records here
// (or load from an API later) without touching the AI logic.

export type Category =
  | "education"
  | "exam"
  | "agriculture"
  | "employment"
  | "healthcare"
  | "social_welfare"
  | "certificate"
  | "financial";

export type EligibilityRule =
  | { field: "age"; op: "between"; min: number; max: number }
  | { field: "age"; op: "gte" | "lte"; value: number }
  | { field: "family_income"; op: "lte"; value: number }
  | { field: "state"; op: "in"; values: string[] }
  | { field: "occupation"; op: "in"; values: string[] }
  | { field: "education_level"; op: "in"; values: string[] }
  | { field: "category"; op: "in"; values: string[] }
  | { field: "gender"; op: "in"; values: string[] };

export interface Opportunity {
  id: string;
  name: string;
  category: Category;
  type: string;
  description: string;
  purpose: string;
  target_users: string;
  eligibility_rules: EligibilityRule[];
  eligibility_notes: string[];
  benefits: string[];
  required_documents: string[];
  application_steps: string[];
  deadline: string;
  state: string; // "ALL" or a state name
  official_url: string | null;
  official_source: string;
  last_verified: string;
  keywords: string[];
}

const ALL = "ALL";

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "nsp-post-matric",
    name: "National Scholarship Portal — Post Matric Scholarship",
    category: "education",
    type: "Scholarship",
    description:
      "Central government post-matric scholarship for students studying after class 10, covering tuition and maintenance support.",
    purpose: "Reduce the cost of higher education for students from low income families.",
    target_users: "Students in class 11 and above, including diploma, UG and PG courses.",
    eligibility_rules: [
      { field: "family_income", op: "lte", value: 250000 },
      { field: "education_level", op: "in", values: ["class11", "class12", "diploma", "ug", "pg"] },
    ],
    eligibility_notes: [
      "Student must be enrolled in a recognised institution.",
      "Income limit varies by sub-scheme and category; verify on the portal.",
    ],
    benefits: [
      "Tuition fee reimbursement as per scheme norms",
      "Monthly maintenance allowance",
      "Direct benefit transfer to the student's bank account",
    ],
    required_documents: [
      "Aadhaar number",
      "Income certificate",
      "Caste / community certificate (if applying under a reserved category)",
      "Bonafide certificate from institution",
      "Previous year marksheet",
      "Bank passbook (Aadhaar seeded account)",
    ],
    application_steps: [
      "Open the National Scholarship Portal and choose 'New Registration'.",
      "Verify your mobile number with OTP and note the application ID.",
      "Log in and select the post-matric scholarship relevant to your category.",
      "Fill personal, academic and bank details exactly as in your documents.",
      "Upload scanned documents within the given size limits.",
      "Review the filled form using the preview option.",
      "Submit the final application and download the acknowledgement.",
    ],
    deadline: "Usually October–November each academic year (check portal)",
    state: ALL,
    official_url: "https://scholarships.gov.in",
    official_source: "Ministry of Education / National Scholarship Portal",
    last_verified: "2026-01",
    keywords: ["scholarship", "college fees", "student", "education", "tuition", "படிப்பு", "கல்வி"],
  },
  {
    id: "aicte-pragati",
    name: "AICTE Pragati Scholarship for Girl Students",
    category: "education",
    type: "Scholarship",
    description:
      "Scholarship for girl students admitted to AICTE approved technical degree or diploma programmes.",
    purpose: "Encourage girls to pursue technical education.",
    target_users: "Girl students in AICTE approved degree/diploma technical institutions.",
    eligibility_rules: [
      { field: "gender", op: "in", values: ["female"] },
      { field: "family_income", op: "lte", value: 800000 },
      { field: "education_level", op: "in", values: ["diploma", "ug"] },
    ],
    eligibility_notes: [
      "Admission must be in the first year (or second year through lateral entry) of an AICTE approved institution.",
      "Maximum two girl children per family.",
    ],
    benefits: ["₹50,000 per year towards tuition, books and other expenses"],
    required_documents: [
      "Aadhaar",
      "Income certificate",
      "Admission proof / institution certificate",
      "Class 12 or diploma marksheet",
      "Bank passbook",
    ],
    application_steps: [
      "Open the National Scholarship Portal and register as a fresh applicant.",
      "Select AICTE Pragati Scholarship under Ministry of Education schemes.",
      "Fill academic and family income details.",
      "Upload the required documents.",
      "Submit and get it verified by your institution nodal officer.",
    ],
    deadline: "Announced yearly on NSP (usually Oct–Nov)",
    state: ALL,
    official_url: "https://scholarships.gov.in",
    official_source: "AICTE, Ministry of Education",
    last_verified: "2026-01",
    keywords: ["girl", "engineering", "technical", "pragati", "scholarship", "btech"],
  },
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    category: "agriculture",
    type: "Farmer income support",
    description: "Income support of ₹6,000 per year to eligible landholding farmer families.",
    purpose: "Supplement the financial needs of farmers for agricultural inputs.",
    target_users: "Landholding farmer families.",
    eligibility_rules: [{ field: "occupation", op: "in", values: ["farmer"] }],
    eligibility_notes: [
      "Institutional landholders, income tax payers and certain government employees are excluded.",
      "Land records must be in the applicant's name.",
    ],
    benefits: ["₹6,000 per year in three equal instalments, transferred directly to the bank account"],
    required_documents: ["Aadhaar", "Land ownership records", "Bank account details", "Mobile number"],
    application_steps: [
      "Open the PM-KISAN portal and choose 'New Farmer Registration'.",
      "Enter Aadhaar number and complete OTP verification.",
      "Fill land details as per your record of rights.",
      "Upload land documents where asked.",
      "Submit and note the registration number for status tracking.",
      "Complete e-KYC on the portal or at a Common Service Centre.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://pmkisan.gov.in",
    official_source: "Ministry of Agriculture & Farmers Welfare",
    last_verified: "2026-01",
    keywords: ["farmer", "kisan", "agriculture", "விவசாயி", "land", "income support"],
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)",
    category: "agriculture",
    type: "Crop insurance",
    description: "Crop insurance scheme covering yield losses due to natural calamities, pests and diseases.",
    purpose: "Protect farmers against crop loss and stabilise farm income.",
    target_users: "All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.",
    eligibility_rules: [{ field: "occupation", op: "in", values: ["farmer"] }],
    eligibility_notes: [
      "Crop and area must be notified for the season.",
      "Enrolment must be completed before the cut-off date of the season.",
    ],
    benefits: [
      "Low farmer premium: 2% for kharif, 1.5% for rabi, 5% for commercial/horticultural crops",
      "Claim settlement for prevented sowing, mid-season adversity and post-harvest losses",
    ],
    required_documents: [
      "Aadhaar",
      "Land records / tenancy agreement",
      "Bank passbook",
      "Sowing declaration",
    ],
    application_steps: [
      "Open the PMFBY portal or visit your bank / CSC before the seasonal cut-off date.",
      "Register as a farmer and select the season, crop and area.",
      "Enter land and bank details.",
      "Pay the farmer share of the premium.",
      "Save the policy/acknowledgement number for claims and tracking.",
    ],
    deadline: "Season-wise cut-off dates (kharif and rabi)",
    state: ALL,
    official_url: "https://pmfby.gov.in",
    official_source: "Ministry of Agriculture & Farmers Welfare",
    last_verified: "2026-01",
    keywords: ["crop insurance", "fasal bima", "farmer", "பயிர் காப்பீடு", "drought", "loss"],
  },
  {
    id: "ayushman-pmjay",
    name: "Ayushman Bharat PM-JAY",
    category: "healthcare",
    type: "Health insurance",
    description: "Health cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation.",
    purpose: "Protect poor and vulnerable families from catastrophic health expenditure.",
    target_users: "Families identified through SECC deprivation criteria and state-notified categories; senior citizens aged 70+.",
    eligibility_rules: [],
    eligibility_notes: [
      "Eligibility is checked against the beneficiary database using mobile number, ration card or Aadhaar.",
      "All citizens aged 70 and above are covered under the Ayushman Vay Vandana expansion.",
    ],
    benefits: [
      "₹5 lakh cover per family per year",
      "Cashless treatment at empanelled hospitals",
      "No cap on family size or age",
    ],
    required_documents: ["Aadhaar", "Ration card", "Registered mobile number"],
    application_steps: [
      "Open the PM-JAY beneficiary portal and check eligibility with your mobile number.",
      "Verify with OTP and search using Aadhaar, ration card or family ID.",
      "Complete e-KYC to generate the Ayushman card.",
      "Download the card, or visit an empanelled hospital's Ayushman Mitra desk for help.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://beneficiary.nha.gov.in",
    official_source: "National Health Authority",
    last_verified: "2026-01",
    keywords: ["health", "hospital", "insurance", "medical", "ayushman", "மருத்துவம்"],
  },
  {
    id: "igno-aps",
    name: "Indira Gandhi National Old Age Pension Scheme",
    category: "social_welfare",
    type: "Pension",
    description: "Monthly old age pension for elderly persons from below poverty line households.",
    purpose: "Provide basic income security to the elderly poor.",
    target_users: "Persons aged 60 and above belonging to BPL families.",
    eligibility_rules: [{ field: "age", op: "gte", value: 60 }],
    eligibility_notes: [
      "Household must be in the BPL list as per state records.",
      "State governments add a top-up amount, so the final pension differs by state.",
    ],
    benefits: [
      "Central assistance of ₹200/month for age 60–79 and ₹500/month for 80+",
      "State top-up added on top of the central share",
    ],
    required_documents: ["Aadhaar", "Age proof", "BPL ration card", "Bank passbook", "Passport photo"],
    application_steps: [
      "Get the pension application form from the block/taluk office or your state welfare portal.",
      "Fill applicant, age and bank details.",
      "Attach age proof, BPL card and bank passbook copy.",
      "Submit at the block development office / e-Sevai centre and collect the acknowledgement.",
      "Track the sanction status with the acknowledgement number.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://nsap.nic.in",
    official_source: "Ministry of Rural Development — NSAP",
    last_verified: "2026-01",
    keywords: ["pension", "old age", "elderly", "முதியோர்", "appa", "father", "60"],
  },
  {
    id: "pmay-g",
    name: "Pradhan Mantri Awaas Yojana — Gramin",
    category: "social_welfare",
    type: "Housing assistance",
    description: "Financial assistance to rural households for constructing a pucca house.",
    purpose: "Housing for all in rural areas.",
    target_users: "Rural households without a pucca house, identified through the permanent wait list / Awaas+ survey.",
    eligibility_rules: [],
    eligibility_notes: [
      "Beneficiary must be identified in the SECC/Awaas+ list and verified by the Gram Sabha.",
      "Households owning a motorised vehicle or paying income tax are excluded.",
    ],
    benefits: [
      "₹1.20 lakh assistance in plain areas, ₹1.30 lakh in hilly/difficult areas",
      "Convergence with MGNREGA wage support and toilet assistance",
    ],
    required_documents: ["Aadhaar with consent", "Job card number", "Bank account details", "Land/plot proof"],
    application_steps: [
      "Approach the Gram Panchayat or use the Awaas+ mobile survey.",
      "Complete the household survey with Aadhaar and job card details.",
      "Wait for Gram Sabha verification and inclusion in the permanent wait list.",
      "Track the sanction and instalment status on the PMAY-G portal.",
    ],
    deadline: "Survey windows announced by the ministry",
    state: ALL,
    official_url: "https://pmayg.nic.in",
    official_source: "Ministry of Rural Development",
    last_verified: "2026-01",
    keywords: ["house", "housing", "veedu", "வீடு", "awaas", "pucca"],
  },
  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana (Skill India)",
    category: "employment",
    type: "Skill training",
    description: "Free short-term skill training with certification and placement support.",
    purpose: "Make youth employable through industry-aligned skill training.",
    target_users: "Indian youth, generally between 15 and 45 years, who are school/college dropouts or unemployed.",
    eligibility_rules: [{ field: "age", op: "between", min: 15, max: 45 }],
    eligibility_notes: ["Course-wise minimum education requirements apply."],
    benefits: ["Free training", "Government recognised certificate", "Placement assistance", "Assessment support"],
    required_documents: ["Aadhaar", "Education certificate", "Bank account details", "Passport photo"],
    application_steps: [
      "Open the Skill India Digital portal and create a candidate account.",
      "Complete your profile and select a job role / sector.",
      "Find a training centre near your district.",
      "Enroll in the batch and attend the training.",
      "Take the assessment and download the certificate.",
    ],
    deadline: "Batch based, open throughout the year",
    state: ALL,
    official_url: "https://www.skillindiadigital.gov.in",
    official_source: "Ministry of Skill Development & Entrepreneurship",
    last_verified: "2026-01",
    keywords: ["job", "skill", "training", "employment", "வேலை", "course", "placement"],
  },
  {
    id: "mgnrega",
    name: "MGNREGA — Rural Employment Guarantee",
    category: "employment",
    type: "Wage employment",
    description: "Guarantees 100 days of wage employment per year to rural households demanding unskilled manual work.",
    purpose: "Livelihood security in rural areas.",
    target_users: "Adult members of rural households willing to do unskilled manual work.",
    eligibility_rules: [{ field: "age", op: "gte", value: 18 }],
    eligibility_notes: ["Applicant must be a resident of a rural area and registered with the Gram Panchayat."],
    benefits: ["100 days of guaranteed wage employment", "State-notified daily wage", "Unemployment allowance if work is not provided in 15 days"],
    required_documents: ["Aadhaar", "Residence proof", "Passport photos", "Bank/post office account"],
    application_steps: [
      "Apply for a job card at the Gram Panchayat with photos and Aadhaar.",
      "Receive the job card (usually within 15 days).",
      "Submit a written work demand application and get a dated receipt.",
      "Report to the allotted worksite when work is assigned.",
      "Track wage payments on the NREGA portal using your job card number.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://nrega.nic.in",
    official_source: "Ministry of Rural Development",
    last_verified: "2026-01",
    keywords: ["work", "wage", "job card", "rural", "100 days", "employment"],
  },
  {
    id: "eshram",
    name: "e-Shram — Unorganised Worker Registration",
    category: "employment",
    type: "Worker registration",
    description: "National database registration for unorganised workers, giving a Universal Account Number card.",
    purpose: "Link unorganised workers to social security and welfare schemes.",
    target_users: "Unorganised workers aged 16–59 who are not EPFO/ESIC members or income tax payers.",
    eligibility_rules: [{ field: "age", op: "between", min: 16, max: 59 }],
    eligibility_notes: ["Must not be an income tax payer or a member of EPFO/ESIC."],
    benefits: ["e-Shram UAN card", "Accidental insurance cover under PMSBY terms", "Single window access to linked welfare schemes"],
    required_documents: ["Aadhaar linked mobile number", "Bank account details"],
    application_steps: [
      "Open the e-Shram portal and choose self registration.",
      "Enter your Aadhaar linked mobile number and verify the OTP.",
      "Fill occupation, education and bank details.",
      "Submit and download the UAN card.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://eshram.gov.in",
    official_source: "Ministry of Labour & Employment",
    last_verified: "2026-01",
    keywords: ["worker", "labour", "unorganised", "coolie", "daily wage", "card"],
  },
  {
    id: "income-certificate-tn",
    name: "Income Certificate (Tamil Nadu e-Sevai)",
    category: "certificate",
    type: "Certificate",
    description: "Certificate issued by the Revenue Department certifying annual family income, required for most welfare applications.",
    purpose: "Prove family income for scholarships, schemes and fee concessions.",
    target_users: "Residents of Tamil Nadu. Other states have their own e-district portals.",
    eligibility_rules: [{ field: "state", op: "in", values: ["Tamil Nadu"] }],
    eligibility_notes: ["Applicant must be a resident of the district where the application is filed."],
    benefits: ["Digitally signed income certificate, usually valid for one year"],
    required_documents: [
      "Aadhaar",
      "Ration card",
      "Address proof",
      "Salary certificate or self declaration of income",
      "Passport photo",
    ],
    application_steps: [
      "Open the Tamil Nadu e-Sevai portal and register with your mobile number.",
      "Log in and select Revenue Department → Income Certificate.",
      "Fill the applicant and income details.",
      "Upload the supporting documents.",
      "Pay the service fee if applicable and submit.",
      "Note the application number and track it under 'Application Status'.",
      "Download the digitally signed certificate once approved.",
    ],
    deadline: "Open throughout the year (typically issued in 15–30 days)",
    state: "Tamil Nadu",
    official_url: "https://tnesevai.tn.gov.in",
    official_source: "Government of Tamil Nadu — TN e-Sevai",
    last_verified: "2026-01",
    keywords: ["income certificate", "வருமான சான்றிதழ்", "revenue", "certificate", "e-sevai"],
  },
  {
    id: "community-certificate-tn",
    name: "Community / Caste Certificate (Tamil Nadu e-Sevai)",
    category: "certificate",
    type: "Certificate",
    description: "Certificate certifying the applicant's community, required for reservation benefits and many scholarships.",
    purpose: "Prove community status for education, employment and welfare benefits.",
    target_users: "Residents of Tamil Nadu belonging to a notified community.",
    eligibility_rules: [{ field: "state", op: "in", values: ["Tamil Nadu"] }],
    eligibility_notes: ["Family community records are verified by the Revenue Department."],
    benefits: ["Permanent community certificate used for reservation and welfare benefits"],
    required_documents: [
      "Aadhaar",
      "Ration card",
      "Address proof",
      "Community certificate of father / blood relative",
      "School transfer certificate",
    ],
    application_steps: [
      "Log in to the TN e-Sevai portal.",
      "Select Revenue Department → Community Certificate.",
      "Fill applicant and family details.",
      "Upload supporting documents including the parent's certificate.",
      "Submit and note the application number.",
      "Track status and download the signed certificate after verification.",
    ],
    deadline: "Open throughout the year",
    state: "Tamil Nadu",
    official_url: "https://tnesevai.tn.gov.in",
    official_source: "Government of Tamil Nadu — TN e-Sevai",
    last_verified: "2026-01",
    keywords: ["caste certificate", "community", "சாதி சான்றிதழ்", "certificate"],
  },
  {
    id: "upsc-cse",
    name: "UPSC Civil Services Examination",
    category: "exam",
    type: "Government exam",
    description: "National level examination for recruitment to IAS, IPS, IFS and other central services.",
    purpose: "Recruitment to All India and Central Civil Services.",
    target_users: "Graduates aged 21–32 (age relaxation applies for reserved categories).",
    eligibility_rules: [
      { field: "age", op: "between", min: 21, max: 32 },
      { field: "education_level", op: "in", values: ["ug", "pg"] },
    ],
    eligibility_notes: [
      "A degree from a recognised university is mandatory.",
      "Age relaxation: 5 years for SC/ST, 3 years for OBC, and more for PwBD candidates.",
      "Number of attempts is limited by category.",
    ],
    benefits: ["Entry into IAS, IPS, IFS and other Group A/B services"],
    required_documents: [
      "Degree certificate / final year proof",
      "Class 10 certificate for date of birth",
      "Category certificate if applicable",
      "Photo, signature and photo ID",
    ],
    application_steps: [
      "Complete the UPSC One Time Registration (OTR) on upsconline.",
      "Log in when the notification is released and open the CSE application.",
      "Fill personal, educational and exam centre details.",
      "Upload photo, signature and photo ID as per the size specifications.",
      "Pay the examination fee (fee exemption applies for some categories).",
      "Submit the form and download the acknowledgement with the registration ID.",
      "Download the admit card from the UPSC website before the exam.",
    ],
    deadline: "Notification usually in January–February; exam in May–June",
    state: ALL,
    official_url: "https://upsc.gov.in",
    official_source: "Union Public Service Commission",
    last_verified: "2026-01",
    keywords: ["upsc", "ias", "civil services", "exam", "தேர்வு", "government exam"],
  },
  {
    id: "ssc-cgl",
    name: "SSC Combined Graduate Level Examination",
    category: "exam",
    type: "Government exam",
    description: "Staff Selection Commission exam for Group B and C posts in central government departments.",
    purpose: "Recruitment to central government non-gazetted posts.",
    target_users: "Graduates, generally aged 18–32 depending on the post.",
    eligibility_rules: [
      { field: "age", op: "between", min: 18, max: 32 },
      { field: "education_level", op: "in", values: ["ug", "pg"] },
    ],
    eligibility_notes: [
      "Post-wise age limits differ; check the notification.",
      "Some posts require specific subjects such as Economics or Statistics.",
    ],
    benefits: ["Central government job with pay level 4 to 8 posts"],
    required_documents: ["Degree certificate", "Class 10 certificate", "Category certificate if applicable", "Photo and signature"],
    application_steps: [
      "Complete SSC One Time Registration on the SSC portal.",
      "Log in and open the CGL application when the notice is live.",
      "Fill post preferences and exam centre choices.",
      "Upload photo and signature in the specified format.",
      "Pay the fee online (exempt for women and SC/ST/PwBD/ESM).",
      "Submit and save the application printout with the registration number.",
    ],
    deadline: "Notification typically in the middle of the year",
    state: ALL,
    official_url: "https://ssc.gov.in",
    official_source: "Staff Selection Commission",
    last_verified: "2026-01",
    keywords: ["ssc", "cgl", "government job exam", "graduate", "exam"],
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    category: "financial",
    type: "Savings scheme",
    description: "Small savings scheme for a girl child with a high fixed interest rate and tax benefits.",
    purpose: "Build a corpus for a girl child's education and marriage.",
    target_users: "Parents/guardians of a girl child below 10 years of age.",
    eligibility_rules: [],
    eligibility_notes: [
      "Account can be opened only for a girl child below 10 years.",
      "Maximum two accounts per family (exceptions for twins).",
    ],
    benefits: [
      "Attractive government-notified interest rate revised quarterly",
      "Deposits qualify for deduction under section 80C",
      "Maturity amount is tax free",
    ],
    required_documents: ["Girl child's birth certificate", "Parent's Aadhaar and PAN", "Address proof", "Photos"],
    application_steps: [
      "Visit a post office or an authorised bank branch.",
      "Fill the SSY account opening form (form SSA-1).",
      "Attach the birth certificate and parent's KYC documents.",
      "Make the initial deposit (minimum ₹250).",
      "Collect the passbook and continue yearly deposits.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://www.indiapost.gov.in",
    official_source: "Department of Posts, Ministry of Finance",
    last_verified: "2026-01",
    keywords: ["girl child", "savings", "sukanya", "daughter", "deposit"],
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    category: "employment",
    type: "Artisan support",
    description: "Support for traditional artisans and craftspeople with training, toolkit incentive and collateral-free credit.",
    purpose: "Strengthen livelihoods of artisans working with hands and tools.",
    target_users: "Artisans in 18 recognised trades such as carpenter, tailor, blacksmith, potter and barber, aged 18+.",
    eligibility_rules: [{ field: "age", op: "gte", value: 18 }],
    eligibility_notes: [
      "Only one member per family; family members in government service are excluded.",
      "Applicant must be engaged in one of the 18 notified trades.",
    ],
    benefits: [
      "Skill training with a stipend of ₹500 per day",
      "₹15,000 toolkit incentive",
      "Collateral-free loan up to ₹3 lakh at concessional interest",
      "PM Vishwakarma certificate and ID card",
    ],
    required_documents: ["Aadhaar", "Mobile linked to Aadhaar", "Bank account details", "Ration card"],
    application_steps: [
      "Visit a Common Service Centre or the PM Vishwakarma portal.",
      "Complete Aadhaar biometric/OTP authentication.",
      "Fill trade, family and bank details.",
      "Submit for three-stage verification (Panchayat/ULB, district and screening committee).",
      "After approval, complete training and apply for the toolkit incentive and loan.",
    ],
    deadline: "Open throughout the year",
    state: ALL,
    official_url: "https://pmvishwakarma.gov.in",
    official_source: "Ministry of Micro, Small and Medium Enterprises",
    last_verified: "2026-01",
    keywords: ["artisan", "tailor", "carpenter", "loan", "toolkit", "trade", "தையல்"],
  },
];

export function getOpportunity(id: string) {
  return OPPORTUNITIES.find((o) => o.id === id) ?? null;
}

/** Lightweight lexical + category retrieval used to ground the LLM (RAG-style). */
export function retrieve(query: string, opts?: { category?: Category; state?: string; limit?: number }) {
  const q = query.toLowerCase();
  const tokens = q.split(/[^\p{L}\p{N}]+/u).filter((t) => t.length > 2);

  const scored = OPPORTUNITIES.map((o) => {
    let score = 0;
    const hay = [o.name, o.description, o.purpose, o.target_users, o.type, ...o.keywords]
      .join(" ")
      .toLowerCase();
    for (const t of tokens) if (hay.includes(t)) score += 2;
    for (const k of o.keywords) if (q.includes(k.toLowerCase())) score += 3;
    if (opts?.category && o.category === opts.category) score += 6;
    if (opts?.state && (o.state === opts.state || o.state === ALL)) score += 1;
    if (opts?.state && o.state !== ALL && o.state !== opts.state) score -= 4;
    return { o, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, opts?.limit ?? 6).map((s) => s.o);
}