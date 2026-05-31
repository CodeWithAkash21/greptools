import type { Metadata } from 'next';
import UnixTimestampTool from '@/components/tools/UnixTimestampTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Free Online Tool',
  description: 'Convert between Unix timestamps and human-readable dates instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
  alternates: { canonical: 'https://greptools.dev/tools/unix-timestamp-converter' },
  openGraph: {
    title: 'Unix Timestamp Converter — Free Online Tool | grepTools',
    description: 'Convert between Unix timestamps and human-readable dates instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
    url: 'https://greptools.dev/tools/unix-timestamp-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter | grepTools',
    description: 'Free browser-based Unix timestamp converter. Tool inputs are processed locally in your browser.',
  },
  keywords: ['unix timestamp','timestamp converter','epoch time','unix time','convert timestamp','epoch converter','seconds to date'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Unix timestamp?', acceptedAnswer: { '@type': 'Answer', text: 'A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It is a standard way to represent moments in time across systems.' } },
    { '@type': 'Question', name: 'Is this converter accurate?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The converter uses your browser\'s native Date API for precise conversions. The live clock updates every second using your device\'s system clock.' } },
    { '@type': 'Question', name: 'What is the difference between seconds and milliseconds?', acceptedAnswer: { '@type': 'Answer', text: 'Most Unix timestamps are in seconds (10 digits), but many modern systems like JavaScript use milliseconds (13 digits). Toggle between modes using the Seconds / Milliseconds switch.' } },
    { '@type': 'Question', name: 'Can I convert a date to Unix time?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the "Date → Timestamp" panel. Enter any date in ISO 8601 format (e.g. 2024-06-15T12:00:00Z) and click Convert to get the Unix timestamp.' } },
    { '@type': 'Question', name: 'Is this tool free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account required, no usage limits.' } },
  ],
};

export default function UnixTimestampPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolShell
        toolName="unix-timestamp"
        toolIcon="⌚"
        heading="Unix Timestamp Converter"
        intro="Convert between Unix timestamps and human-readable dates instantly in your browser. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers."
        chips={[
          { icon: '⚡', text: 'Live clock' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '🔄', text: 'Bi-directional' },
          { icon: '⏱️', text: 'Seconds & ms' },
        ]}
        breadcrumbLabel="Unix Timestamp Converter"
        faqs={[
          { q: 'What is a Unix timestamp?', a: 'A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It is a standard way to represent moments in time across systems.' },
          { q: 'Is this converter accurate?', a: "Yes. The converter uses your browser's native Date API for precise conversions. The live clock updates every second using your device's system clock." },
          { q: 'What is the difference between seconds and milliseconds?', a: 'Most Unix timestamps are in seconds (10 digits), but many modern systems like JavaScript use milliseconds (13 digits). Toggle between modes using the Seconds / Milliseconds switch.' },
          { q: 'Can I convert a date to Unix time?', a: 'Yes. Use the "Date → Timestamp" panel. Enter any date in ISO 8601 format (e.g. 2024-06-15T12:00:00Z) and click Convert to get the Unix timestamp.' },
          { q: 'Is this tool free?', a: 'Yes, completely free. No account required, no usage limits.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON with syntax highlighting.', icon: '{}' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings instantly.', icon: '64' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URLs safely.', icon: '%' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs.', icon: '⊕' },
        ]}
        aboutContent={
          <>
            <p>This converter uses JavaScript&apos;s <code className="inline-code">Date</code> API for accurate conversions. The live clock at the top shows the current Unix timestamp in your chosen unit, updating every second.</p>
            <p>Accepts any ISO 8601 date string for date-to-timestamp conversion. Results are displayed in UTC. Use <kbd className="inline-kbd">Enter</kbd> to submit without clicking the Convert button.</p>
          </>
        }
      >
        <UnixTimestampTool />
      </ToolShell>
    </>
  );
}
