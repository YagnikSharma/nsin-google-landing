export const LINKS = {
  repo: "https://github.com/YagnikSharma/Task_Force_141_Google_Startup_Buildathon_India_2026",
  site: "https://nsin-app.web.app",
  landingRepo: "https://github.com/YagnikSharma/nsin-google-landing",
  app: "/app/",
  setup: "https://github.com/YagnikSharma/Task_Force_141_Google_Startup_Buildathon_India_2026/blob/main/docs/GOOGLE_CLOUD_SETUP.md",
};

const BLOB = LINKS.repo + "/blob/main";
export const DOCS = [
  { title: "Architecture", text: "Cloud Run, Cloud SQL + pgvector, Gemini and Firebase Hosting, with the request flow and the scaling path.", href: BLOB + "/architecture.md" },
  { title: "AI design", text: "Gemini triage with structured output, the never-downgrade rule, grounded briefings and measured calibration.", href: BLOB + "/docs/AI_DESIGN.md" },
  { title: "Google Cloud setup", text: "From a new Google account to a live deploy, step by step, written for first-time users.", href: BLOB + "/docs/GOOGLE_CLOUD_SETUP.md" },
  { title: "Security & privacy", text: "Threat model mapped to tests, least-privilege database role, Secret Manager, scan results.", href: BLOB + "/docs/SECURITY.md" },
  { title: "Testing", text: "85 tests against a real PostgreSQL and the real Gemini API. No mocks.", href: BLOB + "/docs/TESTING.md" },
  { title: "Source code", text: "FastAPI backend, React web app, Android app, deploy scripts.", href: LINKS.repo },
];

export const STATS = [
  { value: 12, suffix: "", label: "Google products in the build and deploy path" },
  { value: 3, suffix: "", label: "languages understood: English, Hindi, Hinglish" },
  { value: 85, suffix: "", label: "tests on real infrastructure" },
  { value: 0, suffix: "", label: "mocks: every test is a real call" },
];

export const PROBLEMS = [
  { tag: "15–30 min", color: "g-red", text: "Official help in Indian cities can take this long. The neighbour who could help in two minutes never finds out." },
  { tag: "Group chat", color: "g-yellow", text: "An SOS lands between a lost-parcel message and a maintenance reminder. No priority, no owner, no record." },
  { tag: "Families", color: "brand", text: "Did my child reach school? Is my father, who lives alone, okay today? Nobody can see." },
];

export const MARKET = [
  { value: "~15 cr", label: "Indians aged 60+, rising to 20% of the population by 2050", source: "UNFPA India Ageing Report 2023" },
  { value: "4.45 lakh", label: "crimes against women registered in 2022", source: "NCRB, Crime in India 2022" },
  { value: "83,000+", label: "children reported missing in 2022", source: "NCRB, Crime in India 2022" },
];

export const FLOW = [
  { step: "01", color: "g-red", title: "SOS", text: "One tap, or a sentence in any language. Location and trusted contacts attached.", tech: "Cloud Run · FastAPI" },
  { step: "02", color: "brand", title: "Gemini triage", text: "Gemini returns structured JSON: priority, category, briefing, actions and missing details.", tech: "Gemini · structured output" },
  { step: "03", color: "g-yellow", title: "Dispatch", text: "The nearest verified volunteer claims it. Duplicates are linked by meaning.", tech: "pgvector · Gemini embeddings" },
  { step: "04", color: "g-green", title: "Resolved", text: "Tracked to the end, audited, and counted in the RWA's response-time analytics.", tech: "Cloud SQL · SQL analytics" },
];

export type ProductStatus = "used" | "deploy" | "planned";
export const GOOGLE_PRODUCTS: { name: string; role: string; status: ProductStatus; color: string }[] = [
  { name: "Google AI Studio", role: "First prototype, prompt + JSON schema design, API key", status: "used", color: "brand" },
  { name: "Gemini API", role: "Triage with structured output, grounded briefings", status: "used", color: "brand" },
  { name: "Gemini embeddings", role: "Protocol search + duplicate-report detection", status: "used", color: "brand" },
  { name: "Google Antigravity", role: "Agent-first IDE for building and testing", status: "used", color: "g-red" },
  { name: "Android", role: "Native NSIN app (Kotlin, Jetpack Compose)", status: "used", color: "g-green" },
  { name: "Cloud Run", role: "Autoscaling FastAPI backend, HTTPS, scale to zero", status: "deploy", color: "g-green" },
  { name: "Cloud SQL + pgvector", role: "System of record, vector search, analytics SQL", status: "deploy", color: "g-yellow" },
  { name: "Secret Manager", role: "DB password, JWT secret, Gemini key", status: "deploy", color: "g-yellow" },
  { name: "Cloud Build + Artifact Registry", role: "Build → push → deploy pipeline", status: "deploy", color: "g-green" },
  { name: "Firebase Hosting", role: "This site and the web app on a global CDN", status: "deploy", color: "g-yellow" },
  { name: "Gemini Live", role: "Hands-free voice SOS", status: "planned", color: "g-red" },
  { name: "Gemma", role: "On-device triage when the network drops", status: "planned", color: "g-red" },
];

export const PRICING = [
  { name: "Residents", price: "Free", text: "SOS, reports, contacts, community alerts. Free forever, so the network grows.", color: "g-green" },
  { name: "Society / RWA", price: "₹15–25", unit: "per flat / month", text: "Responder management, dashboards, response-time analytics, hotspot reports.", color: "brand" },
  { name: "Family plan", price: "₹99", unit: "per month", text: "Elder check-ins, child-commute tracking, multi-city family links.", color: "g-red" },
  { name: "B2B & city", price: "Custom", text: "Campuses, hostels, corporates, townships; anonymised dashboards for city safety teams.", color: "g-yellow" },
];

export const COMPARE = {
  cols: ["NSIN", "Society apps", "112 / police apps", "WhatsApp groups", "Family trackers"],
  rows: [
    ["AI triage with priority (Hindi, English, Hinglish)", [1, 0, 0, 0, 0]],
    ["Nearby verified volunteer responders", [1, 0, 0, 0.5, 0]],
    ["Incident tracked to resolution", [1, 0, 1, 0, 0]],
    ["Child commute + elder check-ins", [1, 0, 0, 0, 0.5]],
    ["Community response-time analytics", [1, 0, 0, 0, 0]],
  ] as [string, number[]][],
};

export const TEAM = [
  { name: "Yagnik Sharma", role: "CEO · Product & AI", photo: "/team/yagnik.webp", color: "brand", linkedin: "https://www.linkedin.com/in/yagnik-sharma/" },
  { name: "Devanshu Sharma", role: "CTO · Architecture & Cloud", photo: "/team/devanshu.webp", color: "g-red", linkedin: "https://www.linkedin.com/in/ddevsharma/" },
  { name: "Sameeksha", role: "COO · Operations & Community", photo: "/team/sameeksha.webp", color: "g-green", linkedin: "https://www.linkedin.com/in/sameeksha2005/" },
];

export const ROADMAP = ["Gemini Live voice SOS", "Gemma on-device triage", "Google Agent Skills for dispatch", "Firebase Auth + Cloud Messaging", "Google Maps Platform geofencing"];

export const COMPANY = {
  team: "Team Task Force 141",
  startup: "DYS Healthtech Pvt Ltd",
  incubator: "Incubated at KCIISF, AKTU",
  hub: "Innovation Hub, Uttar Pradesh",
};

/** Startup achievements (photos in /public/achievements, cropped to remove private details). */
export const ACHIEVEMENTS = [
  { title: "Best Pitch Award", event: "IDE Bootcamp 2026 · Nodal Centre", by: "Ministry of Education · Wadhwani Foundation", photo: "/achievements/ide_bootcamp_win.webp", tone: "g-yellow" },
  { title: "Winner", event: "IIT Bombay Eureka! Zonal Pitchfest 2026", by: "E-Cell IIT Bombay", photo: "/achievements/eureka_zonal.webp", tone: "brand" },
  { title: "Winner", event: "Smart India Hackathon 2026 · Internal round", by: "Ministry of Education's Innovation Cell", photo: "/achievements/sih_2026_internal_hackathon.webp", tone: "g-green" },
  { title: "Finalist", event: "IEEE YESIST12 2026", by: "Selected from 2,000+ submissions", photo: "/achievements/yesist12_finalist.webp", tone: "g-red", fit: "contain" },
  { title: "4.5 / 5 rating", event: "Wadhwani Venture Journey · Ignite Bootcamp", by: "Rated by the IDE jury", photo: "/achievements/wadhwani_rating.webp", tone: "brand", fit: "contain" },
] as const;

/** Research tab: what we found, who needs it most, how we built it, and what we rejected. */
export const RESEARCH = {
  found: [
    { n: "4,45,256", t: "crimes against women in India in 2022, about 51 an hour", src: "NCRB, Crime in India 2022", href: "https://www.tribuneindia.com/news/india/every-hour-52-crimes-against-women-cases-registered-in-india-in-2022-569041" },
    { n: "14,158", t: "in Delhi alone: the highest of 19 metros, 3rd year running", src: "NCRB 2022", href: "https://business-standard.com/india-news/ncrb-wrap-crime-rate-dips-over-1k-crimes-against-women-reported-daily-123120701125_1.html" },
    { n: "~10%", t: "lower survival for every minute CPR is delayed in a cardiac arrest", src: "American Heart Association", href: "https://www.heart.org/en/news/2023/02/01/11-things-to-know-to-save-a-life-with-cpr" },
    { n: "~8 min", t: "average Delhi 112 response: fast, but a neighbour is two doors away", src: "The Daily Pioneer", href: "https://dailypioneer.com/page1/safety-first-delhi-police-step-up-womens-protection" },
    { n: "1.25 → 1.8 lakh", t: "gated communities in India (FY21 → FY31); only ~25% use any digital platform", src: "Redseer", href: "https://redseer.com/reports/indias-gated-communities-the-900bn-consumer-cluster/" },
    { n: "14.9 → 34.7 cr", t: "Indians aged 60+ (2022 → 2050)", src: "UNFPA India Ageing Report 2023", href: "https://india.unfpa.org/en/news/india-ageing-elderly-make-20-population-2050-unfpa-report" },
  ],
  segments: [
    { who: "Housing societies (RWAs)", why: "Already responsible for safety and already pay for guards, but have no plan for the first five minutes.", first: true },
    { who: "Workplaces with women on night shifts", why: "Delhi allows night shifts for women only with employer-arranged safe transport and security." },
    { who: "Families", why: "A child on the way home from school, a parent living alone, a daughter travelling late." },
  ],
  pilot: [
    "5 Delhi NCR societies + 1 workplace, free for 60 days",
    "Verify responders with the RWA: guards, resident doctors and nurses, volunteers",
    "One mock SOS drill per society",
    "Measure: time to first claim, time to arrival, SOS closed, false alarms, active users",
    "Interview residents every 2 weeks: who uses it most, what's missing",
  ],
  built: [
    { day: "Before the Buildathon (15–17 Nov)", items: ["Idea submitted", "Core SOS + incident timeline on FastAPI and PostgreSQL", "Gemini triage with a safety-rules floor and model fallback", "Gemini embeddings + pgvector protocol search"] },
    { day: "Buildathon day 1 (20 Nov)", items: ["Jugnu: a Gemini agent with 9 tools and Confirm-before-act", "Live community map with demo dispatch and privacy masking", "Staff priority override with a logged reason", "Android APK build pipeline"] },
    { day: "Buildathon day 2 (21 Nov)", items: ["Deployed: Cloud Build → Cloud Run, Cloud SQL, Secret Manager, Firebase Hosting", "Women in Transit Safe Route score", "“Call 112 now” for critical cases", "Offline rules that understand Hinglish (bachao, chaku, saans nahi)", "Full app redesign with a phone tab bar"] },
  ],
  rejected: [
    { what: "Face recognition", why: "Privacy (DPDP Act) and bias risk. Identity comes from the society account." },
    { what: "24/7 camera and microphone recording", why: "Android blocks it in the background, and consent must be for a specific purpose. Planned instead: recording only while an SOS is active." },
    { what: "The app calling 112 by itself", why: "Phones don't allow it. We open the dialer with 112 ready, and show it first for every critical case." },
    { what: "A bigger Gemini model", why: "It timed out live. Flash-Lite answers a Hinglish SOS in ~2 s, and in an emergency speed matters more than depth." },
    { what: "Letting the AI lower a priority", why: "The AI can only raise it above the safety rules. Staff can override, with a written reason in the audit log." },
  ],
};
