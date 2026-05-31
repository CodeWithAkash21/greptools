'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#070a14]/65 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center gap-1 text-slate-50 font-bold text-sm mb-2 select-none">
            <span className="text-blue-500 font-mono">&lt;</span>
            <span>grepTools</span>
            <span className="text-blue-500 font-mono">/&gt;</span>
          </Link>
          <p className="text-[10px] text-slate-500 font-mono">
            Fast, secure client-side computing utilities.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-medium text-slate-450">
            <Link href="/tools/json-formatter" className="hover:text-slate-200 transition-colors">JSON Formatter</Link>
            <Link href="/tools/base64-encoder" className="hover:text-slate-200 transition-colors">Base64 Encoder</Link>
            <Link href="/tools/url-encoder" className="hover:text-slate-200 transition-colors">URL Encoder</Link>
            <Link href="/tools/uuid-generator" className="hover:text-slate-200 transition-colors">UUID Generator</Link>
            <Link href="/tools/unix-timestamp-converter" className="hover:text-slate-200 transition-colors">Timestamp Converter</Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 text-[10px] text-slate-500 font-mono">
            <Link href="/about" className="hover:text-slate-350 transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-350 transition-colors">Contact Us</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-350 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-350 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-slate-350 transition-colors">Cookie Policy</Link>
          </div>
        </div>

        {/* GitHub Star & Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1.5">
          <div className="text-[10px] text-slate-500 font-mono">
            © {new Date().getFullYear()} grepTools.dev. All rights reserved.
          </div>
          <div className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 rounded-full px-2 py-0.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sandboxed Client Environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
