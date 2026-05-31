import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(10, 14, 26, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--brand-blue)',
              letterSpacing: '-0.01em',
            }}
          >
            grep
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Tools
          </span>
        </Link>

        {/* Nav */}
        <nav aria-label="Site navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Link
            href="/tools/json-formatter"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
            }}
          >
            JSON
          </Link>
          <Link
            href="/tools/base64-encoder"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
            }}
          >
            Base64
          </Link>
          <Link
            href="/tools/url-encoder"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
            }}
          >
            URL
          </Link>
          <Link
            href="/tools/uuid-generator"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
            }}
          >
            UUID
          </Link>
        </nav>
      </div>
    </header>
  );
}
