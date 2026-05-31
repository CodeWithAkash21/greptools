'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FileJson, Binary, Link as LinkIcon, Fingerprint, Clock, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Utilities' },
  { id: 'encoding', name: 'Encoding' },
  { id: 'formatting', name: 'Formatting' },
  { id: 'generators', name: 'Generators' },
  { id: 'datetime', name: 'Date & Time' },
];

const ITEMS = [
  { name: 'JSON Formatter & Validator', category: 'formatting', icon: FileJson, href: '/tools/json-formatter', desc: 'Prettify and lint JSON code with line-by-line validation.' },
  { name: 'Base64 Encoder / Decoder', category: 'encoding', icon: Binary, href: '/tools/base64-encoder', desc: 'Safely convert binary data to printable ASCII text.' },
  { name: 'URL Encoder / Decoder', category: 'encoding', icon: LinkIcon, href: '/tools/url-encoder', desc: 'Encode percent parameters for query strings and form posts.' },
  { name: 'UUID Generator v4', category: 'generators', icon: Fingerprint, href: '/tools/uuid-generator', desc: 'Bulk generate cryptographically secure unique identifiers.' },
  { name: 'Unix Timestamp Converter', category: 'datetime', icon: Clock, href: '/tools/unix-timestamp-converter', desc: 'Convert Epoch timestamps to human dates instantly.' },
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
          <h2 id="categories-heading" className="text-3xl font-extrabold text-slate-50 mb-3">
            Tool Directory
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Browse our core utility suite by functional domain. Instant browser-based executions.
          </p>
        </div>
 
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
 
        {/* Filtered List */}
        <div className="max-w-3xl mx-auto">
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="p-2 rounded-lg bg-white/4 text-slate-300 group-hover:text-blue-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-normal truncate max-w-md">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
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
