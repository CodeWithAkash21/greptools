import type { Metadata } from 'next';
import JsonFormatter from '@/components/tools/JsonFormatter';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Free Online Tool',
  description: 'Format, beautify, and validate JSON instantly. Free browser-based JSON formatter with syntax highlighting, error detection, and minify support.',
  alternates: { canonical: 'https://greptools.dev/tools/json-formatter' },
  openGraph: {
    title: 'JSON Formatter & Validator — Free Online Tool | grepTools',
    description: 'Format, beautify, and validate JSON instantly in your browser. Syntax highlighting, error detection with line numbers, and minify support.',
    url: 'https://greptools.dev/tools/json-formatter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator | grepTools',
    description: 'Free browser-based JSON formatter with syntax highlighting and error detection.',
  },
  keywords: ['json formatter','json validator','json beautifier','json minifier','format json online','validate json'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a JSON formatter?', acceptedAnswer: { '@type': 'Answer', text: 'A JSON formatter takes raw or minified JSON and reformats it with indentation and line breaks, making it readable. It also validates the JSON syntax.' } },
    { '@type': 'Question', name: 'Is my data safe when I use this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' } },
    { '@type': 'Question', name: 'What does minify JSON mean?', acceptedAnswer: { '@type': 'Answer', text: 'Minifying removes whitespace and line breaks from JSON, collapsing it into a single line. This reduces payload size for production API responses.' } },
    { '@type': 'Question', name: 'How do I fix invalid JSON?', acceptedAnswer: { '@type': 'Answer', text: 'The formatter shows the exact line and character of the error. Common issues are missing quotes on keys, trailing commas, and single quotes instead of double quotes.' } },
    { '@type': 'Question', name: 'Can I use this JSON formatter for free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account, no limits. Just paste and format.' } },
  ],
};

export default function JsonFormatterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolShell
        toolName="json-formatter"
        toolIcon="{ }"
        heading="JSON Formatter & Validator"
        intro="Paste your JSON below to instantly format and validate it. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers."
        chips={[
          { icon: '⚡', text: 'Instant formatting' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '🎨', text: 'Syntax highlighting' },
          { icon: '📌', text: 'Error location' },
          { icon: '⌨️', text: 'Keyboard shortcuts' },
        ]}
        breadcrumbLabel="JSON Formatter"
        faqs={[
          { q: 'What is a JSON formatter?', a: 'A JSON formatter takes raw or minified JSON and reformats it with indentation and line breaks, making it readable. It also validates the JSON syntax.' },
          { q: 'Is my data safe when I use this tool?', a: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' },
          { q: 'What does minify JSON mean?', a: 'Minifying removes whitespace and line breaks from JSON, collapsing it into a single line. This reduces payload size for production API responses.' },
          { q: 'How do I fix invalid JSON?', a: 'The formatter shows the exact line and character of the error. Common issues are missing quotes on keys, trailing commas, and single quotes instead of double quotes.' },
          { q: 'Can I use this JSON formatter for free?', a: 'Yes, completely free. No account, no limits. Just paste and format.' },
        ]}
        relatedTools={[
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings instantly.', icon: '64' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URLs safely.', icon: '%' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs.', icon: '⊕' },
          { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter', description: 'Convert timestamps to readable dates.', icon: '⌚' },
        ]}
        aboutContent={
          <>
            <p>This JSON formatter uses your browser&apos;s native <code className="inline-code">JSON.parse</code> and <code className="inline-code">JSON.stringify</code> APIs for reliable parsing. Syntax highlighting is applied with a fast regex tokenizer — no third-party libraries.</p>
            <p>Use <strong>Format</strong> to pretty-print with 2-space indentation or <strong>Minify</strong> to collapse to a single line. Press <kbd className="inline-kbd">Ctrl+Enter</kbd> to format and <kbd className="inline-kbd">Ctrl+Shift+M</kbd> to minify.</p>
          </>
        }
      >
        <JsonFormatter />
      </ToolShell>
    </>
  );
}
