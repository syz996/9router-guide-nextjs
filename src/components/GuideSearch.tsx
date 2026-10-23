"use client";

import { useMemo, useState } from "react";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/content";

export default function GuideSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => guides.filter((guide) => {
    const text = `${guide.title} ${guide.description} ${guide.category}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All" || guide.category === category);
  }), [query, category]);

  return (
    <>
      <div className="search-tools">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides, errors, clients…" aria-label="Search guides" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          {["All", "Getting started", "Integrations", "Troubleshooting", "Deployment"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {filtered.length ? <div className="guide-grid">{filtered.map((guide) => <GuideCard key={guide.href} guide={guide} />)}</div> : <div className="empty-state">No matching guide yet. Try a different term or check the official documentation.</div>}
    </>
  );
}
