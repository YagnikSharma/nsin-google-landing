import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, Cloud, Database, FileCode2, Github, KeyRound, Languages,
  Linkedin, Lock, Minus, Rocket, Server, ShieldCheck, Siren, Sparkles, TestTube2, Timer, Zap,
} from "lucide-react";
import { COMPARE, DOCS, FLOW, GOOGLE_PRODUCTS, LINKS, MARKET, PRICING, PROBLEMS, ROADMAP, STATS, TEAM, type ProductStatus } from "./data/content";
import { Counter, Logo, Reveal, SectionHead, Shapes, Spotlight, ThemeToggle, TONE, useTheme } from "./components/ui";
import { ProductDemo } from "./components/PhoneDemo";
import { Explore } from "./components/Explore";
import { useLive, type LiveState } from "./components/live";
import recorded from "./data/recorded.json";

type Triage = (typeof recorded.results.triage)[keyof typeof recorded.results.triage];
const EXAMPLES: { key: keyof typeof recorded.results.triage; label: string }[] = [
  { key: "hinglish_sos", label: "Hinglish · medical" },
  { key: "hinglish_knife", label: "Hinglish · threat" },
  { key: "elder", label: "English · elder" },
  { key: "streetlight", label: "English · hazard" },
];

const NAV = [["Problem", "#problem"], ["Gemini", "#gemini"], ["Live demo", "#demo"], ["Google Cloud", "#cloud"], ["Proof", "#proof"], ["Business", "#business"], ["Team", "#team"], ["Pitch", "/pitch"]];
const TICKER = ["Gemini · structured JSON", "gemini-embedding-001 · 768 dims", "Cloud Run", "Cloud SQL · PostgreSQL 16", "pgvector · HNSW", "Secret Manager", "Cloud Build", "Firebase Hosting", "Google AI Studio", "Google Antigravity", "English · Hindi · Hinglish", "85 tests · 0 mocks"];
const PRIO: Record<string, string> = { P1_CRITICAL: "text-g-red", P2_HIGH: "text-[#e37400] dark:text-g-yellow", P3_MODERATE: "text-brand", P4_ADVISORY: "text-ink-3" };
const pretty = (p?: string) => (p ?? "").replace("_", " · ");

function LivePill({ live }: { live: LiveState }) {
  const on = live.status === "live";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] ${on ? "border-g-green/40 bg-g-green-soft text-g-green" : "border-line bg-surface text-ink-3"}`}>
      <span className="relative flex h-2 w-2">
        {on && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-green opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${on ? "bg-g-green" : live.status === "checking" ? "bg-g-yellow" : "bg-ink-3"}`} />
      </span>
      {on ? `LIVE · CLOUD RUN · ${live.model ?? "GEMINI"}` : live.status === "checking" ? "CONNECTING" : "RECORDED MODE · REAL GEMINI RESPONSES"}
    </span>
  );
}

function Nav({ live, dark, toggle }: { live: LiveState; dark: boolean; toggle: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" aria-label="NSIN home"><Logo /></a>
        <nav className="ml-2 hidden items-center gap-1 xl:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="rounded-full px-3 py-1.5 text-sm text-ink-2 transition hover:bg-surface-2 hover:text-ink">{l}</a>)}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden lg:block"><LivePill live={live} /></span>
          <ThemeToggle dark={dark} toggle={toggle} />
          <a href={LINKS.repo} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-ink sm:inline-flex"><Github className="h-4 w-4" />Source</a>
        </div>
      </div>
    </header>
  );
}

/** Types the report out, then shows how the rules and Gemini each read it. */
function GeminiCard() {
  const order: (keyof typeof recorded.results.triage)[] = ["hinglish_sos", "hinglish_knife"];
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const t: Triage = recorded.results.triage[order[idx]];
  const done = typed >= t.input.length;
  useEffect(() => {
    if (!done) { const id = setTimeout(() => setTyped((n) => n + 1), 28); return () => clearTimeout(id); }
    const id = setTimeout(() => { setIdx((i) => (i + 1) % order.length); setTyped(0); }, 6500);
    return () => clearTimeout(id);
  }, [typed, done]); // eslint-disable-line react-hooks/exhaustive-deps
  const o = t.output;
  return (
    <div className="relative rounded-[30px] border-2 border-transparent p-[2px] gemini-border shadow-[0_40px_80px_-30px_rgba(26,115,232,.45)]">
      <div className="rounded-[27px] bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-brand" />Gemini triage</span>
          <span className="font-mono text-[10px] text-ink-3">real response · {recorded.recorded_at}</span>
        </div>
        <div className="mt-4 rounded-2xl bg-surface-2 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-g-red">SOS · resident types</p>
          <p className={`mt-1.5 min-h-[3rem] text-[15px] leading-snug ${done ? "" : "caret"}`}>"{t.input.slice(0, typed)}{done ? '"' : ""}</p>
        </div>
        <AnimatePresence mode="wait">
          {done && (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line p-3">
                  <p className="text-[11px] text-ink-3">Keyword rules alone</p>
                  <p className={`mt-1 font-semibold ${PRIO[o.rule_priority ?? ""]}`}>{pretty(o.rule_priority)}</p>
                </div>
                <div className="rounded-2xl border border-g-red/40 bg-g-red-soft p-3">
                  <p className="text-[11px] text-ink-2">With Gemini · {o.gemini?.detected_language}</p>
                  <p className={`mt-1 font-semibold ${PRIO[o.suggested_priority]}`}>{pretty(o.suggested_priority)} {o.escalated && "· escalated"}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-brand-soft p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">Responder briefing</p>
                <p className="mt-1 text-sm leading-snug text-ink">{o.gemini?.responder_briefing}</p>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-ink-2"><Siren className="h-3.5 w-3.5 text-g-red" />{o.immediate_safety_checklist[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Hero({ live }: { live: LiveState }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="aurora animate-drift -z-10 left-[-10%] top-[-10%] h-[520px] w-[520px]" style={{ background: "var(--glow-a)" }} />
      <div className="aurora animate-drift -z-10 right-[-8%] top-[10%] h-[560px] w-[560px]" style={{ background: "var(--glow-b)", animationDelay: "-5s" }} />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:pt-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-ink-2">
              <Shapes className="h-4 w-4" />STARTUP BUILDATHON INDIA 2026 · TASK FORCE 141
            </span>
            <span className="lg:hidden"><LivePill live={live} /></span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[clamp(2.7rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Help is two<br />minutes away.<br /><span className="gemini-text">NSIN makes sure it knows.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
            A neighbourhood emergency network for Indian cities. A resident raises an SOS in any language,
            <b className="text-ink"> Gemini</b> triages it in seconds, and the nearest verified volunteer claims it, tracked until help arrives.
            Built on <b className="text-ink">Google Cloud</b>.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#gemini" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_var(--brand)] transition hover:-translate-y-0.5">See Gemini triage <ArrowRight className="h-4 w-4" /></a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold">Try the app</a>
            <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[15px] font-medium text-ink-2 hover:text-ink"><Github className="h-4 w-4" />Source</a>
          </motion.div>
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold tracking-tight"><Counter to={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 text-xs leading-snug text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <Shapes className="animate-float absolute -right-4 -top-10 hidden h-24 w-24 opacity-90 lg:block" />
          <GeminiCard />
        </motion.div>
      </div>
      <div className="overflow-hidden border-y border-line bg-bg-2 py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-[12px] text-ink-3">
          {[...TICKER, ...TICKER].map((t, i) => <span key={i} className="inline-flex items-center gap-10">{t}<span className={["text-brand", "text-g-red", "text-g-yellow", "text-g-green"][i % 4]}>●</span></span>)}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="01" label="The problem" title="Neighbours already help." dim="They just never hear in time."
        text="In an emergency the first five minutes decide the outcome. Today a cry for help lands in the same group chat as a lost-parcel message." />
      <div className="grid gap-4 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.tag} delay={i * 0.08}>
            <Spotlight className="h-full p-7">
              <span className={`text-3xl font-semibold tracking-tight ${TONE[p.color].text}`}>{p.tag}</span>
              <p className="mt-4 text-lg leading-snug">{p.text}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <div className="card grid gap-6 p-7 md:grid-cols-3">
          {MARKET.map((m) => (
            <div key={m.value}>
              <p className="text-4xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-1 text-sm text-ink-2">{m.label}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-3">{m.source}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Flow() {
  return (
    <section className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="02" label="How it works" title="From one sentence" dim="to a volunteer at the door." />
        <div className="relative grid gap-4 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-[44px] hidden h-[3px] rounded-full bg-gradient-to-r from-[#ea4335] via-[#4285f4] via-60% to-[#34a853] lg:block" />
          {FLOW.map((f, i) => (
            <Reveal key={f.step} delay={i * 0.1}>
              <div className="card relative h-full p-6">
                <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-2xl font-mono text-sm font-semibold text-white ${TONE[f.color].bg}`}>{f.step}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.text}</p>
                <p className="mt-5 inline-block rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-ink-2">{f.tech}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GeminiSection() {
  const [k, setK] = useState(EXAMPLES[0].key);
  const t = recorded.results.triage[k];
  const o = t.output;
  const raised = o.rule_priority !== o.suggested_priority;
  return (
    <section id="gemini" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="03" label="Gemini at the core" title="Gemini reads panic" dim="and writes a plan."
        text={<>Every report goes through a keyword rule engine <i>and</i> Gemini. Gemini returns structured JSON validated against a schema. The rule: <b className="text-ink">Gemini can raise a priority, never lower it.</b> If Gemini is down, the rules still answer, so an SOS is never blocked. These are real responses.</>} />
      <Reveal>
        <div className="mb-5 flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button key={e.key} onClick={() => setK(e.key)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${k === e.key ? "border-brand bg-brand text-brand-ink" : "border-line bg-surface text-ink-2 hover:text-ink"}`}>{e.label}</button>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <div className="card flex flex-col gap-4 p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-g-red">What the resident typed</p>
              <p className="mt-2 text-xl leading-snug">"{t.input}"</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line p-4">
                <p className="text-xs text-ink-3">Rules alone</p>
                <p className={`mt-1 text-lg font-semibold ${PRIO[o.rule_priority ?? ""]}`}>{pretty(o.rule_priority)}</p>
              </div>
              <div className={`rounded-2xl border p-4 ${raised ? "border-g-red/40 bg-g-red-soft" : "border-g-green/40 bg-g-green-soft"}`}>
                <p className="text-xs text-ink-2">Final, with Gemini</p>
                <p className={`mt-1 text-lg font-semibold ${PRIO[o.suggested_priority]}`}>{pretty(o.suggested_priority)}</p>
              </div>
            </div>
            <p className="text-sm text-ink-2">{raised ? "Gemini understood what the keywords missed and escalated it." : "Gemini agreed with the rules."} Category: <b className="text-ink">{o.parsed_category.replace("_", " ")}</b> · language: <b className="text-ink">{o.gemini?.detected_language}</b> · {(o._ms / 1000).toFixed(1)} s end to end.</p>
            <div className="mt-auto flex flex-wrap gap-2 font-mono text-[11px] text-ink-3">
              {o.workflow_steps.map((s: string) => <span key={s} className="rounded-full bg-surface-2 px-2.5 py-1">{s}</span>)}
            </div>
          </div>
          <div className="card grid gap-4 p-6">
            <div className="rounded-2xl bg-brand-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">Responder briefing</p>
              <p className="mt-1.5 leading-snug">{o.gemini?.responder_briefing}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-g-green">Immediate actions</p>
              <ul className="mt-2 grid gap-1.5 text-sm">
                {o.immediate_safety_checklist.map((a: string) => <li key={a} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-g-green" />{a}</li>)}
              </ul>
            </div>
            {o.missing_critical_info.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#e37400] dark:text-g-yellow">Ask the reporter</p>
                <p className="mt-1 text-sm text-ink-2">{o.missing_critical_info.join(" · ")}</p>
              </div>
            )}
            {o.retrieved_civic_protocols[0] && (
              <p className="flex items-start gap-2 rounded-2xl bg-surface-2 p-3 text-sm"><BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><span><b>Cited protocol:</b> {o.retrieved_civic_protocols[0].title}</span></p>
            )}
          </div>
        </div>
      </Reveal>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[[Languages, "brand", "Speaks the neighbourhood", "English, Hindi and Hinglish, including panicked, misspelt text."], [ShieldCheck, "g-green", "Safe to be wrong", "Never downgrades a life-threat keyword. A rule fallback answers if Gemini is unavailable."], [Zap, "g-yellow", "Fast under load", "A 20-second budget, quota-aware model fallback and retries. Typically 3–7 s on the free tier."]].map(([I, c, h, d]) => {
          const Icon = I as typeof Zap;
          return (
            <Reveal key={h as string}><div className="card h-full p-6"><span className={`grid h-10 w-10 place-items-center rounded-xl ${TONE[c as string].soft} ${TONE[c as string].text}`}><Icon className="h-5 w-5" /></span><p className="mt-4 font-semibold">{h as string}</p><p className="mt-1 text-sm text-ink-2">{d as string}</p></div></Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Demo({ live }: { live: LiveState }) {
  return (
    <section id="demo" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="04" label="Live demo" title="Not a mock-up." dim="The real app, on Google Cloud."
          text="This is the actual NSIN web app, served from Firebase Hosting and talking to the API on Cloud Run. Tap a one-click demo login, report an incident in Hinglish, and watch Gemini triage it." />
        <Reveal><ProductDemo live={live} /></Reveal>
      </div>
    </section>
  );
}

const STATUS: Record<ProductStatus, { label: string; cls: string }> = {
  used: { label: "Used", cls: "bg-brand text-brand-ink" },
  deploy: { label: "Deploy", cls: "bg-g-green text-white" },
  planned: { label: "Planned", cls: "bg-surface-2 text-ink-2 border border-line" },
};

function Arch() {
  const box = (I: typeof Server, title: string, sub: string, tone: string) => (
    <div className={`rounded-2xl border p-4 ${TONE[tone].border} ${TONE[tone].soft}`}>
      <div className="flex items-center gap-2"><I className={`h-4 w-4 ${TONE[tone].text}`} /><p className="text-sm font-semibold">{title}</p></div>
      <p className="mt-1 font-mono text-[11px] text-ink-2">{sub}</p>
    </div>
  );
  return (
    <div className="card grid gap-4 p-6 lg:grid-cols-[1fr_auto_1.3fr_auto_1fr] lg:items-center">
      <div className="grid gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Clients</p>
        {box(Siren, "Android app", "Kotlin · Compose", "brand")}
        {box(Cloud, "Web app", "React · Firebase Hosting", "brand")}
      </div>
      <ArrowRight className="mx-auto hidden h-5 w-5 text-ink-3 lg:block" />
      <div className="rounded-3xl border-2 border-dashed border-g-green/50 p-4">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-g-green">Cloud Run · asia-south1 · autoscaling</p>
        <div className="grid gap-3">
          {box(Server, "FastAPI · SOS & incidents", "JWT · roles · audit trail", "g-green")}
          {box(Sparkles, "Triage workflow", "rules → Gemini → merge → route", "g-green")}
          {box(BookOpen, "Hybrid retriever + briefing", "BM25 + pgvector · grounded", "g-green")}
        </div>
      </div>
      <ArrowRight className="mx-auto hidden h-5 w-5 text-ink-3 lg:block" />
      <div className="grid gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">Google AI + data</p>
        {box(Sparkles, "Gemini", "structured JSON · fallback chain", "g-red")}
        {box(Database, "Cloud SQL + pgvector", "PostgreSQL 16 · HNSW cosine", "g-yellow")}
        {box(KeyRound, "Secret Manager", "keys never in code", "g-yellow")}
      </div>
    </div>
  );
}

function CloudSection() {
  return (
    <section id="cloud" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="05" label="Built on Google" title="Twelve Google products." dim="Prototype to production."
        text="We prototyped in Google AI Studio, build and test in Google Antigravity, and deploy with Cloud Build to Cloud Run, Cloud SQL and Firebase Hosting." />
      <Reveal><Arch /></Reveal>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GOOGLE_PRODUCTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.05}>
            <div className="card flex h-full items-start gap-3 p-5">
              <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${TONE[p.color].bg}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2"><p className="font-semibold">{p.name}</p><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS[p.status].cls}`}>{STATUS[p.status].label}</span></div>
                <p className="mt-1 text-sm text-ink-2">{p.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Proof({ live }: { live: LiveState }) {
  const checks = [
    [TestTube2, "brand", "85 tests · 96% coverage", "Real PostgreSQL + pgvector and the real Gemini API. Zero mocks."],
    [Lock, "g-green", "Least-privilege database role", "DDL and audit tampering are refused, proven by tests."],
    [ShieldCheck, "g-yellow", "Bandit 0 · pip-audit 0 · npm audit 0", "Static and dependency scans on every part."],
    [Timer, "g-red", `Recorded ${recorded.recorded_at}`, "Every response on this page came from a real run."],
  ] as const;
  return (
    <section id="proof" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="06" label="Proof" title="Don't trust the slides." dim="Read the responses." />
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map(([I, c, t, d]) => (
            <Reveal key={t}><div className="card h-full p-5"><I className={`h-5 w-5 ${TONE[c].text}`} /><p className="mt-3 font-semibold">{t}</p><p className="mt-1 text-sm text-ink-2">{d}</p></div></Reveal>
          ))}
        </div>
        <Reveal><Explore live={live} /></Reveal>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section id="business" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="07" label="Business" title="Free for neighbours." dim="Paid by the people who organise them."
        text="Societies and RWAs are already organised communities with a committee and a budget: our first customers. Families and institutions follow." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <div className="card h-full p-6">
              <span className={`inline-block h-2 w-10 rounded-full ${TONE[p.color].bg}`} />
              <p className="mt-4 font-semibold">{p.name}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{p.price}{p.unit && <span className="ml-1 text-sm font-normal text-ink-3">{p.unit}</span>}</p>
              <p className="mt-2 text-sm text-ink-2">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <div className="card overflow-x-auto p-2">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr>{["", ...COMPARE.cols].map((c, i) => <th key={c} className={`px-4 py-3 text-left font-semibold ${i === 1 ? "rounded-t-2xl bg-brand-soft text-brand" : "text-ink-2"}`}>{c}</th>)}</tr></thead>
            <tbody>
              {COMPARE.rows.map(([label, vals]) => (
                <tr key={label} className="border-t border-line">
                  <td className="px-4 py-3">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 0 ? "bg-brand-soft" : ""}`}>
                      {v === 1 ? <Check className="h-5 w-5 text-g-green" /> : v === 0.5 ? <span className="text-xs text-ink-3">partly</span> : <Minus className="h-4 w-4 text-ink-3/50" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="08" label="Team Task Force 141" title="Three founders." dim="Product, deep tech and the ground." />
        <div className="grid gap-4 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="card flex h-full flex-col items-center p-8 text-center">
                <div className={`rounded-full p-1.5 ${TONE[m.color].bg}`}>
                  <img src={m.photo} alt={m.name} width={160} height={160} loading="lazy" className={`h-40 w-40 rounded-full object-cover ${TONE[m.color].soft}`} />
                </div>
                <p className="mt-5 text-xl font-semibold">{m.name}</p>
                <p className={`mt-1 text-sm font-medium ${TONE[m.color].text}`}>{m.role}</p>
                <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink"><Linkedin className="h-4 w-4" />LinkedIn</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="09" label="Read more" title="Every decision" dim="is written down." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS.map((d, i) => (
          <Reveal key={d.title} delay={(i % 3) * 0.06}>
            <a href={d.href} target="_blank" rel="noreferrer" className="group block h-full">
              <Spotlight className="h-full p-6 transition group-hover:-translate-y-1">
                <BookOpen className="h-5 w-5 text-brand" />
                <p className="mt-4 flex items-center gap-1 text-lg font-semibold">{d.title}<ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" /></p>
                <p className="mt-1 text-sm text-ink-2">{d.text}</p>
              </Spotlight>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#1a73e8] p-10 text-white">
          <Shapes className="absolute -right-6 -top-6 h-40 w-40 opacity-30" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight">Safer streets start with one report.</p>
              <p className="mt-2 flex flex-wrap items-center gap-2 opacity-90"><Rocket className="h-4 w-4" />Next: {ROADMAP.join(" · ")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#1a73e8]">Try the app <ArrowRight className="h-4 w-4" /></a>
              <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 font-semibold"><Github className="h-4 w-4" />Source</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  const live = useLive();
  const [dark, toggle] = useTheme();
  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav live={live} dark={dark} toggle={toggle} />
      <main>
        <Hero live={live} />
        <Problem />
        <Flow />
        <GeminiSection />
        <Demo live={live} />
        <CloudSection />
        <Proof live={live} />
        <Business />
        <Team />
        <Closing />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <p className="inline-flex items-center gap-2"><Shapes className="h-4 w-4" />Startup Buildathon India 2026 · Team Task Force 141 · Open source</p>
          <div className="flex gap-4"><a href={LINKS.repo} className="inline-flex items-center gap-1 hover:text-ink"><FileCode2 className="h-4 w-4" />Code</a><a href={LINKS.site} className="inline-flex items-center gap-1 hover:text-ink"><Github className="h-4 w-4" />Site</a></div>
        </div>
      </footer>
    </div>
  );
}
