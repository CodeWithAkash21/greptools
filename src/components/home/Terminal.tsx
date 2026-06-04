'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = [
  {
    input: 'curl -X GET https://greptools.dev/api/status \\',
    input2: '  -H "Accept: application/json" \\',
    input3: '  --silent | python3 -m json.tool',
    output: [
      '// All tool processing is sandboxed client-side.',
      '// No network request was transmitted to any server.',
      '{',
      '  "status": "operational",',
      '  "source": "client-side-sandbox",',
      '  "platform": "greptools.dev",',
      '  "tools": {',
      '    "live": 10,',
      '    "processing": "browser-local",',
      '    "backend": false,',
      '    "signup": false',
      '  }',
      '}',
    ],
  },
];

export default function Terminal() {
  const [step, setStep] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [typedInput2, setTypedInput2] = useState('');
  const [typedInput3, setTypedInput3] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const current = COMMANDS[step % COMMANDS.length];
    
    // Typing input 1
    let idx1 = 0;
    const interval1 = setInterval(() => {
      if (idx1 < current.input.length) {
        setTypedInput(current.input.slice(0, idx1 + 1));
        idx1++;
      } else {
        clearInterval(interval1);
        
        // Typing input 2
        let idx2 = 0;
        const interval2 = setInterval(() => {
          if (idx2 < current.input2.length) {
            setTypedInput2(current.input2.slice(0, idx2 + 1));
            idx2++;
          } else {
            clearInterval(interval2);

            // Typing input 3
            let idx3 = 0;
            const interval3 = setInterval(() => {
              if (idx3 < current.input3.length) {
                setTypedInput3(current.input3.slice(0, idx3 + 1));
                idx3++;
              } else {
                clearInterval(interval3);
                
                // Show output after a slight delay
                setTimeout(() => {
                  setShowOutput(true);
                }, 400);
              }
            }, 30);
          }
        }, 30);
      }
    }, 30);

    return () => {
      clearInterval(interval1);
    };
  }, [step]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-white/5 bg-[#090d1a]/40 backdrop-blur-sm overflow-hidden font-mono text-xs text-slate-350">
      {/* Terminal Content */}
      <div className="p-6 min-h-[240px] flex flex-col justify-start text-left whitespace-pre-wrap leading-relaxed select-text selection:bg-blue-500/20">
        {/* Line 1 */}
        <div className="flex gap-2">
          <span className="text-blue-500/70 select-none">$</span>
          <span>{typedInput}</span>
        </div>

        {/* Line 2 */}
        {typedInput && (
          <div className="pl-4">
            <span>{typedInput2}</span>
          </div>
        )}

        {/* Line 3 */}
        {typedInput2 && (
          <div className="pl-4">
            <span>{typedInput3}</span>
            {!showOutput && (
              <span className="inline-block w-1.5 h-3.5 ml-1 bg-blue-500 animate-pulse align-middle" />
            )}
          </div>
        )}

        {/* Output */}
        {showOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-emerald-400/80 font-medium"
          >
            {COMMANDS[step].output.map((line, idx) => (
              <div key={idx} className={line.startsWith('//') ? 'text-slate-550 font-normal italic' : ''}>
                {line}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
