'use client';

import { useState, useCallback, useRef } from 'react';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

interface Match {
  index: number;
  length: number;
  value: string;
  groups: Record<string, string | undefined>;
}

const EXAMPLES = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', flags: 'g', test: 'Contact us at hello@example.com or support@greptools.dev' },
  { name: 'URL', pattern: 'https?:\\/\\/[^\\s]+', flags: 'g', test: 'Visit https://greptools.dev or http://example.com/path?q=1' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g', test: 'Server IPs: 192.168.1.1, 10.0.0.255, 172.16.254.1' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g', test: 'Events: 2024-01-15, 2024-06-30, 2025-12-01' },
  { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'g', test: 'Colors: #fff, #1a2b3c, #ff0000, #abc' },
];

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHighlighted(text: string, matches: Match[]): string {
  if (!matches.length) return escapeHtml(text);
  let result = '';
  let last = 0;
  for (const m of matches) {
    result += escapeHtml(text.slice(last, m.index));
    result += `<mark class="regex-match">${escapeHtml(text.slice(m.index, m.index + m.length))}</mark>`;
    last = m.index + m.length;
  }
  result += escapeHtml(text.slice(last));
  return result;
}

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags]     = useState('g');
  const [testStr, setTestStr] = useState('');
  const [error, setError]     = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [highlighted, setHighlighted] = useState('');
  const patternRef = useRef<HTMLInputElement>(null);

  const runMatch = useCallback((pat: string, fl: string, text: string) => {
    setError(null);
    if (!pat || !text) {
      setMatches([]);
      setHighlighted(escapeHtml(text));
      return;
    }
    try {
      const re = new RegExp(pat, fl.includes('g') ? fl : fl + 'g');
      const found: Match[] = [];
      let m: RegExpExecArray | null;
      let safety = 0;
      while ((m = re.exec(text)) !== null && safety++ < 1000) {
        found.push({ index: m.index, length: m[0].length, value: m[0], groups: m.groups ?? {} });
        if (!fl.includes('g')) break;
        if (m[0].length === 0) re.lastIndex++;
      }
      setMatches(found);
      setHighlighted(buildHighlighted(text, found));
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
      setHighlighted(escapeHtml(text));
    }
  }, []);

  const handlePattern = (val: string) => { setPattern(val); runMatch(val, flags, testStr); };
  const handleFlags   = (val: string) => { setFlags(val);   runMatch(pattern, val, testStr); };
  const handleText    = (val: string) => { setTestStr(val); runMatch(pattern, flags, val); };

  const loadExample = (ex: typeof EXAMPLES[0]) => {
    setPattern(ex.pattern);
    setFlags(ex.flags);
    setTestStr(ex.test);
    runMatch(ex.pattern, ex.flags, ex.test);
    patternRef.current?.focus();
  };

  const clear = () => { setPattern(''); setFlags('g'); setTestStr(''); setMatches([]); setHighlighted(''); setError(null); };

  return (
    <div>
      <div className="action-bar">
        <span className="regex-match-count">
          {matches.length > 0 ? (
            <span style={{ color: 'var(--brand-green)' }}>✓ {matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
          ) : pattern && testStr ? (
            <span style={{ color: 'var(--text-muted)' }}>No matches</span>
          ) : null}
        </span>
        <CopyButton getValue={() => pattern} label="Copy Regex" />
        <button onClick={clear} disabled={!pattern && !testStr} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
          </svg>
          Clear
        </button>
      </div>

      {/* Quick examples */}
      <div className="regex-examples-row">
        {EXAMPLES.map((ex) => (
          <button key={ex.name} onClick={() => loadExample(ex)} className="regex-example-chip">
            {ex.name}
          </button>
        ))}
      </div>

      {error && <ErrorBanner message="Invalid Regex" detail={error} />}

      {/* Pattern input */}
      <div className="regex-pattern-row">
        <div className="regex-delimiter">/</div>
        <input
          ref={patternRef}
          id="regex-pattern"
          type="text"
          className="regex-pattern-input"
          value={pattern}
          onChange={(e) => handlePattern(e.target.value)}
          placeholder="Enter regex pattern…"
          spellCheck={false}
          aria-label="Regular expression pattern"
        />
        <div className="regex-delimiter">/</div>
        <input
          id="regex-flags"
          type="text"
          className="regex-flags-input"
          value={flags}
          onChange={(e) => handleFlags(e.target.value)}
          placeholder="gim"
          spellCheck={false}
          aria-label="Regex flags"
        />
      </div>

      <div className="editor-panels">
        {/* Test string */}
        <div className="editor-panel">
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-indicator" style={{ backgroundColor: 'var(--brand-green)' }} />
              <span className="panel-label">Test String</span>
            </div>
          </div>
          <div className="panel-content">
            <textarea
              id="regex-test-input"
              className="panel-textarea"
              value={testStr}
              onChange={(e) => handleText(e.target.value)}
              placeholder={'Paste text to test your regex against…\n\nExample: hello@world.com'}
              spellCheck={false}
              aria-label="Test string input"
            />
          </div>
          <div className="panel-stats-bar">
            <span className="panel-stats-label">Test string:</span>
            <span className="panel-stat"><span className="panel-stat-val">{testStr.length.toLocaleString()}</span> chars</span>
          </div>
        </div>

        {/* Highlighted output */}
        <div className={`editor-panel ${matches.length > 0 ? 'editor-panel-active' : ''}`}>
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-indicator" style={{ backgroundColor: matches.length > 0 ? 'var(--brand-blue)' : 'var(--text-muted)' }} />
              <span className="panel-label">Match Highlights</span>
            </div>
            {matches.length > 0 && <span className="panel-lang"><span className="panel-valid">{matches.length} match{matches.length !== 1 ? 'es' : ''} ✓</span></span>}
          </div>
          <div className="panel-content">
            {testStr ? (
              <pre
                className="panel-pre"
                aria-label="Regex match highlights"
                dangerouslySetInnerHTML={{ __html: highlighted || escapeHtml(testStr) }}
              />
            ) : (
              <div className="panel-empty">
                <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <p className="panel-empty-text">Matches will be highlighted here</p>
              </div>
            )}
          </div>
          <div className="panel-stats-bar">
            <span className="panel-stats-label">Matches:</span>
            <span className="panel-stat"><span className="panel-stat-val">{matches.length}</span> found</span>
          </div>
        </div>
      </div>

      {/* Match details */}
      {matches.length > 0 && (
        <div className="regex-matches-list">
          <div className="regex-matches-header">Match Details</div>
          {matches.slice(0, 20).map((m, i) => (
            <div key={i} className="regex-match-row">
              <span className="regex-match-idx">#{i + 1}</span>
              <span className="regex-match-val">{m.value}</span>
              <span className="regex-match-pos">@ index {m.index}–{m.index + m.length - 1}</span>
            </div>
          ))}
          {matches.length > 20 && <div className="regex-match-more">…and {matches.length - 20} more matches</div>}
        </div>
      )}
    </div>
  );
}
