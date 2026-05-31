'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0f1e]/80 border-b border-white/5 shadow-lg backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-slate-50 font-bold text-lg select-none">
          <span className="text-blue-500 font-mono">&lt;</span>
          <span>grepTools</span>
          <span className="text-blue-500 font-mono">/&gt;</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/tools/json-formatter" className="hover:text-slate-200 transition-colors">
            JSON
          </Link>
          <Link href="/tools/base64-encoder" className="hover:text-slate-200 transition-colors">
            Base64
          </Link>
          <Link href="/tools/url-encoder" className="hover:text-slate-200 transition-colors">
            URL
          </Link>
          <Link href="/tools/uuid-generator" className="hover:text-slate-200 transition-colors">
            UUID
          </Link>
          <Link href="/tools/unix-timestamp-converter" className="hover:text-slate-200 transition-colors">
            Timestamp
          </Link>
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#tools"
            className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white border border-white/5 hover:border-blue-500/50 bg-white/4 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all"
          >
            Launch Suite
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
