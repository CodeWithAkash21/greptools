'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'JSON',      href: '/tools/json-formatter' },
  { label: 'Base64',    href: '/tools/base64-encoder' },
  { label: 'URL',       href: '/tools/url-encoder' },
  { label: 'UUID',      href: '/tools/uuid-generator' },
  { label: 'Timestamp', href: '/tools/unix-timestamp-converter' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="grepTools home">
          <span className="site-logo-grep">grep</span>
          <span className="site-logo-tools">Tools</span>
        </Link>

        <nav aria-label="Site navigation" className="site-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link${pathname === item.href ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
