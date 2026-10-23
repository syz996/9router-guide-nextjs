import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how 9Router Guide handles information when you visit this independent tutorial website.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> / Privacy Policy</div>
        <div className="eyebrow">SITE POLICIES</div>
        <h1>Privacy Policy</h1>
        <p>This policy explains what information may be processed when you use 9Router Guide.</p>
        <div className="article-meta"><span>Effective date: October 23, 2026</span><span>Independent third-party resource</span></div>
      </div></section>
      <section className="container page-content"><article className="article">
        <div className="article-note">Before publishing, review this policy against your actual hosting, analytics, cookie, embedded-content, and contact-form setup. Update it whenever those practices change.</div>
        <h2>1. About this website</h2>
        <p>9Router Guide is an independent tutorial and troubleshooting resource. It is not affiliated with, endorsed by, or operated by the 9Router project.</p>
        <h2>2. Information processed when you visit</h2>
        <p>When you visit a website, the hosting or security provider may process technical information such as your IP address, browser and device details, requested URL, referring page, and request timestamps in service logs. Such information may be used to deliver the site, maintain security, prevent abuse, and diagnose errors. The exact fields and retention periods depend on the provider and your deployment settings.</p>
        <p>This starter project does not include user accounts, a payment flow, or a contact-submission form by default. It also does not intentionally request API keys or other credentials. If you add analytics, forms, advertising, embedded services, or other third-party scripts, revise this policy to describe them accurately.</p>
        <h2>3. Cookies and analytics</h2>
        <p>This project does not add a separate analytics product or advertising tracker by default. Hosting infrastructure or third-party features you later enable may use cookies or similar technologies. Check the live site and provider settings before making a final statement about cookies. Where consent is legally required for non-essential cookies or tracking, implement an appropriate consent mechanism as well as updating this policy.</p>
        <h2>4. How information may be used</h2>
        <p>Technical information may be used to provide and secure the website, identify outages or abusive traffic, and understand operational errors. We do not ask visitors to submit secrets, API keys, access tokens, private configuration files, or unredacted diagnostic logs.</p>
        <h2>5. Third-party services and external links</h2>
        <p>This website may link to the official 9Router website, documentation, source repositories, and other external sites. Those sites operate under their own privacy practices. If you enable a hosting, analytics, form, or embedded-content provider, that provider may process information under its own terms and privacy policy.</p>
        <h2>6. Retention and security</h2>
        <p>Retention of hosting and security logs is determined in part by the service provider and account configuration. Reasonable technical measures should be used to protect information, but no website or transmission method can be guaranteed completely secure.</p>
        <h2>7. Your choices and privacy rights</h2>
        <p>Depending on where you live and which laws apply, you may have rights to request access to, correction of, or deletion of personal information, or to object to or restrict certain processing. You may also control cookies through your browser settings. A browser setting may not affect all forms of server-side logging.</p>
        <h2>8. Children</h2>
        <p>This site is intended for people seeking technical documentation and is not designed to solicit personal information from children.</p>
        <h2>9. Changes to this policy</h2>
        <p>We may update this policy when the website or its data practices change. The effective date at the top of this page should be updated when a material revision is published.</p>
        <h2>10. Contact</h2>
        <p>For privacy questions, use the website's published contact channel once one has been configured. Before launch, add a monitored email address or another reliable contact method here. Do not publish this page with a placeholder contact method if users need a way to exercise applicable rights.</p>
      </article></section>
    </>
  );
}
