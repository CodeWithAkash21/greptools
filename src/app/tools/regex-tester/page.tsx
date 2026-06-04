import type { Metadata } from 'next';
import RegexTesterTool from '@/components/tools/RegexTesterTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'Regex Tester — Test Regular Expressions Online Free | grepTools',
  description: 'Test and debug regular expressions instantly with live match highlighting, match count, and group capture. Free online regex playground — no signup.',
  alternates: { canonical: 'https://greptools.dev/tools/regex-tester' },
  keywords: ['regex tester', 'regex validator', 'regex checker', 'regex playground', 'regular expression tester', 'test regex online'],
  openGraph: {
    title: 'Regex Tester — Test Regular Expressions Online Free | grepTools',
    description: 'Paste your regex and test string. See live match highlights, match count, and per-match details instantly.',
    url: 'https://greptools.dev/tools/regex-tester',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester | grepTools',
    description: 'Free online regex tester with live highlighting and match details.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a regular expression?', acceptedAnswer: { '@type': 'Answer', text: 'A regular expression (regex) is a sequence of characters that defines a search pattern. It is used for string matching, validation, and text extraction in programming languages and tools.' } },
    { '@type': 'Question', name: 'What regex flags are supported?', acceptedAnswer: { '@type': 'Answer', text: 'This tool supports standard JavaScript regex flags: g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), s (dotAll — dot matches newlines), and u (Unicode mode).' } },
    { '@type': 'Question', name: 'Why does my regex not match anything?', acceptedAnswer: { '@type': 'Answer', text: 'Common issues: missing the g flag for multiple matches, unescaped special characters (use \\ to escape . ( ) * + ? [ ] { } | ^ $), case sensitivity without the i flag, or incorrect anchors (^ and $ behavior differs with/without the m flag).' } },
    { '@type': 'Question', name: 'How do I match a literal dot in regex?', acceptedAnswer: { '@type': 'Answer', text: 'Escape it with a backslash: \\. A plain dot . matches any character except newline. To match a literal period, use \\.' } },
    { '@type': 'Question', name: 'What does the g flag do?', acceptedAnswer: { '@type': 'Answer', text: 'The g (global) flag makes the regex find all matches in the string instead of stopping at the first match. Without g, only the first match is returned.' } },
    { '@type': 'Question', name: 'Can I use named capture groups?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Named groups use the syntax (?<name>pattern). For example: (?<year>\\d{4})-(?<month>\\d{2}) will capture year and month as named groups in the match details.' } },
    { '@type': 'Question', name: 'Is this regex tester free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account, no rate limits, no data collection.' } },
    { '@type': 'Question', name: 'Which regex engine does this use?', acceptedAnswer: { '@type': 'Answer', text: 'This tool uses the JavaScript (V8) regex engine via the built-in RegExp object. Patterns that work here will work in Node.js, browsers, and JavaScript/TypeScript applications.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Regex Tester',
  url: 'https://greptools.dev/tools/regex-tester',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Test regular expressions online with live match highlighting and match details.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greptools.dev' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://greptools.dev/tools' },
    { '@type': 'ListItem', position: 3, name: 'Regex Tester', item: 'https://greptools.dev/tools/regex-tester' },
  ],
};

export default function RegexTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolShell
        toolName="regex-tester"
        toolIcon="/.*/"
        heading="Regex Tester"
        intro="Enter a regular expression and test it against any string with instant live highlighting. See every match, its position, and captured groups. Uses the JavaScript regex engine — patterns work directly in Node.js, browsers, and TypeScript."
        chips={[
          { icon: '⚡', text: 'Live highlighting' },
          { icon: '🔢', text: 'Match count' },
          { icon: '📍', text: 'Match positions' },
          { icon: '🎯', text: 'Named groups' },
          { icon: '🔒', text: 'Local processing' },
        ]}
        breadcrumbLabel="Regex Tester"
        faqs={[
          { q: 'What is a regular expression?', a: 'A regex is a sequence of characters that defines a search pattern, used for string matching, validation, and text extraction.' },
          { q: 'What regex flags are supported?', a: 'g (global), i (case-insensitive), m (multiline), s (dotAll — dot matches newlines), u (Unicode mode).' },
          { q: 'Why does my regex not match anything?', a: 'Common issues: missing g flag, unescaped special characters, case sensitivity without i, or incorrect anchors.' },
          { q: 'How do I match a literal dot?', a: 'Escape it: \\. — a plain dot matches any character except newline.' },
          { q: 'What does the g flag do?', a: 'Global flag finds all matches instead of stopping at the first one.' },
          { q: 'Can I use named capture groups?', a: 'Yes: (?<name>pattern). Named groups appear in the match details.' },
          { q: 'Is this regex tester free?', a: 'Yes — completely free, no account, no rate limits.' },
          { q: 'Which regex engine does this use?', a: 'JavaScript (V8) via the built-in RegExp object. Patterns work in Node.js and browsers.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON data.', icon: '{ }' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode URLs and query strings.', icon: '%' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings.', icon: '64' },
          { name: 'JWT Decoder', href: '/tools/jwt-decoder', description: 'Decode and inspect JWT tokens.', icon: 'JWT' },
          { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter', description: 'Convert Unix timestamps to readable dates.', icon: '⌚' },
        ]}
        aboutContent={
          <>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Understanding Regular Expressions</h2>
            <p>Regular expressions (regex) are a fundamental tool in every developer&apos;s toolkit. They enable powerful string matching, validation, extraction, and transformation with a compact syntax. From validating email addresses to parsing log files, regex appears in virtually every codebase.</p>
            <p>This tester uses JavaScript&apos;s native <code className="inline-code">RegExp</code> object — the same engine in Node.js and all modern browsers. Patterns you test here work directly in your JavaScript, TypeScript, or Node.js code.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Common Regex Patterns</h3>
            <p><code className="inline-code">\d</code> — digit (0–9). <code className="inline-code">\w</code> — word character (a–z, A–Z, 0–9, _). <code className="inline-code">\s</code> — whitespace. <code className="inline-code">+</code> — one or more. <code className="inline-code">*</code> — zero or more. <code className="inline-code">?</code> — zero or one. <code className="inline-code">{'{'}</code>n,m<code className="inline-code">{'}'}</code> — between n and m repetitions. <code className="inline-code">^</code> — start of string (or line with m flag). <code className="inline-code">$</code> — end of string (or line with m flag).</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Performance Pitfalls</h3>
            <p>Catastrophic backtracking occurs when a regex has nested quantifiers (e.g., <code className="inline-code">{'(a+)+'}</code>) applied to a long non-matching string. This causes exponential processing time. Use atomic groups or possessive quantifiers to avoid this in production regex. Always test with large inputs before deploying.</p>

            <p>Related tools: <a href="/tools/json-formatter" style={{ color: 'var(--brand-blue)' }}>JSON Formatter</a> · <a href="/tools/url-encoder" style={{ color: 'var(--brand-blue)' }}>URL Encoder</a></p>
          </>
        }
      >
        <RegexTesterTool />
      </ToolShell>
    </>
  );
}
