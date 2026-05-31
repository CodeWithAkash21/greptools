'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does grepTools guarantee my data privacy?',
    a: 'Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers. Every conversion, formatting step, or generation happens inside your local browser context, and you can even use grepTools offline.',
  },
  {
    q: 'Does grepTools use external APIs for UUID generation?',
    a: 'No. The UUID generator uses the native browser Cryptographic API (crypto.randomUUID) with local fallback math algorithms. Your generated keys are private and cryptographically secure.',
  },
  {
    q: 'Why is grepTools free to use?',
    a: 'We sustain our website operations and hosting via non-intrusive display advertisements located outside of your main editing workspace. We do not restrict payload lengths or gate tools behind paid tiers.',
  },
  {
    q: 'Will grepTools support custom query schemas?',
    a: 'Yes. Our URL and JSON tools follow standard formats defined by RFC specifications. You can use standard formatting layouts, percent encoding, and customize indentation widths locally.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 px-6 z-10" id="faq" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-3xl font-extrabold text-slate-50 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Learn more about our local sandboxing policies, browser limits, and monetization.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/4 bg-white/[0.01] overflow-hidden transition-colors duration-300"
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-200 hover:text-white select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 pt-2 text-xs text-slate-400 leading-relaxed">
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
