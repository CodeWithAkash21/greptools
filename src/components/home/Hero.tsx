'use client';

import { motion } from 'framer-motion';
import CommandBar from './CommandBar';
import Terminal from './Terminal';

const FADE_IN = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Hero() {
  return (
    <section className="relative min-height-screen pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto flex flex-col items-center z-10"
      >
        {/* Animated Badge */}
        <motion.div
          variants={FADE_IN}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/4 border border-white/4 backdrop-blur-md text-[11px] font-semibold tracking-wider text-blue-400 uppercase select-none mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>grepTools v1.0 — 24 utilities online</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={FADE_IN}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-50 max-w-3xl leading-[1.08] mb-6"
        >
          Developer Tools,{' '}
          <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
            Simplified.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          variants={FADE_IN}
          className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          Fast, free browser-based utilities. No signup. Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.
        </motion.p>

        {/* Spotlight command bar */}
        <motion.div variants={FADE_IN} className="w-full mb-10">
          <CommandBar />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={FADE_IN} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#tools"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-blue-600 text-slate-50 hover:bg-blue-500 transition-all select-none hover:shadow-[0_0_24px_rgba(59,130,246,0.3)] duration-300"
          >
            Browse tools →
          </a>
          <a
            href="#why"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-white/4 border border-white/4 text-slate-300 hover:text-white hover:bg-white/8 transition-all select-none duration-300"
          >
            Why grepTools
          </a>
        </motion.div>

        {/* Simulated Terminal */}
        <motion.div variants={FADE_IN} className="w-full">
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  );
}
