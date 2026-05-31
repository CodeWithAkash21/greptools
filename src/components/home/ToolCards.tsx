'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileJson, Binary, Link as LinkIcon, Fingerprint, Clock, ArrowUpRight } from 'lucide-react';

const TOOLS = [
  {
    name: 'JSON Formatter',
    desc: 'Prettify, validate, parse, and minify JSON strings with live lint feedback.',
    href: '/tools/json-formatter',
    icon: FileJson,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    borderHover: 'hover:border-blue-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
  },
  {
    name: 'Base64 Encoder',
    desc: 'Securely encode and decode Base64 strings with full UTF-8 compatibility.',
    href: '/tools/base64-encoder',
    icon: Binary,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
  },
  {
    name: 'URL Encoder',
    desc: 'Encode or decode standard percent-encoded parameters for query strings.',
    href: '/tools/url-encoder',
    icon: LinkIcon,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    borderHover: 'hover:border-amber-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]',
  },
  {
    name: 'UUID Generator',
    desc: 'Bulk generate cryptographically secure UUID v4 tokens with fallback seed.',
    href: '/tools/uuid-generator',
    icon: Fingerprint,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    borderHover: 'hover:border-violet-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
  },
  {
    name: 'Unix Timestamp Converter',
    desc: 'Convert epoch seconds or milliseconds to human-readable datetime formats.',
    href: '/tools/unix-timestamp-converter',
    icon: Clock,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    borderHover: 'hover:border-sky-500/30',
    glow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]',
  },
];

const CONTAINER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CARD = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function ToolCards() {
  return (
    <section className="relative py-24 px-6 z-10" id="tools" aria-labelledby="tools-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            id="tools-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-50 mb-4"
          >
            Core Developer Utilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Run all processing routines client-side inside the safety of your local browser context.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.href} variants={CARD}>
                <Link
                  href={tool.href}
                  className={`group relative flex flex-col justify-between p-6 h-full rounded-xl bg-white/[0.015] border border-white/5 hover:bg-white/[0.03] transition-all duration-300 ${tool.borderHover} ${tool.glow}`}
                >
                  <div>
                    {/* Header Icon + Arrow */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-2.5 rounded-lg ${tool.bg} ${tool.color} transition-transform group-hover:scale-110 duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-slate-200 group-hover:text-white mb-2 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 group-hover:text-slate-350 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  
                  {/* Local sandboxed pledge indicator */}
                  <div className="mt-6 pt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>STATUS: ONLINE</span>
                    <span>LOCAL PROCESSING</span>
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
