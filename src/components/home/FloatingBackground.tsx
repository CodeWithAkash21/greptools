'use client';

import { motion } from 'framer-motion';

const SNIPPETS = [
  'const token = btoa(username + ":" + password);',
  '{"status": 200, "success": true, "data": []}',
  'crypto.randomUUID()',
  '1718444400 === new Date("2024-06-15").getTime() / 1000',
  'encodeURIComponent("https://greptools.dev/api?q=1")',
  'JSON.stringify(input, null, 2)',
  'grep -r "TODO" ./src',
  'atob(encodedData)',
];

export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Developer Grid Background */}
      <div 
        className="absolute inset-0 bg-[#0a0f1e]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating code snippets */}
      {SNIPPETS.map((snippet, idx) => {
        const top = 10 + (idx * 11) % 80;
        const left = 5 + (idx * 17) % 90;
        const duration = 25 + (idx * 5) % 15;
        const opacity = 0.008 + (idx % 3) * 0.006;
        const fontSize = 11 + (idx % 3) * 1.5;

        return (
          <motion.div
            key={idx}
            initial={{ y: 0 }}
            animate={{ y: [-15, 15, -15] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute font-mono hidden md:block"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              opacity,
              fontSize: `${fontSize}px`,
              color: '#3b82f6',
              whiteSpace: 'nowrap',
            }}
          >
            {snippet}
          </motion.div>
        );
      })}
    </div>
  );
}
