'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Code2, Heart } from 'lucide-react';

const REASONS = [
  {
    icon: ShieldAlert,
    title: 'Privacy First',
    desc: 'No logging. No remote storage. No API tokens. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Cpu,
    title: 'Runs in Browser',
    desc: 'Powered entirely by optimized client-side JS. No database dependencies, zero latency delays, and full offline availability.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Code2,
    title: 'Built for Developers',
    desc: 'Monospace formats, instant keyboard copy macros, clear JSON error reporting, and no bloated registration walls.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Heart,
    title: 'Fast & Free',
    desc: 'No freemium plans, no limit on payload processing, and no hidden APIs. Safe, non-intrusive developer tools.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
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

const ITEM = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function WhySection() {
  return (
    <section className="relative py-24 px-6 z-10 bg-transparent" id="why" aria-labelledby="why-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            id="why-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-50 mb-4"
          >
            Why grepTools?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            The tools you need, stripped of tracking cookies, subscription banners, and artificial limits.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {REASONS.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={idx}
                variants={ITEM}
                className="p-6 rounded-xl bg-white/[0.01] border border-white/4 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className={`inline-flex p-2.5 rounded-lg ${r.bg} ${r.color} mb-5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-2">{r.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
