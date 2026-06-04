'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Code2, Zap, BookOpen, Bookmark } from 'lucide-react';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Privacy-Conscious',
    desc: 'Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers. No logging, no remote storage, no API tokens required.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Cpu,
    title: 'Runs Entirely in Browser',
    desc: 'Powered by optimised client-side JavaScript. Zero backend dependencies, instant response times, and full offline availability after first load.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Code2,
    title: 'Built for Developers',
    desc: 'Monospace outputs, keyboard-first UX, clean error messages, and no registration walls. Tools that fit naturally into a developer workflow.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Zap,
    title: 'Fast & Lightweight',
    desc: 'No heavy frameworks, no unnecessary third-party scripts in the tool path. Each utility loads fast and executes instantly on any modern device.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: BookOpen,
    title: 'Educational Content',
    desc: 'Every tool page includes in-depth explanations, FAQs, and examples — so you learn while you work, not just get a raw result.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Bookmark,
    title: 'Easy to Bookmark',
    desc: 'Each tool has a clean, stable URL and works without any login or session state. Bookmark and revisit any tool in one click.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
];

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const ITEM = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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
            The tools you need, without the tracking pixels, subscription banners, or artificial limits.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REASONS.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={idx}
                variants={ITEM}
                className="p-6 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300"
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
