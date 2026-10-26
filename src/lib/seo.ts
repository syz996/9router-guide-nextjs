import { site } from "@/lib/site";

type Crumb = { name: string; path: string };

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: Crumb[];
  datePublished: string;
  dateModified?: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${site.url}${crumb.path}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.title,
      description: opts.description,
      url: `${site.url}${opts.path}`,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified ?? site.lastModified,
      inLanguage: "en",
      mainEntityOfPage: `${site.url}${opts.path}`,
      author: { "@type": "Organization", name: site.name },
      publisher: { "@type": "Organization", name: site.name },
    },
  ];
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}