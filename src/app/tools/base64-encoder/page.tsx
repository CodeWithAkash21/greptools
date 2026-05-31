import type { Metadata } from 'next';
import Base64Tool from '@/components/tools/Base64Tool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'Base64 Encoder / Decoder — Free Online Tool',
  description: 'Encode and decode Base64 instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
  alternates: { canonical: 'https://greptools.dev/tools/base64-encoder' },
  openGraph: {
    title: 'Base64 Encoder / Decoder — Free Online Tool | grepTools',
    description: 'Encode and decode Base64 instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
    url: 'https://greptools.dev/tools/base64-encoder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder / Decoder | grepTools',
    description: 'Free browser-based Base64 encoder and decoder. Tool inputs are processed locally in your browser.',
  },
  keywords: ['base64 encoder','base64 decoder','encode base64','decode base64','base64 online','base64 converter'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Base64 encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 is a binary-to-text encoding scheme that represents binary data as ASCII characters. It\'s used to safely transmit binary content over text-only channels like email or URLs.' } },
    { '@type': 'Question', name: 'Is this Base64 tool private?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' } },
    { '@type': 'Question', name: 'What is Base64 used for?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 is commonly used for embedding images in HTML/CSS, encoding authentication credentials, transmitting binary data in JSON, and storing data in text-only formats.' } },
    { '@type': 'Question', name: 'Can I decode any Base64 string here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, as long as the string is valid Base64. The tool will show an error if the input is malformed or contains invalid characters.' } },
    { '@type': 'Question', name: 'Is this Base64 encoder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account required, no usage limits.' } },
  ],
};

export default function Base64Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolShell
        toolName="base64-encoder"
        toolIcon="64"
        heading="Base64 Encoder / Decoder"
        intro="Encode and decode Base64 instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers."
        chips={[
          { icon: '⚡', text: 'Instant results' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '🌐', text: 'UTF-8 safe' },
          { icon: '📋', text: 'One-click copy' },
        ]}
        breadcrumbLabel="Base64 Encoder"
        faqs={[
          { q: 'What is Base64 encoding?', a: "Base64 is a binary-to-text encoding scheme that represents binary data as ASCII characters. It's used to safely transmit binary content over text-only channels like email or URLs." },
          { q: 'Is this Base64 tool private?', a: 'Yes. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' },
          { q: 'What is Base64 used for?', a: 'Base64 is commonly used for embedding images in HTML/CSS, encoding authentication credentials, transmitting binary data in JSON, and storing data in text-only formats.' },
          { q: 'Can I decode any Base64 string here?', a: 'Yes, as long as the string is valid Base64. The tool will show an error if the input is malformed or contains invalid characters.' },
          { q: 'Is this Base64 encoder free?', a: 'Yes, completely free. No account required, no usage limits.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON with syntax highlighting.', icon: '{}' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URLs safely.', icon: '%' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs.', icon: '⊕' },
          { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter', description: 'Convert timestamps to readable dates.', icon: '⌚' },
        ]}
        aboutContent={
          <>
            <p>This Base64 encoder uses a UTF-8–safe algorithm, so it correctly handles special characters, emoji, and non-ASCII text. It uses browser-native <code className="inline-code">btoa</code> and <code className="inline-code">atob</code> functions with proper percent-encoding for full Unicode support.</p>
            <p>Paste any text to encode it into Base64, or paste a Base64 string to decode it back to plain text. The tool displays character and line counts for both input and output.</p>
          </>
        }
      >
        <Base64Tool />
      </ToolShell>
    </>
  );
}
