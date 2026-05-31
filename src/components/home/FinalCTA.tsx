'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="relative py-28 px-6 z-10 text-center overflow-hidden" aria-labelledby="cta-title">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl font-extrabold text-slate-50 mb-6 leading-tight max-w-2xl mx-auto"
        >
          Ready for developer tools that respect your data?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-10 leading-relaxed"
        >
          Experience instant client-side execution speeds with zero logging, zero tracking, and absolute offline compatibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#tools"
            className="inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-slate-50 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all select-none duration-300"
          >
            Launch Free Suite
          </a>
        </motion.div>
      </div>
    </section>
  );
}
