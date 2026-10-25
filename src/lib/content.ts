export type Guide = {
  title: string;
  description: string;
  href: string;
  category: string;
  level: "Beginner" | "Intermediate";
  minutes: number;
};

export const guides: Guide[] = [
  {
    title: "Install 9Router on Windows",
    description: "Check prerequisites, start the local service, and confirm the dashboard is reachable.",
    href: "/guides/install-9router-windows/",
    category: "Getting started",
    level: "Beginner",
    minutes: 7
  },
  {
    title: "Connect 9Router to Cursor",
    description: "Fill in the base URL, paste your key, pick a model ID.",
    href: "/integrations/cursor/",
    category: "Integrations",
    level: "Beginner",
    minutes: 6
  },
  {
    title: "Use 9Router with Claude Code",
    description: "A setup checklist for environment variables, model IDs, and a minimal request test.",
    href: "/integrations/claude-code/",
    category: "Integrations",
    level: "Intermediate",
    minutes: 8
  },
  {
    title: "Fix connection failures on Windows",
    description: "Follow a diagnostic flow for refused connections, auth errors, missing models, and provider failures.",
    href: "/troubleshooting/9router-connection-failed-windows/",
    category: "Troubleshooting",
    level: "Beginner",
    minutes: 10
  },
  {
    title: "Run 9Router with Docker",
    description: "A preparation checklist for reviewing the current official deployment instructions.",
    href: "/guides/9router-docker/",
    category: "Deployment",
    level: "Intermediate",
    minutes: 9
  }
];

export const categories = [
  { title: "Getting started", description: "Install, launch, and verify your first request.", icon: "01", href: "/guides/" },
  { title: "Integrations", description: "Configure coding tools and compatible clients.", icon: "02", href: "/integrations/" },
  { title: "Troubleshooting", description: "Diagnose common connection and API errors.", icon: "03", href: "/troubleshooting/" }
];
