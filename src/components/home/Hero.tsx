'use client';

import { motion } from 'framer-motion';
import CommandBar from './CommandBar';
import Terminal from './Terminal';
import Link from 'next/link';

const FADE_IN = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const TOOL_NAMES = [
  'JSON', 'Base64', 'URL', 'UUID', 'Timestamp', 'JWT', 'Passwords', 'Regex', 'YAML', 'SQL',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto flex flex-col items-center z-10"
      >
        {/* Animated Badge */}
        <motion.div
          variants={FADE_IN}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/4 border border-white/6 backdrop-blur-md text-[11px] font-semibold tracking-wider text-blue-400 uppercase select-none mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>10 utilities live — browser-based, free, private</span>
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
          className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-4"
        >
          grepTools is a fast, privacy-conscious developer utility platform. Format JSON, decode JWTs,
          generate passwords, test regex, convert YAML, and more — all running client-side in your browser.
          No signup. No servers. No data transmitted.
        </motion.p>

        {/* Tool name pills */}
        <motion.div variants={FADE_IN} className="flex flex-wrap justify-center gap-2 mb-10">
          {TOOL_NAMES.map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/4 border border-white/6 text-slate-400"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Command bar */}
        <motion.div variants={FADE_IN} className="w-full mb-8">
          <CommandBar />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={FADE_IN} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#tools"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-blue-600 text-slate-50 hover:bg-blue-500 transition-all select-none hover:shadow-[0_0_24px_rgba(59,130,246,0.3)] duration-300"
          >
            Browse All 10 Tools →
          </a>
          <Link
            href="/tools/json-formatter"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-white/4 border border-white/6 text-slate-300 hover:text-white hover:bg-white/8 transition-all select-none duration-300"
          >
            Try JSON Formatter
          </Link>
        </motion.div>

        {/* Simulated Terminal */}
        <motion.div variants={FADE_IN} className="w-full">
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  );
}
