'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_TOOLS = [
  { label: 'JSON',       href: '/tools/json-formatter' },
  { label: 'Base64',     href: '/tools/base64-encoder' },
  { label: 'JWT',        href: '/tools/jwt-decoder' },
  { label: 'Regex',      href: '/tools/regex-tester' },
  { label: 'UUID',       href: '/tools/uuid-generator' },
  { label: 'SQL',        href: '/tools/sql-formatter' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0f1e]/85 border-b border-white/5 shadow-lg backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 text-slate-50 font-bold text-base select-none">
            <span className="text-blue-500 font-mono">&lt;</span>
            <span>grepTools</span>
            <span className="text-blue-500 font-mono">/&gt;</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            {NAV_TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="hover:text-slate-200 transition-colors font-mono">
                {t.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-white border border-white/8 hover:border-blue-500/40 bg-white/3 hover:bg-blue-500/8 px-4 py-2 rounded-lg transition-all"
            >
              All 10 Tools ↓
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] left-0 right-0 z-40 bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/5 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-mono text-slate-300 hover:text-white transition-colors py-1"
                >
                  {t.label}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                <Link href="/about" onClick={() => setMobileOpen(false)} className="text-xs text-slate-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-xs text-slate-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
