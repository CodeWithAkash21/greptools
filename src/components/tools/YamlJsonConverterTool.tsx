'use client';

import { useState, useCallback } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

// ── Minimal YAML parser (no deps) ───────────────────────────────────────────
// Handles: scalars, sequences, mappings, multi-line blocks, quoted strings.
// Not a full YAML 1.2 parser – covers the 95% developer use-case.
function parseYaml(yaml: string): unknown {
  const lines = yaml.split('\n');
  let idx = 0;

  function peek(): string | undefined { return lines[idx]; }
  function consume(): string { return lines[idx++]; }

  function skipEmpty() {
    while (idx < lines.length) {
      const l = lines[idx];
      if (l === undefined || l.trim() === '' || l.trim().startsWith('#')) idx++;
      else break;
    }
  }

  function indent(line: string): number {
    let i = 0;
    while (i < line.length && line[i] === ' ') i++;
    return i;
  }

  function parseValue(raw: string): unknown {
    const v = raw.trim();
    if (v === 'null' || v === '~') return null;
    if (v === 'true')  return true;
    if (v === 'false') return false;
    if (/^-?\d+$/.test(v))          return parseInt(v, 10);
    if (/^-?\d*\.\d+$/.test(v))     return parseFloat(v);
    if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
    if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
    return v;
  }

  function parseBlock(baseIndent: number): unknown {
    skipEmpty();
    const line = peek();
    if (!line) return null;
    const ind = indent(line);
    if (ind < baseIndent) return null;

    // Sequence
    if (line.trim().startsWith('- ') || line.trim() === '-') {
      const arr: unknown[] = [];
      while (idx < lines.length) {
        skipEmpty();
        const cur = peek();
        if (!cur || indent(cur) < ind) break;
        if (!cur.trim().startsWith('-')) break;
        consume();
        const rest = cur.trim().slice(1).trim();
        if (rest === '') {
          arr.push(parseBlock(ind + 2));
        } else if (rest.includes(': ') || rest.endsWith(':')) {
          // inline mapping after -
          const obj: Record<string, unknown> = {};
          const [k, ...vparts] = rest.split(':');
          obj[k.trim()] = vparts.length ? parseValue(vparts.join(':')) : parseBlock(ind + 2);
          while (idx < lines.length) {
            skipEmpty();
            const next = peek();
            if (!next || indent(next) <= ind) break;
            const line2 = consume().trim();
            const ci = line2.indexOf(':');
            if (ci === -1) break;
            const key2 = line2.slice(0, ci).trim();
            const val2 = line2.slice(ci + 1).trim();
            obj[key2] = val2 === '' ? parseBlock(indent(next) + 2) : parseValue(val2);
          }
          arr.push(obj);
        } else {
          arr.push(parseValue(rest));
        }
      }
      return arr;
    }

    // Mapping
    if (line.includes(': ') || (line.trim().endsWith(':') && !line.trim().startsWith('-'))) {
      const obj: Record<string, unknown> = {};
      while (idx < lines.length) {
        skipEmpty();
        const cur = peek();
        if (!cur || indent(cur) < ind) break;
        consume();
        const trimmed = cur.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const ci = trimmed.indexOf(':');
        if (ci === -1) continue;
        const key = trimmed.slice(0, ci).trim();
        const rest2 = trimmed.slice(ci + 1).trim();
        if (rest2 === '' || rest2 === '|' || rest2 === '>') {
          obj[key] = parseBlock(ind + 2);
        } else {
          obj[key] = parseValue(rest2);
        }
      }
      return obj;
    }

    consume();
    return parseValue(line.trim());
  }

  const result = parseBlock(0);
  return result;
}

// ── Minimal JSON→YAML serializer ─────────────────────────────────────────────
function toYaml(val: unknown, indent = 0): string {
  const pad = ' '.repeat(indent);
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number')  return String(val);
  if (typeof val === 'string') {
    if (/[:#\[\]{}&*!|>'"%@`]/.test(val) || val.includes('\n') || val === '')
      return `"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    return val;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    return val.map((item) => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const rendered = toYaml(item, 0);
        const lines = rendered.split('\n');
        return `${pad}- ${lines[0]}\n${lines.slice(1).map(l => `${pad}  ${l}`).join('\n')}`.trimEnd();
      }
      const rendered = toYaml(item, indent + 2);
      return `${pad}- ${rendered}`;
    }).join('\n');
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => {
      if (typeof v === 'object' && v !== null) {
        return `${pad}${k}:\n${toYaml(v, indent + 2)}`;
      }
      return `${pad}${k}: ${toYaml(v, indent)}`;
    }).join('\n');
  }
  return String(val);
}

export default function YamlJsonConverterTool() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState<string | null>(null);
  const [mode, setMode]     = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');

  const convert = useCallback((raw: string, currentMode: typeof mode) => {
    if (!raw.trim()) { setOutput(''); setError(null); return; }
    try {
      if (currentMode === 'yaml-to-json') {
        const parsed = parseYaml(raw);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(raw);
        setOutput(toYaml(parsed));
      }
      setError(null);
    } catch (e) {
      setOutput('');
      setError((e as Error).message);
    }
  }, []);

  const handleModeChange = (m: typeof mode) => {
    setMode(m);
    convert(input, m);
  };

  const handleInput = (val: string) => {
    setInput(val);
    convert(val, mode);
  };

  const clear = () => { setInput(''); setOutput(''); setError(null); };

  const inputStats  = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <div>
      <div className="action-bar">
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-white/5">
          <button onClick={() => handleModeChange('yaml-to-json')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${mode === 'yaml-to-json' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
            YAML → JSON
          </button>
          <button onClick={() => handleModeChange('json-to-yaml')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${mode === 'json-to-yaml' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
            JSON → YAML
          </button>
        </div>
        <div className="action-bar-divider" />
        <CopyButton getValue={() => output} />
        <button onClick={clear} disabled={!input && !output} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
          </svg>
          Clear
        </button>
      </div>

      {error && <ErrorBanner message="Conversion Error" detail={error} />}

      <div className="editor-panels">
        <EditorPanel panelId="yaml-input-panel" label={mode === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
          lang={mode === 'yaml-to-json' ? 'YAML' : 'JSON'} indicatorColor="var(--brand-green)" stats={inputStats}>
          <textarea id="yaml-input" className="panel-textarea" value={input} onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === 'yaml-to-json'
              ? 'Paste YAML here…\n\nname: John Doe\nage: 30\nhobbies:\n  - coding\n  - reading'
              : 'Paste JSON here…\n\n{\n  "name": "John Doe",\n  "age": 30\n}'}
            spellCheck={false} autoComplete="off" autoCorrect="off"
            aria-label={mode === 'yaml-to-json' ? 'YAML input' : 'JSON input'} />
        </EditorPanel>

        <EditorPanel panelId="yaml-output-panel" label={mode === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
          lang={mode === 'yaml-to-json' ? 'JSON' : 'YAML'} badgeOk={!!output} badge={output ? 'converted' : undefined} stats={outputStats}>
          {output ? (
            <pre className="panel-pre" aria-label="Conversion output">{output}</pre>
          ) : (
            <div className="panel-empty">
              <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              <p className="panel-empty-text">Output will appear here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
