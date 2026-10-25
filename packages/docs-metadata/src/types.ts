export type DocsLink = {
  title: string;
  path: string;
  description?: string;
};

export type DocsSection = {
  heading: string;
  links: DocsLink[];
};

export type LlmsTxtInput = {
  siteName: string;
  summary: string;
  baseUrl: string;
  intro?: string[];
  sections: DocsSection[];
};
