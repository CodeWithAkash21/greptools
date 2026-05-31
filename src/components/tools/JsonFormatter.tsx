'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

interface ParseError {
  message: string;
  line?: number;
  col?: number;
}

function parseJSON(raw: string): { ok: true; parsed: unknown } | { ok: false; error: ParseError } {
  try {
    return { ok: true, parsed: JSON.parse(raw) };
  } catch (err) {
    const msg = (err as Error).message;
    const posMatch = msg.match(/at position (\d+)/);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const before = raw.slice(0, pos);
      const line = before.split('\n').length;
      const col = pos - before.lastIndexOf('\n');
      return { ok: false, error: { message: msg, line, col } };
    }
    const lcMatch = msg.match(/line (\d+) column (\d+)/i);
    if (lcMatch) return { ok: false, error: { message: msg, line: +lcMatch[1], col: +lcMatch[2] } };
    return { ok: false, error: { message: msg } };
  }
}

function syntaxHighlight(json: string): string {
  const escaped = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}\[\],]|:)/g,
    (match) => {
      let cls = 'token-punctuation';
      if (/^"/.test(match))       cls = /:$/.test(match) ? 'token-key' : 'token-string';
      else if (/true|false/.test(match)) cls = 'token-boolean';
      else if (/null/.test(match)) cls = 'token-null';
      else if (/^-?\d/.test(match)) cls = 'token-number';
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export default function JsonFormatter() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [highlighted, setHighlighted] = useState('');
  const [error, setError]   = useState<ParseError | null>(null);
  const [isFormatted, setIsFormatted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const inputStats  = getTextStats(input);
  const outputStats = getTextStats(output);

  const handleInput = useCallback((val: string) => {
    setInput(val);
    setError(null);
    setOutput('');
    setHighlighted('');
    setIsFormatted(false);
    if (val.trim().length > 2) {
      const result = parseJSON(val.trim());
      if (!result.ok) setError(result.error);
    }
  }, []);

  const format = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;
    const result = parseJSON(raw);
    if (!result.ok) { setError(result.error); setOutput(''); setHighlighted(''); return; }
    const formatted = JSON.stringify(result.parsed, null, 2);
    setOutput(formatted);
    setHighlighted(syntaxHighlight(formatted));
    setError(null);
    setIsFormatted(true);
  }, [input]);

  const minify = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;
    const result = parseJSON(raw);
    if (!result.ok) { setError(result.error); setOutput(''); setHighlighted(''); return; }
    const minified = JSON.stringify(result.parsed);
    setOutput(minified);
    setHighlighted(syntaxHighlight(minified));
    setError(null);
    setIsFormatted(true);
  }, [input]);

  const clear = useCallback(() => {
    setInput(''); setOutput(''); setHighlighted('');
    setError(null); setIsFormatted(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); format(); }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'm') { e.preventDefault(); minify(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [format, minify]);

  return (
    <div>
      {/* Action bar */}
      <div className="action-bar">
        <button onClick={format} disabled={!input.trim()} className="btn btn-primary" title="Format JSON (Ctrl+Enter)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>
          Format
        </button>
        <button onClick={minify} disabled={!input.trim()} className="btn btn-secondary" title="Minify JSON (Ctrl+Shift+M)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          Minify
        </button>
        <div className="action-bar-divider" />
        <CopyButton getValue={() => output} />
        <button onClick={clear} disabled={!input && !output} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          Clear
        </button>
        <div className="action-bar-hints">
          <span className="hint-text"><kbd className="hint-kbd">⌃↵</kbd> Format</span>
          <span className="hint-text"><kbd className="hint-kbd">⌃⇧M</kbd> Minify</span>
        </div>
      </div>

      {error && (
        <ErrorBanner
          message="Invalid JSON"
          detail={error.message}
          location={error.line && error.col ? { line: error.line, col: error.col } : undefined}
        />
      )}

      <div className="editor-panels">
        <EditorPanel
          panelId="json-input-panel"
          label="Input"
          lang="JSON"
          indicatorColor="var(--brand-green)"
          stats={inputStats}
        >
          <textarea
            ref={inputRef}
            id="json-input"
            className="panel-textarea"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={'Paste your JSON here…\n\n{\n  "example": true\n}'}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="JSON input"
          />
        </EditorPanel>

        <EditorPanel
          panelId="json-output-panel"
          label="Output"
          lang="JSON"
          badgeOk={isFormatted}
          badge={isFormatted ? 'valid' : undefined}
          stats={outputStats}
        >
          {output ? (
            <pre
              className="panel-pre"
              aria-label="Formatted JSON output"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          ) : (
            <div className="panel-empty">
              <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p className="panel-empty-text">Output will appear here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
