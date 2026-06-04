'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/site/CopyButton';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*()-_=+[]{}|;:,.<>?';

interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  count: number;
}

function generatePassword(opts: PasswordOptions): string {
  let charset = '';
  if (opts.upper)   charset += UPPER;
  if (opts.lower)   charset += LOWER;
  if (opts.numbers) charset += NUMS;
  if (opts.symbols) charset += SYMS;
  if (!charset) charset = LOWER;
  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => charset[n % charset.length]).join('');
}

function calcStrength(pw: string): { label: string; pct: number; color: string } {
  if (!pw) return { label: '', pct: 0, color: 'transparent' };
  let s = 0;
  if (pw.length >= 8)  s++;
  if (pw.length >= 12) s++;
  if (pw.length >= 16) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const pct = Math.round((s / 7) * 100);
  if (s <= 2) return { label: 'Weak', pct, color: 'var(--brand-red)' };
  if (s <= 4) return { label: 'Fair', pct, color: 'var(--brand-orange)' };
  if (s <= 5) return { label: 'Strong', pct, color: '#facc15' };
  return { label: 'Very Strong', pct, color: 'var(--brand-green)' };
}

export default function PasswordGeneratorTool() {
  const [opts, setOpts] = useState<PasswordOptions>({ length: 16, upper: true, lower: true, numbers: true, symbols: true, count: 1 });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < opts.count; i++) list.push(generatePassword(opts));
    setPasswords(list);
  }, [opts]);

  useEffect(() => { generate(); }, [generate]);

  const handleCopySingle = (pw: string) => {
    navigator.clipboard.writeText(pw).then(() => {
      setCopied(pw);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const strength = calcStrength(passwords[0] ?? '');

  return (
    <div>
      <div className="action-bar">
        <button onClick={generate} className="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Generate
        </button>
        <CopyButton getValue={() => passwords.join('\n')} label="Copy All" />
      </div>

      <div className="pw-layout">
        <div className="pw-controls-card">
          <div className="pw-control-group">
            <div className="pw-control-row">
              <label className="pw-control-label" htmlFor="pw-length">Length</label>
              <span className="pw-length-val">{opts.length}</span>
            </div>
            <input id="pw-length" type="range" min={4} max={64} value={opts.length}
              onChange={(e) => setOpts((o) => ({ ...o, length: +e.target.value }))}
              className="pw-slider" aria-label="Password length" />
            <div className="pw-slider-ticks"><span>4</span><span>16</span><span>32</span><span>64</span></div>
          </div>

          <div className="pw-control-group">
            <div className="pw-control-label" style={{ marginBottom: '0.5rem' }}>Characters</div>
            {([
              ['Uppercase (A–Z)', 'upper'],
              ['Lowercase (a–z)', 'lower'],
              ['Numbers (0–9)',   'numbers'],
              ['Symbols (!@#…)',  'symbols'],
            ] as [string, keyof PasswordOptions][]).map(([label, key]) => (
              <button key={key} role="switch" aria-checked={!!opts[key]}
                onClick={() => setOpts((o) => ({ ...o, [key]: !o[key] }))}
                className={`pw-toggle ${opts[key] ? 'pw-toggle-on' : ''}`}>
                <span className="pw-toggle-dot" />
                <span className="pw-toggle-label">{label}</span>
              </button>
            ))}
          </div>

          <div className="pw-control-group">
            <div className="pw-control-row">
              <label className="pw-control-label" htmlFor="pw-count">Count</label>
              <span className="pw-length-val">{opts.count} password{opts.count > 1 ? 's' : ''}</span>
            </div>
            <input id="pw-count" type="range" min={1} max={10} value={opts.count}
              onChange={(e) => setOpts((o) => ({ ...o, count: +e.target.value }))}
              className="pw-slider" aria-label="Number of passwords" />
          </div>
        </div>

        <div className="pw-output-col">
          {passwords.length > 0 && (
            <>
              <div className="pw-strength-bar-wrap">
                <div className="pw-strength-top">
                  <span className="pw-strength-label">Strength:</span>
                  <span className="pw-strength-name" style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div className="pw-strength-track">
                  <div className="pw-strength-fill" style={{ width: `${strength.pct}%`, background: strength.color }} />
                </div>
              </div>
              <div className="uuid-list">
                {passwords.map((pw, i) => (
                  <div key={i} className="uuid-row">
                    <span className="uuid-val" style={{ fontSize: '0.8rem', letterSpacing: '0.04em' }}>{pw}</span>
                    <button onClick={() => handleCopySingle(pw)} className="btn btn-ghost uuid-copy-btn"
                      aria-label={`Copy password ${i + 1}`} style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
                      {copied === pw ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
