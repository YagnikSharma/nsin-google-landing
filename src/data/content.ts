export const LINKS = {
  repo: "https://github.com/YagnikSharma/Task_Force_141_Google_Startup_Buildathon_India_2026",
  site: "https://github.com/YagnikSharma/nsin-google-landing",
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
