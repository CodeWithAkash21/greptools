'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, FileJson, Binary, Link as LinkIcon, Fingerprint, Clock,
  Shield, Lock, Regex, FileCode2, Database, Terminal,
} from 'lucide-react';

const SUGGESTIONS = [
  { id: 'json',       name: 'JSON Formatter',           desc: 'Format and validate JSON files',         href: '/tools/json-formatter',           icon: FileJson,   keys: ['format', 'pretty', 'json', 'minify', 'lint'] },
  { id: 'base64',     name: 'Base64 Encoder',            desc: 'Convert text to/from Base64',            href: '/tools/base64-encoder',           icon: Binary,     keys: ['encode', 'decode', 'base64', 'btoa', 'atob'] },
  { id: 'url',        name: 'URL Encoder',               desc: 'Encode and decode query strings',        href: '/tools/url-encoder',              icon: LinkIcon,   keys: ['urlencode', 'urldecode', 'percent', 'query'] },
  { id: 'uuid',       name: 'UUID Generator',            desc: 'Generate UUID v4 identifiers',           href: '/tools/uuid-generator',           icon: Fingerprint,keys: ['uuid', 'guid', 'random', 'id', 'unique'] },
  { id: 'timestamp',  name: 'Unix Timestamp Converter',  desc: 'Convert Epoch to human date',            href: '/tools/unix-timestamp-converter', icon: Clock,      keys: ['epoch', 'date', 'time', 'unix', 'timestamp'] },
  { id: 'jwt',        name: 'JWT Decoder',               desc: 'Decode JWT tokens and inspect claims',   href: '/tools/jwt-decoder',              icon: Shield,     keys: ['jwt', 'token', 'auth', 'claims', 'bearer'] },
  { id: 'password',   name: 'Password Generator',        desc: 'Generate secure random passwords',       href: '/tools/password-generator',       icon: Lock,       keys: ['password', 'secure', 'random', 'passphrase'] },
  { id: 'regex',      name: 'Regex Tester',              desc: 'Test regular expressions live',          href: '/tools/regex-tester',             icon: Regex,      keys: ['regex', 'regexp', 'pattern', 'match', 'test'] },
  { id: 'yaml',       name: 'YAML to JSON Converter',    desc: 'Convert YAML and JSON bidirectionally',  href: '/tools/yaml-json-converter',      icon: FileCode2,  keys: ['yaml', 'json', 'convert', 'kubernetes', 'helm'] },
  { id: 'sql',        name: 'SQL Formatter',             desc: 'Beautify SQL queries',                   href: '/tools/sql-formatter',            icon: Database,   keys: ['sql', 'query', 'format', 'mysql', 'postgres'] },
];

const PLACEHOLDERS = [
  'Format JSON...',
  'Decode JWT...',
  'Generate UUID...',
  'Test regex...',
  'Convert YAML...',
  'Format SQL...',
  'Encode Base64...',
  'URL decode...',
  'Generate password...',
  'Convert timestamp...',
];

export default function CommandBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate placeholders when not focused
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle hotkeys (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter suggestions
  const filtered = SUGGESTIONS.filter((item) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    return (
      item.name.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      item.keys.some((k) => k.includes(term))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        router.push(filtered[selectedIndex].href);
      }
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto z-40">
      {/* Input container */}
      <div
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className={`flex items-center gap-3 bg-white/4 border rounded-xl px-4 py-3.5 cursor-text transition-all duration-300 ${
          isOpen
            ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-white/5'
            : 'border-white/5 hover:border-white/10'
        }`}
      >
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={isOpen ? 'Search 10 tools...' : PLACEHOLDERS[placeholderIndex]}
          className="bg-transparent border-none outline-none w-full text-slate-100 placeholder-slate-500 text-sm"
        />
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400 flex-shrink-0">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Floating Suggestions List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0d1326]/95 border border-white/5 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden"
          >
            {filtered.length > 0 ? (
              <div className="p-2 max-h-[340px] overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : 'All Tools'}
                </div>
                {filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => router.push(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-500/10 text-white' : 'text-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{item.desc}</div>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono flex-shrink-0">
                          <span>Enter</span>
                          <span>↵</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                <Terminal className="w-7 h-7 text-slate-600 mb-2" />
                <div className="text-xs">No matching tools found</div>
              </div>
            )}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-600">
              <div className="flex gap-3">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
              </div>
              <span>ESC close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
