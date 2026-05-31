# Search Engine Optimization (SEO) Playbook

To ensure that grepTools maintains search visibility and indexes quickly on Google, we implement structured SEO configurations for every utility route. This document explains our meta tagging systems, internal linking layouts, JSON-LD setups, and index request workflows.

---

## 1. Metadata Schema Configurations

Each page must define static or dynamic `Metadata` objects. The metadata is parsed at build time and injected into the HTML document header:

*   **Canonical URLs**: Every page page must specify a canonical URL configuration. This tells search engine crawlers which URL is the master version, preventing duplicate content penalties:
    ```typescript
    alternates: { canonical: 'https://greptools.dev/tools/uuid-generator' }
    ```
*   **OpenGraph (OG) & Twitter Cards**: Enable rich previews when pages are shared on social platforms (Slack, X/Twitter, Discord).
    ```typescript
    openGraph: {
      title: 'UUID Generator — Free Developer Tool',
      description: 'Generate secure v4 UUIDs locally in your browser.',
      url: 'https://greptools.dev/tools/uuid-generator',
      type: 'website',
    }
    ```
*   **Robots Directive**: Ensure legal policy pages (like privacy, cookies, and terms) do not dilute search ranking scores by setting indexing limits:
    ```typescript
    robots: { index: false, follow: true }
    ```

---

## 2. Structured JSON-LD FAQ Schema

Search engines render rich snippets directly on search result pages when FAQ schemas are detected. For every tool, define a JSON-LD FAQ schema.

### Standard FAQ Schema Structure
Declare the FAQ structure in the page routing file and render it inside a script tag:

```tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the data formatted by this tool secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All data processing occurs locally in your browser. Inputs are never sent to any servers.',
      },
    },
  ],
};

// Inside page function
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <ToolShell ...>
      <MyToolComponent />
    </ToolShell>
  </>
);
```

---

## 3. Crawler Indexing & Navigation Systems

To facilitate crawling, grepTools automates sitemap generations and enforces internal link relationships:

*   **Dynamic Sitemap**: Next.js automatically compiles `src/app/sitemap.ts` at build-time to output a static `/sitemap.xml` file.
*   **Peer Internal Link Grid**: The `RelatedTools` widget links every utility to four other pages in the suite. This forms a mesh of internal links, allowing crawler engines to easily crawl and discover all utility pages.
*   **Index Verification**:
    ```text
    /robots.txt (Directs crawlers to the sitemap)
    └─ /sitemap.xml (Lists all indexable pages)
        └─ /tools/json-formatter (Contains canonical, meta tags, and FAQPage JSON-LD)
    ```

---

## 4. Search Console & Indexing Workflows

When deploying update cycles or introducing new developer tools, follow this indexing workflow:

1.  **Generate Sitemap Verification**: Ensure your new tool URL is registered inside `src/app/sitemap.ts`. Run `npm run build` and check that the path appears in `/sitemap.xml`.
2.  **Submit to Google Search Console**:
    *   Navigate to the [Google Search Console Dashboard](https://search.google.com/search-console).
    *   Paste the new tool's URL (e.g. `https://greptools.dev/tools/uuid-generator`) into the search bar at the top of the dashboard.
    *   Click **Request Indexing**. This places the URL in Google's indexing queue.
3.  **Inspect Live URL**: If the page is not indexing, use the **Test Live URL** tool in Search Console to identify canonical mismatches, responsive rendering issues, or indexing blocks.
