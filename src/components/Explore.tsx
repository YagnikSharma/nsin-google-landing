import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Play, Radio, Archive } from "lucide-react";
import recorded from "../data/recorded.json";
import { liveCall, type LiveState } from "./live";

type Scenario = { id: keyof typeof recorded.results; label: string; method: "GET" | "POST"; path: string; body?: unknown; note: string };

const SCENARIOS: Scenario[] = [
  { id: "briefing", label: "Gemini briefs a responder", method: "POST", path: "/api/v1/ai/briefing",
    body: { raw_text: "My elderly neighbour has not answered her door or phone since last night." },
    note: "Triage first, then Gemini writes a summary and three next actions using only the retrieved protocols, and names its source. grounded: true means the source checks out." },
  { id: "guidance", label: "Search protocols by meaning", method: "GET", path: "/api/v1/ai/guidance?query=my%20grandmother%20is%20not%20answering%20her%20phone",
    note: "BM25 keywords fused with Gemini embeddings in pgvector (cosine, HNSW). It finds the elder-care protocol with no shared keywords, and cites the passage." },
  { id: "insights", label: "Response times from SQL", method: "GET", path: "/api/v1/community/insights",
    note: "Median and 90th-percentile time-to-acknowledge, hotspots and SLA breaches, computed in PostgreSQL (Cloud SQL)." },
  { id: "health", label: "Live status: Cloud SQL + Gemini", method: "GET", path: "/health",
    note: "Database, pgvector version, Gemini model, embedding model and why anything is off." },
];

export function Explore({ live }: { live: LiveState }) {
  const [active, setActive] = useState<Scenario>(SCENARIOS[0]);
  const [output, setOutput] = useState<unknown>(recorded.results[SCENARIOS[0].id]);
  const [source, setSource] = useState<"recorded" | "live" | "fallback">("recorded");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = (s: Scenario) => { setActive(s); setOutput(recorded.results[s.id]); setSource("recorded"); setError(null); };

  // Always does something useful: the real backend if it answers within 12 s, otherwise the
  // recorded real run of the same call (clearly labelled), never just an error.
  const runLive = async () => {
    setLoading(true); setError(null);
    const fallback = (why: string) => {
      setOutput(recorded.results[active.id]); setSource("fallback");
      setError(`${why} Showing the recorded real run of this exact call instead.`);
    };
    try {
      const apiUrl = live.config?.apiUrl
        ?? (await fetch("/live.json", { cache: "no-store" }).then((r) => r.json()).catch(() => ({})))?.apiUrl;
      if (!apiUrl) { fallback("The live service address isn't available."); return; }
      const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000));
      const call = active.path === "/health"
        ? fetch(`${apiUrl}/health`).then((r) => r.json())
        : liveCall(apiUrl, active.path, active.method === "POST" ? { method: "POST", body: JSON.stringify(active.body) } : undefined);
      const data = await Promise.race([call, timeout]);
      if (!data || (typeof data === "object" && "detail" in (data as object) && Object.keys(data as object).length === 1)) {
        fallback("The live service returned an error.");
        return;
      }
      setOutput(data); setSource("live");
    } catch (e) {
      fallback((e as Error).message === "timeout" ? "The live service took longer than 12 s (it may be waking up)." : "The live service couldn't be reached from this network.");
    } finally { setLoading(false); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-2">
        {SCENARIOS.map((s) => (
          <button key={s.id} onClick={() => pick(s)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${active.id === s.id ? "border-brand/60 bg-brand-soft text-ink" : "border-line bg-surface text-ink-2 hover:border-line hover:text-ink"}`}>
            <span className="font-mono text-[11px] text-ink-3">{s.method}</span> {s.label}
          </button>
        ))}
        <p className="mt-2 text-xs leading-relaxed text-ink-3">{active.note}</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <code className="truncate font-mono text-xs text-ink-2">{active.method} {active.path}</code>
          <div className="flex items-center gap-2">
            {source === "live"
              ? <span className="inline-flex items-center gap-1.5 rounded-full bg-haven/15 px-2.5 py-1 font-mono text-[11px] text-haven"><Radio className="h-3 w-3" /> live response · just now</span>
              : <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"><Archive className="h-3 w-3" /> {source === "fallback" ? "fallback · " : ""}recorded real run {recorded.recorded_at}</span>}
            <button onClick={runLive} disabled={loading}
              title="Call the real backend now (falls back to the recorded real run if it doesn't answer)"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-brand-ink disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />} Run live
            </button>
          </div>
        </div>
        {error && <p className="px-4 pt-3 text-xs text-[#b06000] dark:text-g-yellow">{error}</p>}
        <motion.pre key={`${active.id}-${source}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="max-h-[440px] overflow-auto p-4 font-mono text-[12px] leading-relaxed text-ink-2">
          {JSON.stringify(output, null, 2)}
        </motion.pre>
        <p className="border-t border-line px-4 py-2 text-[11px] text-ink-3">
          Recorded from a real run of the NSIN API with the real Gemini API and PostgreSQL + pgvector. Nothing is mocked.
        </p>
      </div>
    </div>
  );
}
