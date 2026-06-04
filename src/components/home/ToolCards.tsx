'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FileJson, Binary, Link as LinkIcon, Fingerprint, Clock,
  Lock, Shield, Regex, FileCode2, Database, ArrowUpRight,
} from 'lucide-react';

const TOOLS = [
  {
    name: 'JSON Formatter',
    desc: 'Prettify, validate, and minify JSON with live lint feedback and error highlighting.',
    href: '/tools/json-formatter',
    icon: FileJson,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    borderHover: 'hover:border-blue-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
    badge: 'Formatter',
  },
  {
    name: 'Base64 Encoder',
    desc: 'Encode and decode Base64 strings with full UTF-8 support. Works offline.',
    href: '/tools/base64-encoder',
    icon: Binary,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
    badge: 'Encoder',
  },
  {
    name: 'URL Encoder',
    desc: 'Percent-encode and decode query parameters for URLs and form submissions.',
    href: '/tools/url-encoder',
    icon: LinkIcon,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    borderHover: 'hover:border-amber-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]',
    badge: 'Encoder',
  },
  {
    name: 'UUID Generator',
    desc: 'Generate cryptographically secure UUID v4 identifiers via the Web Crypto API.',
    href: '/tools/uuid-generator',
    icon: Fingerprint,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    borderHover: 'hover:border-violet-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
    badge: 'Generator',
  },
  {
    name: 'Unix Timestamp',
    desc: 'Convert epoch timestamps to human-readable dates and back. Supports ms and s.',
    href: '/tools/unix-timestamp-converter',
    icon: Clock,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    borderHover: 'hover:border-sky-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]',
    badge: 'Converter',
  },
  {
    name: 'JWT Decoder',
    desc: 'Decode and inspect JWT tokens — header, payload, signature, and expiry status.',
    href: '/tools/jwt-decoder',
    icon: Shield,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    borderHover: 'hover:border-rose-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]',
    badge: 'Security',
  },
  {
    name: 'Password Generator',
    desc: 'Generate strong random passwords with custom length and character sets.',
    href: '/tools/password-generator',
    icon: Lock,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    borderHover: 'hover:border-orange-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.1)]',
    badge: 'Generator',
  },
  {
    name: 'Regex Tester',
    desc: 'Test regular expressions with live match highlighting and per-match detail view.',
    href: '/tools/regex-tester',
    icon: Regex,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    borderHover: 'hover:border-green-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]',
    badge: 'Validator',
  },
  {
    name: 'YAML to JSON',
    desc: 'Bidirectional YAML ↔ JSON conversion with validation. Supports Kubernetes and DevOps configs.',
    href: '/tools/yaml-json-converter',
    icon: FileCode2,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    borderHover: 'hover:border-teal-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]',
    badge: 'Converter',
  },
  {
    name: 'SQL Formatter',
    desc: 'Beautify SQL queries with proper indentation and uppercase keywords. Zero dependencies.',
    href: '/tools/sql-formatter',
    icon: Database,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    borderHover: 'hover:border-indigo-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]',
    badge: 'Formatter',
  },
];

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const CARD = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const BADGE_COLORS: Record<string, string> = {
  Formatter:  'text-blue-400 bg-blue-500/8 border-blue-500/15',
  Encoder:    'text-amber-400 bg-amber-500/8 border-amber-500/15',
  Generator:  'text-violet-400 bg-violet-500/8 border-violet-500/15',
  Converter:  'text-teal-400 bg-teal-500/8 border-teal-500/15',
  Security:   'text-rose-400 bg-rose-500/8 border-rose-500/15',
  Validator:  'text-green-400 bg-green-500/8 border-green-500/15',
};

export default function ToolCards() {
  return (
    <section className="relative py-24 px-6 z-10" id="tools" aria-labelledby="tools-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/15 text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            10 Tools Live
          </motion.div>
          <motion.h2
            id="tools-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-50 mb-4"
          >
            All Developer Utilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Every tool runs entirely in your browser. No servers, no signups, no data sent anywhere.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const badgeClass = BADGE_COLORS[tool.badge] ?? 'text-slate-400 bg-white/5 border-white/10';
            return (
              <motion.div key={tool.href} variants={CARD}>
                <Link
                  href={tool.href}
                  className={`group relative flex flex-col justify-between p-5 h-full rounded-xl bg-white/[0.015] border border-white/5 hover:bg-white/[0.03] transition-all duration-300 ${tool.borderHover} ${tool.glow}`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-2.5 rounded-lg ${tool.bg} ${tool.color} transition-transform group-hover:scale-110 duration-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClass}`}>
                          {tool.badge}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-white mb-1.5 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-3 border-t border-white/4 flex items-center justify-between text-[9px] text-slate-600 font-mono">
                    <span>STATUS: ONLINE</span>
                    <span>CLIENT-SIDE</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
