"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Client = "cli" | "cursor" | "other";
type Symptom = "refused" | "unauthorized" | "model" | "rate" | "unknown";

const advice: Record<Symptom, { title: string; checks: string[]; next: string }> = {
  refused: {
    title: "The local service may not be listening",
    checks: ["Confirm 9Router is running and check its startup output.", "Check the configured port; the example below uses 20128.", "If the port is occupied, identify the process before stopping anything."],
    next: "Run the health check below. If it still fails, review the official installation guide and startup logs."
  },
  unauthorized: {
    title: "Check the API key and authorization header",
    checks: ["Use the API key configured for your 9Router instance.", "Make sure the header is exactly `Authorization: Bearer YOUR_KEY`.", "Never paste a real key into a public issue or screenshot."],
    next: "Retry the `/v1/models` request with a freshly verified key. A 401 response usually points to authentication, but confirm against your installed version."
  },
  model: {
    title: "The model ID may not match an available model",
    checks: ["List models from the same endpoint you are calling.", "Copy the model ID exactly, including any provider prefix.", "Check that the selected provider is enabled and its credentials are valid."],
    next: "Use an ID returned by your own `/v1/models` response, then retry a minimal request."
  },
  rate: {
    title: "Check provider limits and upstream response",
    checks: ["Inspect the provider's quota and billing status.", "Check whether the provider is temporarily unavailable.", "Avoid repeatedly retrying a request that is returning rate-limit errors."],
    next: "Retry after the provider's stated reset window, or test another configured provider/model."
  },
  unknown: {
    title: "Start with a minimal reproducible request",
    checks: ["Record the HTTP status and a redacted error message.", "Verify the base URL and endpoint path.", "Test one available model with a short prompt before debugging the client integration."],
    next: "Use the smallest failing request to isolate whether the issue is service, authentication, model selection, provider, or client configuration."
  }
};

export default function Troubleshooter() {
  const [client, setClient] = useState<Client>("cli");
  const [symptom, setSymptom] = useState<Symptom>("refused");
  const result = useMemo(() => advice[symptom], [symptom]);

  return (
    <div className="diagnostic">
      <div className="diagnostic-top"><span className="eyebrow">INTERACTIVE DIAGNOSTIC</span><span className="step-pill">Identify the symptom</span></div>
      <div className="diagnostic-field">
        <label htmlFor="client">Which client are you using?</label>
        <select id="client" value={client} onChange={(e) => setClient(e.target.value as Client)}>
          <option value="cli">CLI tool (Claude Code / similar)</option>
          <option value="cursor">Cursor</option>
          <option value="other">Another client</option>
        </select>
        {client === "cursor" && <p className="notice"><strong>Important:</strong> Cursor may require a reachable cloud or public endpoint rather than a local-only address. Confirm the current official Cursor instructions before using localhost.</p>}
      </div>
      <div className="diagnostic-field">
        <label htmlFor="symptom">What do you see?</label>
        <select id="symptom" value={symptom} onChange={(e) => setSymptom(e.target.value as Symptom)}>
          <option value="refused">Connection refused / cannot connect</option>
          <option value="unauthorized">401 / Unauthorized</option>
          <option value="model">Model not found / 404</option>
          <option value="rate">429 / rate limit / provider error</option>
          <option value="unknown">Other or unclear error</option>
        </select>
      </div>
      <div className="diagnostic-result">
        <div className="result-label"><span className="result-dot" /> YOUR NEXT CHECK</div>
        <h3>{result.title}</h3>
        <ol>{result.checks.map((item) => <li key={item}>{item}</li>)}</ol>
        <p>{result.next}</p>
        <Link className="text-link" href="/troubleshooting/9router-connection-failed-windows/">Open the full Windows troubleshooting guide →</Link>
      </div>
      <p className="fine-print">This is a decision aid, not a diagnostic connection to your computer. Steps can differ by 9Router version and client.</p>
    </div>
  );
}
