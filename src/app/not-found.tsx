import Link from "next/link";

export default function NotFound() {
  return <section className="container not-found"><div className="eyebrow">404 / NOT FOUND</div><h1>This route went missing.</h1><p>Head back to the guide index or choose a troubleshooting path.</p><div className="button-row" style={{justifyContent:"center"}}><Link className="button-primary" href="/">Go home</Link><Link className="button-secondary" href="/guides/">Browse guides</Link></div></section>;
}
