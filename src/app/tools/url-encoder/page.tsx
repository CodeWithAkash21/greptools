import type { Metadata } from 'next';
import UrlEncoderTool from '@/components/tools/UrlEncoderTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder — Free Online Tool',
  description: 'Encode and decode URLs instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
  alternates: { canonical: 'https://greptools.dev/tools/url-encoder' },
  openGraph: {
    title: 'URL Encoder / Decoder — Free Online Tool | grepTools',
    description: 'Encode and decode URLs instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
    url: 'https://greptools.dev/tools/url-encoder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder / Decoder | grepTools',
    description: 'Free browser-based URL encoder and decoder. Tool inputs are processed locally in your browser.',
  },
  keywords: ['url encoder','url decoder','percent encoding','encode url online','decode url','urlencode','urldecode'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does URL encoding do?', acceptedAnswer: { '@type': 'Answer', text: 'URL encoding (percent-encoding) converts special characters into a % followed by two hex digits so they can be safely included in a URL. For example, a space becomes %20.' } },
    { '@type': 'Question', name: 'When should I encode a URL?', acceptedAnswer: { '@type': 'Answer', text: 'Encode URLs whenever you include user input, special characters, or non-ASCII text in query parameters, form data, or path segments. This prevents injection and parsing errors.' } },
    { '@type': 'Question', name: 'Is URL decoding safe here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' } },
    { '@type': 'Question', name: 'Why do special characters need encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Characters like &, =, ?, #, and spaces have special meaning in URLs. Encoding them ensures they are treated as data rather than URL structure.' } },
    { '@type': 'Question', name: 'Is this URL encoder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No sign-up, no limits.' } },
  ],
};

export default function UrlEncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolShell
        toolName="url-encoder"
        toolIcon="%"
        heading="URL Encoder / Decoder"
        intro="Encode and decode URLs instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers."
        chips={[
          { icon: '⚡', text: 'Instant results' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '🔗', text: 'percent-encoding' },
          { icon: '📋', text: 'One-click copy' },
        ]}
        breadcrumbLabel="URL Encoder"
        faqs={[
          { q: 'What does URL encoding do?', a: 'URL encoding (percent-encoding) converts special characters into a % followed by two hex digits so they can be safely included in a URL. For example, a space becomes %20.' },
          { q: 'When should I encode a URL?', a: 'Encode URLs whenever you include user input, special characters, or non-ASCII text in query parameters, form data, or path segments. This prevents injection and parsing errors.' },
          { q: 'Is URL decoding safe here?', a: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' },
          { q: 'Why do special characters need encoding?', a: 'Characters like &, =, ?, #, and spaces have special meaning in URLs. Encoding them ensures they are treated as data rather than URL structure.' },
          { q: 'Is this URL encoder free?', a: 'Yes, completely free. No sign-up, no limits.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON with syntax highlighting.', icon: '{}' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings instantly.', icon: '64' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs.', icon: '⊕' },
          { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter', description: 'Convert timestamps to readable dates.', icon: '⌚' },
        ]}
        aboutContent={
          <>
            <p>This URL encoder uses <code className="inline-code">encodeURIComponent</code> and <code className="inline-code">decodeURIComponent</code> — the standard browser APIs for percent-encoding. It correctly handles all reserved characters including spaces, ampersands, equals signs, and Unicode.</p>
            <p>Paste any URL, query string, or text segment. Click <strong>Encode</strong> to percent-encode special characters, or <strong>Decode</strong> to convert percent sequences back to readable text.</p>
          </>
        }
      >
        <UrlEncoderTool />
      </ToolShell>
    </>
  );
}
