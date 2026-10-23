import Link from "next/link";
import type { Guide } from "@/lib/content";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={guide.href} className="guide-card">
      <div className="card-meta"><span>{guide.category}</span><span>{guide.minutes} min read</span></div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="card-bottom"><span className="level">{guide.level}</span><span className="arrow">↗</span></div>
    </Link>
  );
}
