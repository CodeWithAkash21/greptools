import type { Metadata } from 'next';
import SqlFormatterTool from '@/components/tools/SqlFormatterTool';
import ToolShell from '@/components/tools/ToolShell';

export const metadata: Metadata = {
  title: 'SQL Formatter — Free Online SQL Beautifier | grepTools',
  description: 'Format and beautify SQL queries instantly. Uppercase keywords, proper indentation, and clean output. Free browser-based SQL formatter — no signup needed.',
  alternates: { canonical: 'https://greptools.dev/tools/sql-formatter' },
  keywords: ['sql formatter', 'sql beautifier', 'format sql query', 'sql formatter online', 'sql pretty print', 'sql indenter'],
  openGraph: {
    title: 'SQL Formatter — Free Online SQL Beautifier | grepTools',
    description: 'Paste any SQL query and instantly get clean, indented, properly-formatted SQL with uppercase keywords.',
    url: 'https://greptools.dev/tools/sql-formatter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Formatter | grepTools',
    description: 'Free online SQL formatter with keyword uppercasing and proper indentation.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a SQL formatter?', acceptedAnswer: { '@type': 'Answer', text: 'A SQL formatter (or SQL beautifier) reformats raw or minified SQL queries with consistent indentation, line breaks, and keyword capitalization. It makes queries easier to read, review, and debug.' } },
    { '@type': 'Question', name: 'Does this SQL formatter work for all SQL dialects?', acceptedAnswer: { '@type': 'Answer', text: 'This formatter handles standard SQL constructs that work across most dialects including MySQL, PostgreSQL, SQLite, Microsoft SQL Server, and Oracle. Dialect-specific functions and syntax may be treated as identifiers.' } },
    { '@type': 'Question', name: 'Should SQL keywords be uppercase?', acceptedAnswer: { '@type': 'Answer', text: 'Most SQL style guides (Google, GitLab, Kickstarter) recommend uppercase keywords (SELECT, FROM, WHERE) for readability. This makes keywords visually distinct from table names, column names, and aliases.' } },
    { '@type': 'Question', name: 'Is my SQL query sent to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Formatting runs entirely in your browser using JavaScript. Your SQL is never transmitted to any server and is not stored anywhere.' } },
    { '@type': 'Question', name: 'How do I format a stored procedure or function?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the entire stored procedure including CREATE PROCEDURE / CREATE FUNCTION and the body. The formatter handles nested BEGIN...END blocks and most standard procedural SQL constructs.' } },
    { '@type': 'Question', name: 'What is SQL indentation best practice?', acceptedAnswer: { '@type': 'Answer', text: 'Use consistent 2 or 4 space indentation. Align SELECT columns under each other. Put each major clause (FROM, WHERE, JOIN, ORDER BY) on its own line. This makes complex queries much easier to follow.' } },
    { '@type': 'Question', name: 'Can I format multiple SQL statements at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — paste multiple statements separated by semicolons. The formatter handles each statement and inserts line breaks between them.' } },
    { '@type': 'Question', name: 'Is the SQL formatter free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free. No account required, no usage limits, no data collection.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SQL Formatter',
  url: 'https://greptools.dev/tools/sql-formatter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Format and beautify SQL queries with proper indentation and uppercase keywords.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greptools.dev' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://greptools.dev/tools' },
    { '@type': 'ListItem', position: 3, name: 'SQL Formatter', item: 'https://greptools.dev/tools/sql-formatter' },
  ],
};

export default function SqlFormatterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolShell
        toolName="sql-formatter"
        toolIcon="SQL"
        heading="SQL Formatter"
        intro="Paste any SQL query to instantly format and beautify it with proper indentation, uppercase keywords, and clean line breaks. Works with SELECT, INSERT, UPDATE, DELETE, CREATE, and complex JOINs. Runs in your browser — your queries are never sent to a server."
        chips={[
          { icon: '⚡', text: 'Instant formatting' },
          { icon: '🔠', text: 'Uppercase keywords' },
          { icon: '📐', text: 'Proper indentation' },
          { icon: '🔒', text: 'Local processing' },
          { icon: '⌨️', text: 'Keyboard shortcuts' },
        ]}
        breadcrumbLabel="SQL Formatter"
        faqs={[
          { q: 'What is a SQL formatter?', a: 'A SQL formatter reformats raw or minified SQL with consistent indentation, line breaks, and keyword capitalization for better readability.' },
          { q: 'Does this work for all SQL dialects?', a: 'Handles standard SQL constructs across MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. Dialect-specific functions are treated as identifiers.' },
          { q: 'Should SQL keywords be uppercase?', a: 'Most SQL style guides recommend uppercase keywords (SELECT, FROM, WHERE) to visually distinguish them from identifiers.' },
          { q: 'Is my SQL sent to a server?', a: 'No — formatting runs entirely in your browser. Your SQL is never transmitted or stored.' },
          { q: 'How do I format a stored procedure?', a: 'Paste the entire CREATE PROCEDURE / FUNCTION body. The formatter handles nested BEGIN...END blocks.' },
          { q: 'What is SQL indentation best practice?', a: 'Consistent 2-4 space indentation, each major clause on its own line (FROM, WHERE, JOIN, ORDER BY), aligned SELECT columns.' },
          { q: 'Can I format multiple statements at once?', a: 'Yes — separate statements with semicolons and paste them together.' },
          { q: 'Is the SQL formatter free?', a: 'Yes — completely free. No account, no usage limits.' },
        ]}
        relatedTools={[
          { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format and validate JSON data with syntax highlighting.', icon: '{ }' },
          { name: 'YAML to JSON Converter', href: '/tools/yaml-json-converter', description: 'Convert between YAML and JSON instantly.', icon: 'YML' },
          { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder', description: 'Encode and decode Base64 strings.', icon: '64' },
          { name: 'URL Encoder/Decoder', href: '/tools/url-encoder', description: 'Percent-encode and decode URL strings.', icon: '%' },
          { name: 'Regex Tester', href: '/tools/regex-tester', description: 'Test regular expressions with live highlighting.', icon: '/./' },
        ]}
        aboutContent={
          <>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Why SQL Formatting Matters</h2>
            <p>Unformatted SQL queries are notoriously difficult to read, debug, and maintain. A single-line query with joins, subqueries, and conditions becomes impenetrable within seconds. Consistent SQL formatting is a professional best practice that saves hours of debugging time across teams.</p>
            <p>This formatter uses a custom tokenizer that handles string literals, quoted identifiers, and inline comments correctly — ensuring keywords inside strings are not uppercased and your data values are preserved exactly as written.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>SQL Formatting Best Practices</h3>
            <p><strong>Keywords uppercase:</strong> <code className="inline-code">SELECT</code>, <code className="inline-code">FROM</code>, <code className="inline-code">WHERE</code>, <code className="inline-code">JOIN</code> in uppercase makes them instantly identifiable. <strong>One clause per line:</strong> Each major clause starts on a new line. <strong>Alias alignment:</strong> Use <code className="inline-code">AS</code> explicitly for clarity. <strong>Subquery indentation:</strong> Indent subqueries by one level. <strong>Comment your CTEs:</strong> Complex Common Table Expressions deserve explanatory comments.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>SQL in Code Reviews</h3>
            <p>Formatted SQL is critical for pull request reviews. ORMs often log raw, minified queries. Copy the logged query, format it here, and immediately understand what the ORM generated. Use this tool before pasting SQL into Jira tickets, Slack messages, or Stack Overflow questions to communicate clearly with teammates.</p>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Performance and Privacy</h3>
            <p>Formatting runs using a zero-dependency JavaScript tokenizer in your browser. No SQL query data is sent to any server. The tokenizer correctly handles single-quoted strings, double-quoted identifiers, backtick identifiers (MySQL), and block comments (<code className="inline-code">{'/* ... */'}</code>).</p>

            <p>Related tools: <a href="/tools/json-formatter" style={{ color: 'var(--brand-blue)' }}>JSON Formatter</a> · <a href="/tools/yaml-json-converter" style={{ color: 'var(--brand-blue)' }}>YAML to JSON</a> · <a href="/tools/regex-tester" style={{ color: 'var(--brand-blue)' }}>Regex Tester</a></p>
          </>
        }
      >
        <SqlFormatterTool />
      </ToolShell>
    </>
  );
}
