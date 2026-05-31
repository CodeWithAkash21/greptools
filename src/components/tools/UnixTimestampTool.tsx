'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ErrorBanner from '@/components/site/ErrorBanner';
import CopyButton from '@/components/site/CopyButton';

type Mode = 'seconds' | 'milliseconds';

function formatDate(ts: number, mode: Mode): string {
  const ms = mode === 'seconds' ? ts * 1000 : ts;
  const d = new Date(ms);
  if (isNaN(d.getTime())) throw new Error('Invalid timestamp');
  return d.toISOString().replace('T', ' ').replace('Z', ' UTC');
}

function dateToTimestamp(dateStr: string, mode: Mode): number {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) throw new Error('Invalid date — try ISO 8601 format, e.g. 2024-06-15T12:00:00');
  return mode === 'seconds' ? Math.floor(d.getTime() / 1000) : d.getTime();
}

export default function UnixTimestampTool() {
  const [mode, setMode] = useState<Mode>('seconds');
  const [liveTs, setLiveTs] = useState(0);

  // ── Panel A: timestamp → date ──────────────────────────────────────────────
  const [tsInput, setTsInput]   = useState('');
  const [tsResult, setTsResult] = useState('');
  const [tsError, setTsError]   = useState<string | null>(null);

  // ── Panel B: date → timestamp ──────────────────────────────────────────────
  const [dateInput, setDateInput]   = useState('');
  const [dateResult, setDateResult] = useState('');
  const [dateError, setDateError]   = useState<string | null>(null);

  // Live clock
  useEffect(() => {
    const update = () => setLiveTs(mode === 'seconds' ? Math.floor(Date.now() / 1000) : Date.now());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [mode]);

  const convertTs = useCallback(() => {
    if (!tsInput.trim()) { setTsResult(''); setTsError(null); return; }
    const n = Number(tsInput.trim());
    if (isNaN(n)) { setTsError('Enter a numeric timestamp.'); setTsResult(''); return; }
    try {
      setTsResult(formatDate(n, mode));
      setTsError(null);
    } catch (e) { setTsError((e as Error).message); setTsResult(''); }
  }, [tsInput, mode]);

  const convertDate = useCallback(() => {
    if (!dateInput.trim()) { setDateResult(''); setDateError(null); return; }
    try {
      setDateResult(String(dateToTimestamp(dateInput.trim(), mode)));
      setDateError(null);
    } catch (e) { setDateError((e as Error).message); setDateResult(''); }
  }, [dateInput, mode]);

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setTsResult(''); setTsError(null);
    setDateResult(''); setDateError(null);
  };

  const useNow = () => setTsInput(String(liveTs));

  return (
    <div>
      {/* Live clock banner */}
      <div className="ts-live-banner">
        <div className="ts-live-label">
          <span className="ts-live-dot" aria-hidden="true" />
          Current Unix timestamp ({mode}):
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span className="ts-live-val" aria-live="polite" aria-atomic="true">
            {liveTs.toLocaleString()}
          </span>
          <CopyButton getValue={() => String(liveTs)} label="Copy" />
        </div>
        <div className="ts-mode-toggle" role="group" aria-label="Timestamp unit">
          <button
            onClick={() => handleModeChange('seconds')}
            className={`ts-mode-btn${mode === 'seconds' ? ' active' : ''}`}
          >
            Seconds
          </button>
          <button
            onClick={() => handleModeChange('milliseconds')}
            className={`ts-mode-btn${mode === 'milliseconds' ? ' active' : ''}`}
          >
            Milliseconds
          </button>
        </div>
      </div>

      <div className="ts-grid">
        {/* Panel A — timestamp → date */}
        <div className="ts-card">
          <div className="ts-card-header">
            <span className="ts-card-title">Timestamp → Date</span>
          </div>
          <div className="ts-card-body">
            {tsError && <ErrorBanner message="Invalid Timestamp" detail={tsError} />}
            <div className="ts-input-group">
              <label htmlFor="ts-ts-input" className="ts-label">
                Unix timestamp ({mode})
              </label>
              <input
                id="ts-ts-input"
                type="text"
                inputMode="numeric"
                className="ts-input"
                placeholder={mode === 'seconds' ? '1718444400' : '1718444400000'}
                value={tsInput}
                onChange={(e) => { setTsInput(e.target.value); setTsError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && convertTs()}
                aria-label="Unix timestamp input"
              />
            </div>
            <div className="ts-actions">
              <button onClick={convertTs} disabled={!tsInput.trim()} className="btn btn-primary">Convert</button>
              <button onClick={useNow} className="btn btn-green">Use Now</button>
              <button onClick={() => { setTsInput(''); setTsResult(''); setTsError(null); }} disabled={!tsInput} className="btn btn-ghost">Clear</button>
            </div>
            <div className="ts-input-group">
              <label className="ts-label">Human-readable date (UTC)</label>
              <div className={`ts-result${!tsResult ? ' ts-result-empty' : ''}`} aria-live="polite">
                {tsResult || 'Result will appear here'}
              </div>
            </div>
            {tsResult && (
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <CopyButton getValue={() => tsResult} />
              </div>
            )}
          </div>
        </div>

        {/* Panel B — date → timestamp */}
        <div className="ts-card">
          <div className="ts-card-header">
            <span className="ts-card-title">Date → Timestamp</span>
          </div>
          <div className="ts-card-body">
            {dateError && <ErrorBanner message="Invalid Date" detail={dateError} />}
            <div className="ts-input-group">
              <label htmlFor="ts-date-input" className="ts-label">
                Date / datetime string
              </label>
              <input
                id="ts-date-input"
                type="text"
                className="ts-input"
                placeholder="2024-06-15T12:00:00Z"
                value={dateInput}
                onChange={(e) => { setDateInput(e.target.value); setDateError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && convertDate()}
                aria-label="Date input"
              />
            </div>
            <div className="ts-actions">
              <button onClick={convertDate} disabled={!dateInput.trim()} className="btn btn-primary">Convert</button>
              <button onClick={() => { setDateResult(''); setDateError(null); setDateInput(''); }} disabled={!dateInput} className="btn btn-ghost">Clear</button>
            </div>
            <div className="ts-input-group">
              <label className="ts-label">Unix timestamp ({mode})</label>
              <div className={`ts-result${!dateResult ? ' ts-result-empty' : ''}`} aria-live="polite">
                {dateResult || 'Result will appear here'}
              </div>
            </div>
            {dateResult && (
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <CopyButton getValue={() => dateResult} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
