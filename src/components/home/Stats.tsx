'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '24+', label: 'Utilities Online', desc: 'Covering key formatting, decoding, generator and hash utilities.' },
  { value: 'Local', label: 'Tool Processing', desc: 'Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.' },
  { value: 'Client', label: 'Side Execution', desc: 'Computations execute entirely using local browser-based resources.' },
  { value: 'Free', label: 'Forever', desc: 'Permanent free access with no paid limits or signups.' },
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
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={ITEM}
              className="p-8 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-500 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-250 mb-3">
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
