import type { Metadata } from 'next';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode JWT Tokens Online Free | grepTools',
  description: 'Decode and inspect JWT tokens instantly. View header, payload, expiry, and signature in your browser. Free, private, no signup required.',
  alternates: { canonical: 'https://greptools.dev/tools/jwt-decoder' },
  keywords: ['jwt decoder', 'decode jwt token', 'jwt inspector', 'jwt parser', 'jwt payload decoder', 'json web token'],
  openGraph: {
    title: 'JWT Decoder — Decode JWT Tokens Online Free | grepTools',
    description: 'Paste a JWT and instantly decode the header, payload, and inspect expiry. 100% browser-based.',
    url: 'https://greptools.dev/tools/jwt-decoder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder | grepTools',
    description: 'Free browser-based JWT decoder. View header, payload, expiry, and issued-at instantly.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a JWT?', acceptedAnswer: { '@type': 'Answer', text: 'A JSON Web Token (JWT) is a compact, URL-safe token format used to securely transmit information between parties as a JSON object. It consists of three Base64URL-encoded parts: a header, a payload, and a signature.' } },
    { '@type': 'Question', name: 'Is it safe to paste my JWT into this decoder?', acceptedAnswer: { '@type': 'Answer', text: 'Decoding happens entirely in your browser using JavaScript — your token is not sent to any server. However, treat production JWTs with sensitive payloads carefully. Avoid pasting real tokens from production systems into any online tool if possible.' } },
    { '@type': 'Question', name: 'What is the JWT payload?', acceptedAnswer: { '@type': 'Answer', text: 'The payload is the second part of a JWT. It contains claims — statements about the user or entity. Common claims include sub (subject), iss (issuer), exp (expiry), iat (issued at), and aud (audience).' } },
    { '@type': 'Question', name: 'Why does the tool show "Expired"?', acceptedAnswer: { '@type': 'Answer', text: 'If the JWT payload contains an exp claim and the current time is past that timestamp, the token is considered expired. An expired token is no longer valid for authentication.' } },
    { '@type': 'Question', name: 'Can this tool validate a JWT signature?', acceptedAnswer: { '@type': 'Answer', text: 'No. Signature validation requires the secret key or RSA public key used to sign the token. This tool only decodes the header and payload — it does not verify authenticity.' } },
    { '@type': 'Question', name: 'What are the three parts of a JWT?', acceptedAnswer: { '@type': 'Answer', text: 'A JWT has three Base64URL-encoded segments separated by dots: 1) Header — algorithm and token type, 2) Payload — the claims data, 3) Signature — a hash of header+payload signed with a secret or key.' } },
    { '@type': 'Question', name: 'What is the difference between JWS and JWE?', acceptedAnswer: { '@type': 'Answer', text: 'JWS (JSON Web Signature) is a signed token — the payload is readable but tamper-protected. JWE (JSON Web Encryption) encrypts the payload so it cannot be read without the private key. This tool decodes JWS tokens only.' } },
    { '@type': 'Question', name: 'Is this JWT decoder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account, no API key, no rate limits. Just paste and decode.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JWT Decoder',
  url: 'https://greptools.dev/tools/jwt-decoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Decode JWT tokens and inspect header, payload, expiry and signature in your browser.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greptools.dev' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://greptools.dev/tools' },
    { '@type': 'ListItem', position: 3, name: 'JWT Decoder', item: 'https://greptools.dev/tools/jwt-decoder' },
  ],
};

export default function JwtDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolShell
        toolName="jwt-decoder"
        toolIcon="JWT"
        heading="JWT Decoder"
        intro="Paste any JWT token below to instantly decode its header, payload, and signature. Inspect expiry times, issued-at dates, and all claims. Runs entirely in your browser — your token is never sent to a server."
        chips={[
          { icon: '🔒', text: 'Local processing' },
          { icon: '⚡', text: 'Instant decode' },
          { icon: '📋', text: 'Header + Payload' },
          { icon: '⏱️', text: 'Expiry detection' },
          { icon: '🆓', text: 'Free forever' },
        ]}
        breadcrumbLabel="JWT Decoder"
        faqs={[
          { q: 'What is a JWT?', a: 'A JSON Web Token (JWT) is a compact, URL-safe token format used to securely transmit information between parties as a JSON object. It has three Base64URL-encoded parts: header, payload, and signature.' },
          { q: 'Is it safe to paste my JWT here?', a: 'Decoding runs entirely in your browser — your token is not sent to any server. That said, avoid pasting production tokens with sensitive payloads into any online tool if possible.' },
          { q: 'What is the JWT payload?', a: 'The payload contains claims — statements about the user or entity. Common claims include sub (subject), iss (issuer), exp (expiry), iat (issued at), and aud (audience).' },
          { q: 'Why does it show "Expired"?', a: 'If the payload contains an exp claim and the current time is past that Unix timestamp, the token is expired and will be rejected by authentication servers.' },
          { q: 'Can this validate the JWT signature?', a: 'No — signature validation requires the secret key. This tool only decodes the header and payload for inspection.' },
          { q: 'What are the three JWT parts?', a: '1) Header — algorithm and token type. 2) Payload — claims data. 3) Signature — a hash of header+payload signed with a secret or key pair.' },
          { q: 'What is the difference between JWS and JWE?', a: 'JWS (JSON Web Signature) is signed and readable. JWE (JSON Web Encryption) encrypts the payload. This tool decodes JWS tokens.' },
          { q: 'Is this JWT decoder free?', a: 'Yes — completely free. No account, no API key, no rate limits.' },
        ]}
        relatedTools={[
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings. JWTs use Base64URL encoding internally.', icon: '64' },
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate the JSON inside JWT claims.', icon: '{ }' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URL strings.', icon: '%' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs for token IDs.', icon: '⊕' },
          { name: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter', description: 'Convert JWT exp and iat Unix timestamps to readable dates.', icon: '⌚' },
        ]}
        aboutContent={
          <>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>What Is a JWT and How Does This Decoder Work?</h2>
            <p>JWT (JSON Web Token) is an open standard (RFC 7519) for representing claims securely between two parties. Tokens are split into three Base64URL-encoded segments: <code className="inline-code">header.payload.signature</code>.</p>
            <p>This decoder splits the token on the <code className="inline-code">.</code> delimiter, applies <code className="inline-code">atob()</code> with URL-safe character mapping (<code className="inline-code">-</code> → <code className="inline-code">+</code>, <code className="inline-code">_</code> → <code className="inline-code">/</code>), then parses the resulting JSON. No server requests are made.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Common JWT Claims</h3>
            <p>The most frequently seen standard claims are: <strong>sub</strong> (subject — who the token is about), <strong>iss</strong> (issuer — who created it), <strong>exp</strong> (expiry Unix timestamp), <strong>iat</strong> (issued-at timestamp), <strong>aud</strong> (audience), and <strong>jti</strong> (JWT ID for uniqueness).</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Security Considerations</h3>
            <p>Remember: JWTs are encoded, not encrypted. Anyone who obtains a JWS token can decode its payload. Never store sensitive data (passwords, PII) in JWT payloads unless using JWE encryption. Always validate the signature on the server before trusting claims.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Example Use Cases</h3>
            <p>Use this tool to: debug authentication issues in APIs, inspect claims from third-party OAuth/OIDC providers, verify expiry times, or understand the token structure returned by services like Auth0, Firebase, Clerk, or Supabase.</p>

            <p>Related tools: <a href="/tools/base64-encoder" style={{ color: 'var(--brand-blue)' }}>Base64 Encoder</a> · <a href="/tools/json-formatter" style={{ color: 'var(--brand-blue)' }}>JSON Formatter</a> · <a href="/tools/unix-timestamp-converter" style={{ color: 'var(--brand-blue)' }}>Unix Timestamp Converter</a></p>
          </>
        }
      >
        <JwtDecoderTool />
      </ToolShell>
    </>
  );
}
