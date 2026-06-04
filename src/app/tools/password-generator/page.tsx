import type { Metadata } from 'next';
import PasswordGeneratorTool from '@/components/tools/PasswordGeneratorTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'Password Generator — Free Secure Password Generator Online | grepTools',
  description: 'Generate strong, random passwords instantly. Customize length, symbols, numbers, and uppercase. Free browser-based tool — passwords never leave your device.',
  alternates: { canonical: 'https://greptools.dev/tools/password-generator' },
  keywords: ['password generator', 'secure password generator', 'strong password generator', 'random password generator', 'online password generator'],
  openGraph: {
    title: 'Password Generator — Free Secure Password Generator Online | grepTools',
    description: 'Generate cryptographically random passwords with custom length and character sets. Runs entirely in your browser.',
    url: 'https://greptools.dev/tools/password-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator | grepTools',
    description: 'Free browser-based secure password generator. Customize length, symbols, and strength.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does this password generator work?', acceptedAnswer: { '@type': 'Answer', text: 'This tool uses the Web Crypto API (crypto.getRandomValues) to generate cryptographically secure random bytes, which are then mapped to your chosen character set. No passwords are sent to any server.' } },
    { '@type': 'Question', name: 'Are the generated passwords safe?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool uses crypto.getRandomValues, which is a cryptographically secure pseudorandom number generator (CSPRNG) built into modern browsers. This is the same API used by password managers.' } },
    { '@type': 'Question', name: 'How long should my password be?', acceptedAnswer: { '@type': 'Answer', text: 'Security experts recommend a minimum of 12 characters, ideally 16 or more for sensitive accounts. Longer passwords with mixed character sets are exponentially harder to crack.' } },
    { '@type': 'Question', name: 'Are my generated passwords stored anywhere?', acceptedAnswer: { '@type': 'Answer', text: 'No. Password generation runs entirely in your browser using JavaScript. Passwords are never transmitted to or stored on our servers.' } },
    { '@type': 'Question', name: 'What makes a strong password?', acceptedAnswer: { '@type': 'Answer', text: 'A strong password is long (16+ chars), uses a mix of uppercase, lowercase, numbers, and symbols, does not contain dictionary words, and is unique to each account.' } },
    { '@type': 'Question', name: 'Should I use a password manager?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use this tool to generate unique passwords, then store them in a password manager like Bitwarden, 1Password, or Dashlane. Never reuse passwords across sites.' } },
    { '@type': 'Question', name: 'What is the strength meter based on?', acceptedAnswer: { '@type': 'Answer', text: 'The strength meter evaluates length (8+, 12+, 16+ characters) and character variety (uppercase, lowercase, numbers, symbols). It is a heuristic indicator, not a cryptographic measurement.' } },
    { '@type': 'Question', name: 'Can I generate multiple passwords at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — use the Count slider to generate up to 10 passwords at once with the same settings. Copy individual passwords or copy all at once.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Password Generator',
  url: 'https://greptools.dev/tools/password-generator',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate cryptographically secure random passwords in your browser with customizable length and character sets.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greptools.dev' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://greptools.dev/tools' },
    { '@type': 'ListItem', position: 3, name: 'Password Generator', item: 'https://greptools.dev/tools/password-generator' },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolShell
        toolName="password-generator"
        toolIcon="🔐"
        heading="Password Generator"
        intro="Generate cryptographically strong, random passwords instantly. Adjust length, character sets, and quantity. All generation runs in your browser — passwords never leave your device."
        chips={[
          { icon: '🔒', text: 'Cryptographically secure' },
          { icon: '🖥️', text: 'Never sent to servers' },
          { icon: '⚡', text: 'Instant generation' },
          { icon: '🎛️', text: 'Fully customizable' },
          { icon: '🆓', text: 'Free forever' },
        ]}
        breadcrumbLabel="Password Generator"
        faqs={[
          { q: 'How does this password generator work?', a: 'It uses the Web Crypto API (crypto.getRandomValues) — a CSPRNG built into modern browsers. No passwords are sent to any server.' },
          { q: 'Are the generated passwords safe?', a: 'Yes. crypto.getRandomValues is cryptographically secure, the same API used by password managers.' },
          { q: 'How long should my password be?', a: 'Minimum 12 characters, ideally 16+ for sensitive accounts. Longer passwords with mixed characters are exponentially harder to crack.' },
          { q: 'Are passwords stored anywhere?', a: 'No. Generation runs entirely in your browser. Nothing is transmitted to or stored on our servers.' },
          { q: 'What makes a strong password?', a: 'Long (16+ chars), uses uppercase, lowercase, numbers, and symbols, contains no dictionary words, and is unique per account.' },
          { q: 'Should I use a password manager?', a: 'Yes — generate unique passwords here, then store them in Bitwarden, 1Password, or similar. Never reuse passwords across sites.' },
          { q: 'What is the strength meter based on?', a: 'It evaluates length thresholds (8, 12, 16 chars) and character variety. It is a heuristic indicator for quick guidance.' },
          { q: 'Can I generate multiple passwords at once?', a: 'Yes — use the Count slider to generate up to 10 passwords with one click.' },
        ]}
        relatedTools={[
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs for tokens and IDs.', icon: '⊕' },
          { name: 'JWT Decoder', href: '/tools/jwt-decoder', description: 'Decode and inspect JWT authentication tokens.', icon: 'JWT' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings.', icon: '64' },
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON data.', icon: '{ }' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URL strings.', icon: '%' },
        ]}
        aboutContent={
          <>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Why Use a Cryptographically Secure Password Generator?</h2>
            <p>Human-created passwords are predictable. People default to dictionary words, names, and simple number substitutions that attackers exploit through dictionary attacks and pattern matching. A true random password generator eliminates this bias entirely.</p>
            <p>This tool uses <code className="inline-code">crypto.getRandomValues()</code> — the Web Crypto API available in all modern browsers. It generates cryptographically secure random bytes, identical in security model to what dedicated password managers use internally.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Password Length vs. Complexity</h3>
            <p>Length is the most important factor in password security. A 20-character lowercase-only password has more entropy than a 10-character password with symbols. For most accounts, 16+ character mixed-case passwords provide excellent security. For root server access or encryption keys, use 32+ characters.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Privacy Guarantee</h3>
            <p>No network request is made during password generation. Open your browser DevTools → Network tab to verify: zero requests are sent. Your passwords exist only in your browser memory until you copy them.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Best Practices</h3>
            <p>Always use a unique password per account. Store generated passwords in a reputable password manager (Bitwarden is open-source and free). Enable two-factor authentication (2FA) wherever available — a strong password with 2FA is far more secure than a password alone.</p>

            <p>Related tools: <a href="/tools/uuid-generator" style={{ color: 'var(--brand-blue)' }}>UUID Generator</a> · <a href="/tools/jwt-decoder" style={{ color: 'var(--brand-blue)' }}>JWT Decoder</a></p>
          </>
        }
      >
        <PasswordGeneratorTool />
      </ToolShell>
    </>
  );
}
