import type { Metadata } from 'next';
import YamlJsonConverterTool from '@/components/tools/YamlJsonConverterTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter — Free Online YAML Parser | grepTools',
  description: 'Convert YAML to JSON and JSON to YAML instantly. Free browser-based YAML converter with validation and formatted output. No signup required.',
  alternates: { canonical: 'https://greptools.dev/tools/yaml-json-converter' },
  keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'yaml parser', 'yaml json online', 'convert yaml online'],
  openGraph: {
    title: 'YAML to JSON Converter — Free Online YAML Parser | grepTools',
    description: 'Bidirectional YAML ↔ JSON converter with validation. Paste and convert instantly in your browser.',
    url: 'https://greptools.dev/tools/yaml-json-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YAML to JSON Converter | grepTools',
    description: 'Free browser-based YAML ↔ JSON converter with validation.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between YAML and JSON?', acceptedAnswer: { '@type': 'Answer', text: 'YAML (YAML Ain\'t Markup Language) is a human-friendly data serialization format using indentation and minimal punctuation. JSON (JavaScript Object Notation) uses braces, brackets, and commas and is more explicit and machine-friendly. YAML is a superset of JSON.' } },
    { '@type': 'Question', name: 'Is my YAML or JSON data safe when I use this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Conversion runs entirely in your browser using JavaScript. Your data is not sent to any server and is not stored anywhere.' } },
    { '@type': 'Question', name: 'Why does YAML to JSON conversion fail?', acceptedAnswer: { '@type': 'Answer', text: 'Common issues: inconsistent indentation (YAML requires consistent spaces, not tabs), missing colons after keys, special characters that need quoting, or multi-document YAML (---) which requires special handling.' } },
    { '@type': 'Question', name: 'Can I convert JSON to YAML?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — use the JSON → YAML mode. Valid JSON is always valid YAML, and this tool serializes JSON objects into human-readable YAML format with proper indentation.' } },
    { '@type': 'Question', name: 'Does YAML support comments?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — YAML supports comments using #. JSON does not support comments. Comments are stripped during YAML-to-JSON conversion.' } },
    { '@type': 'Question', name: 'Why does YAML use indentation?', acceptedAnswer: { '@type': 'Answer', text: 'YAML uses indentation (spaces only, not tabs) to define structure — similar to Python. This makes it more readable for humans but requires careful formatting.' } },
    { '@type': 'Question', name: 'What are common YAML use cases?', acceptedAnswer: { '@type': 'Answer', text: 'YAML is used for configuration files (Docker Compose, Kubernetes manifests, GitHub Actions, Ansible playbooks, Helm charts), CI/CD pipelines, and application configuration. JSON is used for APIs, data interchange, and package files.' } },
    { '@type': 'Question', name: 'Is this YAML converter free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free. No account, no usage limits, no data collection.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YAML to JSON Converter',
  url: 'https://greptools.dev/tools/yaml-json-converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Bidirectional YAML ↔ JSON converter with validation. Runs entirely in the browser.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greptools.dev' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://greptools.dev/tools' },
    { '@type': 'ListItem', position: 3, name: 'YAML to JSON Converter', item: 'https://greptools.dev/tools/yaml-json-converter' },
  ],
};

export default function YamlJsonConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolShell
        toolName="yaml-json-converter"
        toolIcon="YML"
        heading="YAML to JSON Converter"
        intro="Convert YAML to JSON or JSON to YAML instantly. Paste your input and get validated, formatted output in real time. Useful for Kubernetes manifests, Docker Compose files, CI/CD pipelines, and API configs. Runs entirely in your browser."
        chips={[
          { icon: '⚡', text: 'Instant conversion' },
          { icon: '↔️', text: 'Bidirectional' },
          { icon: '✅', text: 'Validates output' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '🆓', text: 'Free forever' },
        ]}
        breadcrumbLabel="YAML to JSON Converter"
        faqs={[
          { q: 'What is the difference between YAML and JSON?', a: 'YAML uses indentation and minimal punctuation — more human-friendly. JSON uses explicit braces/brackets — more machine-friendly. YAML is a superset of JSON.' },
          { q: 'Is my data safe when I use this tool?', a: 'Yes — conversion runs entirely in your browser. No data is sent to any server.' },
          { q: 'Why does YAML to JSON conversion fail?', a: 'Common issues: inconsistent indentation, tabs instead of spaces, missing colons, or special characters that need quoting.' },
          { q: 'Can I convert JSON to YAML?', a: 'Yes — use the JSON → YAML mode. Valid JSON is always valid YAML and this tool formats it with proper indentation.' },
          { q: 'Does YAML support comments?', a: 'Yes — YAML comments use #. JSON does not support comments. Comments are stripped during conversion.' },
          { q: 'Why does YAML use indentation?', a: 'YAML uses spaces (not tabs) to define structure — similar to Python. This makes it readable but requires careful formatting.' },
          { q: 'What are common YAML use cases?', a: 'Kubernetes manifests, Docker Compose, GitHub Actions, Ansible playbooks, Helm charts, and app configs.' },
          { q: 'Is this YAML converter free?', a: 'Yes — completely free. No account, no limits.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON with syntax highlighting.', icon: '{ }' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings.', icon: '64' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URL strings.', icon: '%' },
          { name: 'UUID Generator', href: '/tools/uuid-generator', description: 'Generate cryptographically random UUIDs.', icon: '⊕' },
          { name: 'SQL Formatter', href: '/tools/sql-formatter', description: 'Format and beautify SQL queries.', icon: 'SQL' },
        ]}
        aboutContent={
          <>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>YAML vs JSON: When to Use Each</h2>
            <p>YAML and JSON serve overlapping purposes — both represent hierarchical data — but have different strengths. YAML excels at human-maintained configuration files: Kubernetes manifests, Docker Compose, GitHub Actions, Ansible playbooks. Its indentation-based structure and support for comments make it easier to read and edit by hand.</p>
            <p>JSON excels at API responses, data interchange, and machine-generated data. Its strict syntax (no comments, explicit quotes) makes it unambiguous and easier to parse. JavaScript environments natively support JSON via <code className="inline-code">JSON.parse</code> and <code className="inline-code">JSON.stringify</code>.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Common YAML Mistakes</h3>
            <p><strong>Tabs vs spaces:</strong> YAML requires spaces for indentation — tabs cause parse errors. <strong>Unquoted special characters:</strong> Values containing <code className="inline-code">{': # & * ! | > \' " % @ `'}</code> should be quoted. <strong>Inconsistent indentation:</strong> All sibling keys must be at the same indent level. <strong>Booleans:</strong> YAML treats <code className="inline-code">yes</code>, <code className="inline-code">no</code>, <code className="inline-code">on</code>, <code className="inline-code">off</code> as booleans — quote them if you mean strings.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Kubernetes and DevOps Use Cases</h3>
            <p>DevOps engineers frequently convert between YAML and JSON when working with Kubernetes (<code className="inline-code">kubectl</code> accepts both), Terraform, and Helm. This tool is useful for validating manifests before applying them, converting JSON API responses into readable YAML config, and debugging Helm chart values.</p>

            <p>Related tools: <a href="/tools/json-formatter" style={{ color: 'var(--brand-blue)' }}>JSON Formatter</a> · <a href="/tools/sql-formatter" style={{ color: 'var(--brand-blue)' }}>SQL Formatter</a></p>
          </>
        }
      >
        <YamlJsonConverterTool />
      </ToolShell>
    </>
  );
}
