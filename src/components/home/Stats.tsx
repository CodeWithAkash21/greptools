'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    value: '10',
    label: 'Live Tools',
    desc: 'JSON, Base64, URL, UUID, Timestamps, JWT, Passwords, Regex, YAML, and SQL — all production-ready.',
  },
  {
    value: '100%',
    label: 'Client-Side',
    desc: 'Every computation runs in your browser. Tool inputs are not intentionally transmitted to our servers.',
  },
  {
    value: '0',
    label: 'Backend Required',
    desc: 'No API calls, no database, no rate limits. Works offline after the page loads.',
  },
  {
    value: 'Free',
    label: 'Forever',
    desc: 'No paid tiers, no usage caps, no signup walls. grepTools is and will remain free.',
  },
];

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const ITEM = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Stats() {
  return (
    <section className="relative py-24 px-6 z-10" id="stats" aria-labelledby="stats-title">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={ITEM}
              className="p-8 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-sm hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-500 mb-2 tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-3">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
