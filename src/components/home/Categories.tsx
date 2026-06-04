'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FileJson, Binary, Link as LinkIcon, Fingerprint, Clock,
  Shield, Lock, Regex, FileCode2, Database, ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all',        name: 'All Tools' },
  { id: 'formatter',  name: 'Formatters' },
  { id: 'encoder',    name: 'Encoders' },
  { id: 'generator',  name: 'Generators' },
  { id: 'converter',  name: 'Converters' },
  { id: 'security',   name: 'Security' },
  { id: 'validator',  name: 'Validators' },
];

const ITEMS = [
  { name: 'JSON Formatter & Validator', category: 'formatter',  icon: FileJson,    href: '/tools/json-formatter',           desc: 'Prettify, validate, and minify JSON with live lint feedback.' },
  { name: 'Base64 Encoder / Decoder',   category: 'encoder',    icon: Binary,      href: '/tools/base64-encoder',           desc: 'Encode and decode Base64 with full UTF-8 support.' },
  { name: 'URL Encoder / Decoder',       category: 'encoder',    icon: LinkIcon,    href: '/tools/url-encoder',              desc: 'Percent-encode query params and decode URLs.' },
  { name: 'UUID Generator v4',           category: 'generator',  icon: Fingerprint, href: '/tools/uuid-generator',           desc: 'Cryptographically secure UUID v4 via Web Crypto API.' },
  { name: 'Unix Timestamp Converter',    category: 'converter',  icon: Clock,       href: '/tools/unix-timestamp-converter', desc: 'Convert epoch timestamps to human-readable dates.' },
  { name: 'JWT Decoder',                 category: 'security',   icon: Shield,      href: '/tools/jwt-decoder',              desc: 'Decode JWT header, payload, and check expiry.' },
  { name: 'Password Generator',          category: 'generator',  icon: Lock,        href: '/tools/password-generator',       desc: 'Generate strong random passwords with custom rules.' },
  { name: 'Regex Tester',                category: 'validator',  icon: Regex,       href: '/tools/regex-tester',             desc: 'Test regex patterns with live match highlighting.' },
  { name: 'YAML to JSON Converter',      category: 'converter',  icon: FileCode2,   href: '/tools/yaml-json-converter',      desc: 'Bidirectional YAML ↔ JSON conversion with validation.' },
  { name: 'SQL Formatter',               category: 'formatter',  icon: Database,    href: '/tools/sql-formatter',            desc: 'Beautify SQL with proper indentation and uppercase keywords.' },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? ITEMS
    : ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="relative py-24 px-6 z-10 bg-transparent" id="categories" aria-labelledby="categories-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 id="categories-title" className="text-3xl font-extrabold text-slate-50 mb-3">
            Tool Directory
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Browse by category. All tools run client-side — no server calls, no data collection.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.12)]'
                  : 'bg-white/[0.01] border-white/8 text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              {cat.name}
              {cat.id === 'all' && (
                <span className="ml-1.5 text-[9px] font-mono opacity-60">10</span>
              )}
            </button>
          ))}
        </div>

        {/* Filtered List */}
        <div className="max-w-3xl mx-auto">
          <motion.div layout className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="p-2 rounded-lg bg-white/4 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-normal truncate max-w-md">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
