'use client';

import { useState, useCallback } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

export default function UrlEncoderTool() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState<string | null>(null);

  const handleEncode = useCallback(() => {
    const raw = input.trim();
    if (!raw) { setOutput(''); setError(null); return; }
    try {
      setOutput(encodeURIComponent(raw));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    const raw = input.trim();
    if (!raw) { setOutput(''); setError(null); return; }
    try {
      setOutput(decodeURIComponent(raw));
      setError(null);
    } catch {
      setError('Invalid percent-encoded string. Check for malformed sequences like %GG or incomplete %XX pairs.');
      setOutput('');
    }
  }, [input]);

  const handleClear = () => { setInput(''); setOutput(''); setError(null); };

  const inputStats  = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <div>
      <div className="action-bar">
        <button onClick={handleEncode} disabled={!input.trim()} className="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          Encode
        </button>
        <button onClick={handleDecode} disabled={!input.trim()} className="btn btn-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          Decode
        </button>
        <div className="action-bar-divider" />
        <CopyButton getValue={() => output} />
        <button onClick={handleClear} disabled={!input && !output} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          Clear
        </button>
      </div>

      {error && <ErrorBanner message="Decode Error" detail={error} />}

      <div className="editor-panels">
        <EditorPanel panelId="url-input" label="Input" lang="URL" indicatorColor="var(--brand-orange)" stats={inputStats}>
          <textarea
            id="url-input-textarea"
            className="panel-textarea"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(null); }}
            placeholder={"Paste a URL or text to encode…\n\nExample:\nhttps://example.com/search?q=hello world&lang=en"}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            aria-label="URL encoder input"
          />
        </EditorPanel>

        <EditorPanel panelId="url-output" label="Output" lang="ENCODED" badgeOk={!!output} badge={output ? 'ready' : undefined} stats={outputStats}>
          {output ? (
            <pre className="panel-pre" aria-label="URL encoder output">{output}</pre>
          ) : (
            <div className="panel-empty">
              <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <p className="panel-empty-text">Output will appear here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
