import { useEffect, useState } from "react";

export type LiveConfig = { apiUrl: string; appUrl: string };
export type LiveState = { status: "checking" | "live" | "offline"; config?: LiveConfig; model?: string };

/** Reads /live.json (written by the deploy script with the Cloud Run URL) and pings the real backend. */
export function useLive(): LiveState {
  const [state, setState] = useState<LiveState>({ status: "checking" });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cfg: LiveConfig = await fetch("/live.json", { cache: "no-store" }).then((r) => r.json());
        if (!cfg.apiUrl) throw new Error("no live url");
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        const health = await fetch(`${cfg.apiUrl}/health`, { signal: ctrl.signal }).then((r) => r.json());
        clearTimeout(timer);
        if (!cancelled) setState({ status: health?.database?.connected ? "live" : "offline", config: cfg, model: health?.ai_features?.gemini?.model });
      } catch {
        if (!cancelled) setState({ status: "offline" });
      }
    })();
    return () => { cancelled = true; };
  }, []);
  return state;
}

export async function liveCall(apiUrl: string, path: string, init?: RequestInit) {
  const login = await fetch(`${apiUrl}/api/v1/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "resident@neighbourhood.org", password: "Password123!" }),
  }).then((r) => r.json());
  const res = await fetch(`${apiUrl}${path}`, {
    ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${login.access_token}`, ...(init?.headers || {}) },
  });
  return res.json();
}
