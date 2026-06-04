'use client';

import Link from 'next/link';

const TOOLS = [
  { label: 'JSON Formatter',           href: '/tools/json-formatter' },
  { label: 'Base64 Encoder',           href: '/tools/base64-encoder' },
  { label: 'URL Encoder',              href: '/tools/url-encoder' },
  { label: 'UUID Generator',           href: '/tools/uuid-generator' },
  { label: 'Unix Timestamp Converter', href: '/tools/unix-timestamp-converter' },
  { label: 'JWT Decoder',              href: '/tools/jwt-decoder' },
  { label: 'Password Generator',       href: '/tools/password-generator' },
  { label: 'Regex Tester',             href: '/tools/regex-tester' },
  { label: 'YAML to JSON Converter',   href: '/tools/yaml-json-converter' },
  { label: 'SQL Formatter',            href: '/tools/sql-formatter' },
];

const LEGAL = [
  { label: 'About',          href: '/about' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy',  href: '/cookies' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#070a14]/70 border-t border-white/4 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-1 text-slate-50 font-bold text-sm mb-3 select-none w-fit">
              <span className="text-blue-500 font-mono">&lt;</span>
              <span>grepTools</span>
              <span className="text-blue-500 font-mono">/&gt;</span>
            </Link>
            <p className="text-[11px] text-slate-500 font-mono leading-relaxed max-w-xs">
              Fast, privacy-conscious browser-based developer utilities.{' '}
              No signup. No servers. No data transmitted.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>10 tools live · Client-side sandbox</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Tools</div>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Company</div>
            <ul className="space-y-2">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[10px] text-slate-600 font-mono">
            © {new Date().getFullYear()} grepTools.dev — All rights reserved.
          </div>
          <div className="text-[10px] text-slate-600 font-mono">
            Tool inputs are processed locally · Not intentionally transmitted to servers
          </div>
        </div>
      </div>
    </footer>
  );
}
