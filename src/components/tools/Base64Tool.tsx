'use client';

import { useState, useCallback } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

function b64Encode(input: string): string {
  try {
    // encode UTF-8 safely
    return btoa(
      encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch {
    throw new Error('Encoding failed. Input contains unsupported characters.');
  }
}

function b64Decode(input: string): string {
  try {
    return decodeURIComponent(
      atob(input.trim())
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
  } catch {
    throw new Error('Invalid Base64 string. Ensure the input is correctly encoded.');
  }
}

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processText = useCallback((text: string, currentMode: 'encode' | 'decode') => {
    const raw = text.trim();
    if (!text) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      if (currentMode === 'encode') {
        setOutput(b64Encode(text));
      } else {
        setOutput(b64Decode(raw));
      }
      setError(null);
    } catch (e) {
      setOutput('');
      setError((e as Error).message);
    }
  }, []);

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    processText(input, newMode);
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    processText(val, mode);
  };

  const handleClear  = () => { setInput(''); setOutput(''); setError(null); };

  const inputStats  = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <div>
      {/* Action bar */}
      <div className="action-bar">
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => handleModeChange('encode')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'encode'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'decode'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Decode
          </button>
        </div>
        <div className="action-bar-divider" />
        <CopyButton getValue={() => output} />
        <button onClick={handleClear} disabled={!input && !output} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          Clear
        </button>
      </div>

      {error && <ErrorBanner message="Error" detail={error} />}

      <div className="editor-panels">
        <EditorPanel
          panelId="b64-input"
          label={mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          lang="TEXT"
          indicatorColor="var(--brand-green)"
          stats={inputStats}
        >
          <textarea
            id="b64-input-textarea"
            className="panel-textarea"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === 'encode' ? 'Paste text to encode…' : 'Paste Base64 to decode…'}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            aria-label="Base64 input"
          />
        </EditorPanel>

        <EditorPanel
          panelId="b64-output"
          label={mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
          lang={mode === 'encode' ? 'BASE64' : 'PLAIN'}
          badgeOk={!!output}
          badge={output ? 'ready' : undefined}
          stats={outputStats}
        >
          {output ? (
            <pre className="panel-pre" aria-label="Base64 output">{output}</pre>
          ) : (
            <div className="panel-empty">
              <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
              <p className="panel-empty-text">Output will appear here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
