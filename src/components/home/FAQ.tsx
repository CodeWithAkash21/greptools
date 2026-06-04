'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does grepTools protect my data privacy?',
    a: 'Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers. Conversions, formatting, and generation all happen inside your local browser context. You can use grepTools with your browser network tab open to verify no tool-related requests are sent.',
  },
  {
    q: 'What tools does grepTools currently offer?',
    a: 'grepTools currently has 10 live tools: JSON Formatter, Base64 Encoder/Decoder, URL Encoder/Decoder, UUID Generator, Unix Timestamp Converter, JWT Decoder, Password Generator, Regex Tester, YAML to JSON Converter, and SQL Formatter. More tools are in development.',
  },
  {
    q: 'Does grepTools use external APIs for generation tools?',
    a: 'No. The UUID Generator uses the native browser Web Crypto API (crypto.randomUUID or crypto.getRandomValues). The Password Generator also uses crypto.getRandomValues. No external API is called — your generated values are private.',
  },
  {
    q: 'Why is grepTools free to use?',
    a: 'We sustain operations via non-intrusive display advertisements placed outside the tool editing workspace. All tools have no payload limits, no tier gates, and no required accounts.',
  },
  {
    q: 'Can I use grepTools offline?',
    a: 'Yes — after the page loads, core tool processing requires no network connection. Ads and analytics may not load offline, but all tool functionality remains fully operational.',
  },
  {
    q: 'Which SQL dialects does the SQL Formatter support?',
    a: 'The SQL Formatter handles standard SQL constructs that are compatible with MySQL, PostgreSQL, SQLite, Microsoft SQL Server, and Oracle. Dialect-specific functions are preserved as-is. It correctly handles quoted strings, block comments, and backtick identifiers.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 px-6 z-10" id="faq" aria-labelledby="faq-title">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 id="faq-title" className="text-3xl font-extrabold text-slate-50 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Answers about privacy, tools, offline use, and how grepTools works.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-colors duration-300 ${
                  isOpen ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.01]'
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-200 hover:text-white select-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
