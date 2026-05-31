'use client';

import { useState, useCallback, useRef } from 'react';
import CopyButton from '@/components/site/CopyButton';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // RFC 4122 v4 fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface UUIDEntry {
  id: string;
  value: string;
}

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<UUIDEntry[]>([]);
  const [count, setCount] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutAllRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generate = useCallback(() => {
    const n = Math.min(Math.max(1, count), 100);
    const entries: UUIDEntry[] = Array.from({ length: n }, (_, i) => ({
      id: String(Date.now()) + i,
      value: generateUUID(),
    }));
    setUuids((prev) => [...entries, ...prev].slice(0, 500));
  }, [count]);

  const copyOne = useCallback((entry: UUIDEntry) => {
    navigator.clipboard.writeText(entry.value).then(() => {
      setCopiedId(entry.id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const copyAll = useCallback(() => {
    if (!uuids.length) return;
    navigator.clipboard.writeText(uuids.map((u) => u.value).join('\n')).then(() => {
      setCopiedAll(true);
      if (timeoutAllRef.current) clearTimeout(timeoutAllRef.current);
      timeoutAllRef.current = setTimeout(() => setCopiedAll(false), 2000);
    });
  }, [uuids]);

  const handleClear = () => setUuids([]);

  return (
    <div>
      {/* Controls */}
      <div className="action-bar">
        <div className="uuid-controls">
          <label htmlFor="uuid-count" className="uuid-count-label">Count:</label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="uuid-count-input"
            aria-label="Number of UUIDs to generate"
          />
        </div>
        <button onClick={generate} className="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
          Generate
        </button>
        <button onClick={copyAll} disabled={!uuids.length} className="btn btn-secondary">
          {copiedAll ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copied All!</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy All</>
          )}
        </button>
        <button onClick={handleClear} disabled={!uuids.length} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          Clear
        </button>
        {uuids.length > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
            {uuids.length} UUID{uuids.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Results */}
      <div
        style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)', overflow: 'hidden',
        }}
      >
        {uuids.length === 0 ? (
          <div className="uuid-empty">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .35 }}>
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
            <p className="uuid-empty-title">No UUIDs generated yet</p>
            <p className="uuid-empty-sub">Set a count and click Generate</p>
          </div>
        ) : (
          <div className="uuid-list" role="list" aria-label="Generated UUIDs">
            {uuids.map((entry) => (
              <div key={entry.id} className="uuid-row" role="listitem">
                <span className="uuid-val">{entry.value}</span>
                <button
                  onClick={() => copyOne(entry)}
                  className="btn btn-ghost uuid-copy-btn"
                  aria-label={`Copy ${entry.value}`}
                  style={{ padding: '.3rem .625rem', fontSize: '11px' }}
                >
                  {copiedId === entry.id ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
