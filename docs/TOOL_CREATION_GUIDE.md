# Tool Creation Playbook

This playbook walks you through building, testing, and integrating a new browser-based utility into the grepTools platform. Follow these instructions to maintain UI uniformity, SEO strength, and execution performance.

---

## 1. File Allocation Strategy

When adding a new tool (e.g., `jwt-debugger`), you must create two core files:

1.  **Routing Entry File**: `src/app/tools/jwt-debugger/page.tsx`
    *   Defines static metadata, OpenGraph tags, sitemaps, JSON-LD FAQ schemas, and custom introductions.
    *   Loads the tool component inside the shared `ToolShell`.
2.  **Implementation Component File**: `src/components/tools/JwtDebuggerTool.tsx`
    *   Handles state tracking, data processing, input textareas, regex formatting, and user action events.

---

## 2. Step 1: Create the Routing Page

Use the template below to build the App Router page. Ensure that you replace page attributes with descriptive content:

```tsx
// src/app/tools/jwt-debugger/page.tsx
import type { Metadata } from 'next';
import ToolShell from '@/components/tools/ToolShell';
import JwtDebuggerTool from '@/components/tools/JwtDebuggerTool';

export const metadata: Metadata = {
  title: 'JSON Web Token (JWT) Debugger — Decode Online',
  description: 'Decode and validate JSON Web Tokens (JWT) instantly in your browser. Inspect header, payload, and signature data locally without sending tokens to servers.',
  alternates: { canonical: 'https://greptools.dev/tools/jwt-debugger' },
  openGraph: {
    title: 'JWT Debugger & Decoder — Free Developer Tool | grepTools',
    description: 'Decode and inspect JWT payloads locally in your browser. Complete data privacy.',
    url: 'https://greptools.dev/tools/jwt-debugger',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Debugger & Decoder | grepTools',
    description: 'Decode and inspect JWT payloads locally in your browser.',
  },
  keywords: ['jwt debugger', 'decode jwt', 'jwt parser', 'inspect jwt', 'json web token decoder'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to paste my production JWT token here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The JWT tool runs locally in your browser. The secret, header, and payload data are parsed client-side and are not transmitted to any servers.',
      },
    },
  ],
};

export default function JwtDebuggerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ToolShell
        toolName="jwt-debugger"
        toolIcon="[id]"
        heading="JWT Debugger & Decoder"
        intro="Paste a token below to decode its header, payload, and signature instantly. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers."
        chips={[
          { icon: '⚡', text: 'Instant parsing' },
          { icon: '🔒', text: 'Local decoding' },
          { icon: '🎨', text: 'Color-coded sections' },
        ]}
        breadcrumbLabel="JWT Debugger"
        faqs={[
          { q: 'Is it safe to paste my production JWT token here?', a: 'Yes. The JWT tool runs locally in your browser. The secret, header, and payload data are parsed client-side and are not transmitted to any servers.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON payloads.', icon: '{ }' },
          { name: 'Base64 Encoder', href: '/tools/base64-encoder', description: 'Convert text to/from Base64.', icon: '64' },
        ]}
        aboutContent={
          <>
            <p>This debugger splits JWTs by the period separator, decodes Base64Url segments, and formats the header and payload blocks.</p>
          </>
        }
      >
        <JwtDebuggerTool />
      </ToolShell>
    </>
  );
}
```

---

## 3. Step 2: Build the Core Logic Component

Use our standard dual-pane code block layout to build the logic component:

```tsx
// src/components/tools/JwtDebuggerTool.tsx
'use client';

import { useState, useCallback } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

export default function JwtDebuggerTool() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processToken = useCallback((token: string) => {
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      setError(null);
      return;
    }
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT structure. JWT tokens must contain exactly 3 dot-separated parts.');
      setHeader('');
      setPayload('');
      return;
    }
    try {
      // Helper function decoding base64url content
      const decode = (str: string) => {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        return decodeURIComponent(
          atob(b64)
            .split('')
            .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('')
        );
      };
      
      const parsedHeader = JSON.parse(decode(parts[0]));
      const parsedPayload = JSON.parse(decode(parts[1]));
      
      setHeader(JSON.stringify(parsedHeader, null, 2));
      setPayload(JSON.stringify(parsedPayload, null, 2));
      setError(null);
    } catch {
      setError('Failed to parse token segments. Ensure the input string is a valid base64url-encoded JSON Web Token.');
      setHeader('');
      setPayload('');
    }
  }, []);

  const handleInputChange = (val: string) => {
    setInput(val);
    processToken(val);
  };

  const handleClear = () => {
    setInput('');
    setHeader('');
    setPayload('');
    setError(null);
  };

  return (
    <div>
      <div className="action-bar">
        <CopyButton getValue={() => payload} label="Copy Payload" />
        <button onClick={handleClear} disabled={!input} className="btn btn-ghost">
          Clear
        </button>
      </div>

      {error && <ErrorBanner message="Parse Error" detail={error} />}

      <div className="editor-panels">
        <EditorPanel
          panelId="jwt-input-pane"
          label="Encoded Token Input"
          lang="JWT"
          stats={getTextStats(input)}
        >
          <textarea
            id="jwt-input"
            className="panel-textarea"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your JWT token here…"
            spellCheck={false}
          />
        </EditorPanel>

        <EditorPanel
          panelId="jwt-output-pane"
          label="Decoded Payload"
          lang="JSON"
          badgeOk={!!payload}
          badge={payload ? 'decoded' : undefined}
          stats={getTextStats(payload)}
        >
          {payload ? (
            <pre className="panel-pre">{payload}</pre>
          ) : (
            <div className="panel-empty">
              <p className="panel-empty-text">Decoded segments will display here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
```

---

## 4. Quality Control & Accessibility Guidelines

### Accessibility (a11y) Rules
*   **Aria Labels**: All textareas and inputs must specify an `aria-label` or link to a labeling element via `htmlFor`.
*   **Contrast & Focus**: Interactive buttons and text areas must feature clear focus styles (`focus-visible`).
*   **Readable Keys**: Any list or generated sequence elements must include unique standard key identifiers (e.g. `key={item.id}`).

### Code Validation Checklist
*   [ ] Run TypeScript compilation checks inside the terminal (`npx tsc --noEmit`).
*   [ ] Verify responsive styling on screens down to `320px` width.
*   [ ] Run the Next.js static link validator command: `npm run lint`.
*   [ ] Run build checks locally before pushing files to git: `npm run build`.
