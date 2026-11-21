/** /pitch: the full deck and a presenter-friendly live pitch (intro → hook → explainer film → product demo → outro).
 *  Keyboard: ← / → move, F toggles fullscreen, S toggles the speaker script. */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Download, Expand, FileText, Mic, Presentation, X } from "lucide-react";

const SLIDES = 17;
const slideSrc = (n: number) => `/pitch/deck/s${String(n).padStart(2, "0")}.webp`;
const APP = "https://nsin-app.web.app";

type Step = { key: string; label: string; minutes: string; script: string[] };
const STEPS: Step[] = [
  { key: "intro", label: "Intro", minutes: "0:20", script: [
    "Good morning. I'm Yagnik, CEO of Task Force 141, with Devanshu, our CTO, and Sameeksha, our COO.",
    "We built NSIN, the Neighbourhood Safety Intelligence Network.",
  ] },
  { key: "hook", label: "Hook", minutes: "0:40", script: [
    "Every hour in India, about 51 crimes against women are registered. That's 4.45 lakh in a single year.",
    "1.62 lakh crimes against children. And 14.9 crore Indians are over 60, a number that doubles by 2050.",
    "Here's what nobody says out loud: in most emergencies, someone who could help is less than two minutes away. They just never find out.",
    "When our own neighbour's BP crashed, the fastest help was next door, and nobody knew.",
    "That gap is what we close. This two-minute film shows you how.",
  ] },
  { key: "explainer", label: "Explainer film", minutes: "2:00", script: [
    "(Play the film. Stay quiet; let it run.)",
  ] },
  { key: "demo", label: "Product demo", minutes: "1:20", script: [
    "Here's the live prototype doing it end to end, from a Hinglish SOS to a responder on the way.",
    "The venue network has been unreliable, so we recorded this run on our live link this morning. You can open the same link yourselves: nsin-app.web.app.",
    "(Play the demo.)",
  ] },
  { key: "outro", label: "Outro & ask", minutes: "0:45", script: [
    "Why this can't wait: Delhi recorded 14,158 crimes against women in 2022, the highest of any metro, three years running.",
    "India has about 1.25 lakh gated communities, on the way to 3.2 crore households. Every one of them pays for a guard and a gate app, and still has no plan for the first five minutes of an emergency.",
    "Companies running night shifts are accountable for every woman's ride home. Families with a parent living alone check their phone every evening, hoping.",
    "These people need this now. At about ₹20 a flat a month, a 500-flat society is covered for less than one guard's monthly salary.",
    "NSIN is live today. We want five Delhi NCR societies and one workplace to pilot it with us, and we'd love your help to open those doors. Thank you.",
  ] },
];

function useKeys(handlers: Record<string, () => void>) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const h = handlers[e.key] || handlers[e.key.toLowerCase()];
      if (h) { e.preventDefault(); h(); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [handlers]);
}

function fullscreen(el: HTMLElement | null) {
  if (!el) return;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else el.requestFullscreen?.().catch(() => {});
}

function Deck() {
  const [n, setN] = useState(1);
  const stage = useRef<HTMLDivElement>(null);
  const go = useCallback((d: number) => setN((v) => Math.min(SLIDES, Math.max(1, v + d))), []);
  useKeys({ ArrowRight: () => go(1), ArrowLeft: () => go(-1), " ": () => go(1), f: () => fullscreen(stage.current) });
  useEffect(() => { [n + 1, n + 2].forEach((k) => { if (k <= SLIDES) new Image().src = slideSrc(k); }); }, [n]);
  return (
    <div className="space-y-4">
      <div ref={stage} className="group relative overflow-hidden rounded-3xl border border-line bg-black shadow-[var(--shadow)]">
        <img src={slideSrc(n)} alt={`Slide ${n} of ${SLIDES}`} className="mx-auto aspect-video w-full object-contain" />
        <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#202124] opacity-0 shadow transition group-hover:opacity-100 disabled:opacity-0" disabled={n === 1}><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#202124] opacity-0 shadow transition group-hover:opacity-100 disabled:opacity-0" disabled={n === SLIDES}><ChevronRight className="h-5 w-5" /></button>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">{n} / {SLIDES}</span>
          <button onClick={() => fullscreen(stage.current)} aria-label="Fullscreen" className="rounded-full bg-black/60 p-1.5 text-white"><Expand className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: SLIDES }, (_, i) => i + 1).map((k) => (
          <button key={k} onClick={() => setN(k)} aria-label={`Go to slide ${k}`}
            className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${k === n ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"}`}>
            <img src={slideSrc(k)} alt="" loading="lazy" className="h-14 w-24 object-cover" />
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <a href="/pitch/NSIN_Deck.pdf" download className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 font-semibold text-brand-ink"><Download className="h-4 w-4" />Download PDF</a>
        <span className="text-ink-3">← → to move · F for fullscreen</span>
      </div>
    </div>
  );
}

function Stage({ step }: { step: Step }) {
  if (step.key === "intro") return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-6 h-1.5 w-40 rounded-full bg-gradient-to-r from-[#ea4335] via-[#fbbc04] to-[#34a853]" />
      <h2 className="text-6xl font-extrabold tracking-tight sm:text-7xl">NSIN</h2>
      <p className="mt-3 text-xl text-white/80">Neighbourhood Safety Intelligence Network</p>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {[["/team/yagnik.webp", "Yagnik Sharma", "CEO · Product & AI"], ["/team/devanshu.webp", "Devanshu Sharma", "CTO · Architecture & Cloud"], ["/team/sameeksha.webp", "Sameeksha", "COO · Ops & Community"]].map(([src, n, r]) => (
          <div key={n} className="flex flex-col items-center">
            <img src={src} alt="" className="h-24 w-24 rounded-full border-4 border-white/20 object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <div className="mt-3 font-semibold">{n}</div><div className="text-sm text-white/70">{r}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-white/60">Team Task Force 141</p>
    </div>
  );
  if (step.key === "hook") return (
    <div className="flex h-full flex-col justify-center gap-6 px-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["~51", "crimes against women registered every hour", "#f28b82"], ["1.62 lakh", "crimes against children in a year", "#fdd663"], ["14.9 crore", "Indians over 60, doubling by 2050", "#81c995"]].map(([k, d, c]) => (
          <div key={k} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-5xl font-extrabold" style={{ color: c }}>{k}</div>
            <div className="mt-2 text-base text-white/80">{d}</div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl bg-white/5 p-6 text-center ring-1 ring-white/10">
        <div className="text-3xl font-bold sm:text-4xl">Help is often <span className="text-[#8ab4f8]">2 minutes</span> away.</div>
        <div className="mt-1 text-2xl text-white/70">Nobody nearby finds out.</div>
      </div>
      <p className="text-center text-xs text-white/50">Sources: NCRB Crime in India 2022 · UNFPA India Ageing Report 2023</p>
    </div>
  );
  if (step.key === "explainer" || step.key === "demo") return (
    <div className="flex h-full items-center justify-center">
      <video key={step.key} src={step.key === "explainer" ? "/pitch/explainer.mp4" : "/pitch/demo.mp4"} controls playsInline preload="metadata"
        poster={step.key === "explainer" ? "/pitch/explainer.jpg" : "/pitch/demo.jpg"} className="max-h-full w-full rounded-2xl bg-black" />
    </div>
  );
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["14,158", "crimes against women in Delhi in 2022: highest metro, 3 years running"], ["1.25 lakh", "gated communities, heading to 3.2 crore households"], ["< 1 guard", "a 500-flat society costs less than one guard's monthly salary"]].map(([k, d]) => (
          <div key={k} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-4xl font-extrabold text-[#8ab4f8]">{k}</div>
            <div className="mt-2 text-sm text-white/80">{d}</div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl bg-[#1a73e8] p-8 text-center">
        <div className="text-sm font-semibold uppercase tracking-widest text-white/80">Pilot NSIN with us</div>
        <div className="mt-2 text-3xl font-extrabold sm:text-4xl">5 Delhi NCR societies · 1 workplace</div>
        <div className="mt-3 text-lg">Live today: <span className="font-bold">nsin-app.web.app</span></div>
      </div>
      <p className="text-center text-xs text-white/50">Sources: NCRB Crime in India 2022 · Redseer (gated communities)</p>
    </div>
  );
}

function LivePitch() {
  const [i, setI] = useState(0);
  const [script, setScript] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const go = useCallback((d: number) => setI((v) => Math.min(STEPS.length - 1, Math.max(0, v + d))), []);
  useKeys({ ArrowRight: () => go(1), ArrowLeft: () => go(-1), f: () => fullscreen(stage.current), s: () => setScript((v) => !v) });
  const step = STEPS[i];
  return (
    <div className="space-y-4">
      <ol className="flex flex-wrap gap-2">
        {STEPS.map((s, k) => (
          <li key={s.key}>
            <button onClick={() => setI(k)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${k === i ? "bg-brand text-brand-ink" : "bg-surface-2 text-ink-2 hover:text-ink"}`}>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-black/10 text-xs">{k + 1}</span>{s.label}<span className="text-xs opacity-70">{s.minutes}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className={`grid gap-4 ${script ? "lg:grid-cols-[1fr_360px]" : ""}`}>
        <div ref={stage} className="relative aspect-video overflow-hidden rounded-3xl bg-[radial-gradient(1200px_600px_at_20%_0%,#1a3a7a_0%,#0b1220_60%)] p-6 text-white shadow-[var(--shadow)]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ea4335] via-[#fbbc04] via-60% to-[#34a853]" />
          <Stage step={step} />
          <button onClick={() => fullscreen(stage.current)} aria-label="Fullscreen" className="absolute bottom-3 right-3 rounded-full bg-black/50 p-1.5 text-white"><Expand className="h-4 w-4" /></button>
        </div>
        {script && (
          <aside className="rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold"><Mic className="h-4 w-4 text-brand" />Speaker script · {step.label}</div>
              <button onClick={() => setScript(false)} aria-label="Hide script" className="text-ink-3 hover:text-ink"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed">
              {step.script.map((l, k) => <p key={k} className={l.startsWith("(") ? "italic text-ink-3" : ""}>{l}</p>)}
            </div>
          </aside>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button onClick={() => go(-1)} disabled={i === 0} className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 font-semibold disabled:opacity-40"><ArrowLeft className="h-4 w-4" />Back</button>
        <button onClick={() => go(1)} disabled={i === STEPS.length - 1} className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 font-semibold text-brand-ink disabled:opacity-40">Next<ArrowRight className="h-4 w-4" /></button>
        {!script && <button onClick={() => setScript(true)} className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 font-semibold"><FileText className="h-4 w-4" />Show script</button>}
        <span className="text-ink-3">← → to move · F fullscreen · S script</span>
      </div>
    </div>
  );
}

export default function Pitch() {
  // Each tab is a real browser-history step: Back always returns to the view you came from.
  const fromHash = (): "deck" | "live" => (location.hash === "#live" ? "live" : "deck");
  const [tab, setTabState] = useState<"deck" | "live">(fromHash);
  const setTab = (t: "deck" | "live") => {
    if (t === tab) return;
    history.pushState(null, "", t === "live" ? "#live" : "#deck");
    setTabState(t);
  };
  useEffect(() => {
    const sync = () => setTabState(fromHash());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <a href="/" className="inline-flex items-center gap-2 font-bold"><ArrowLeft className="h-4 w-4" />NSIN</a>
          <div className="ml-4 inline-flex rounded-full border border-line bg-surface p-1 text-sm font-semibold">
            <button onClick={() => setTab("deck")} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 ${tab === "deck" ? "bg-brand text-brand-ink" : "text-ink-2"}`}><Presentation className="h-4 w-4" />Pitch deck</button>
            <button onClick={() => setTab("live")} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 ${tab === "live" ? "bg-brand text-brand-ink" : "text-ink-2"}`}><Mic className="h-4 w-4" />Live pitch</button>
          </div>
          <a href={APP} target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-ink">Open the live app</a>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{tab === "deck" ? <Deck /> : <LivePitch />}</main>
    </div>
  );
}
