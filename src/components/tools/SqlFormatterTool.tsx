'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { EditorPanel, getTextStats } from '@/components/tools/EditorPanel';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

const SQL_KEYWORDS = [
  'SELECT','FROM','WHERE','JOIN','LEFT','RIGHT','INNER','OUTER','FULL','CROSS',
  'ON','AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','AS','DISTINCT',
  'ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','UNION','ALL','EXCEPT','INTERSECT',
  'INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','ALTER','DROP',
  'INDEX','VIEW','TRIGGER','PROCEDURE','FUNCTION','DATABASE','SCHEMA','IF','EXISTS',
  'PRIMARY','KEY','FOREIGN','REFERENCES','UNIQUE','DEFAULT','CHECK','CONSTRAINT',
  'WITH','CASE','WHEN','THEN','ELSE','END','CAST','COALESCE','NULLIF','COUNT',
  'SUM','AVG','MIN','MAX','CONCAT','SUBSTRING','TRIM','UPPER','LOWER','LENGTH',
  'ROUND','NOW','DATE','TIMESTAMP','INTERVAL','TRUE','FALSE','ASC','DESC',
  'RETURNING','EXPLAIN','ANALYZE','VACUUM','TRUNCATE','BEGIN','COMMIT','ROLLBACK',
  'TRANSACTION','SAVEPOINT','RELEASE','LOCK','UNLOCK',
];

const KW_SET = new Set(SQL_KEYWORDS);

interface SqlToken {
  type: 'keyword' | 'word' | 'string' | 'identifier' | 'operator' | 'comma' | 'semicolon' | 'open_paren' | 'close_paren' | 'comment' | 'other';
  value: string;
}

function formatSQL(raw: string): string {
  // Tokenize preserving strings and comments
  const rawTokens: SqlToken[] = [];
  let i = 0;
  while (i < raw.length) {
    // Single-line comment
    if (raw[i] === '-' && raw[i+1] === '-') {
      let end = raw.indexOf('\n', i);
      if (end === -1) end = raw.length;
      rawTokens.push({ type: 'comment', value: raw.slice(i, end) });
      i = end;
      continue;
    }
    // Block comment
    if (raw[i] === '/' && raw[i+1] === '*') {
      const end = raw.indexOf('*/', i + 2);
      const val = end === -1 ? raw.slice(i) : raw.slice(i, end + 2);
      rawTokens.push({ type: 'comment', value: val });
      i = end === -1 ? raw.length : end + 2;
      continue;
    }
    // String literal (single quote)
    if (raw[i] === "'") {
      let j = i + 1;
      while (j < raw.length) {
        if (raw[j] === "'" && raw[j+1] === "'") { j += 2; continue; }
        if (raw[j] === "'") { j++; break; }
        j++;
      }
      rawTokens.push({ type: 'string', value: raw.slice(i, j) });
      i = j;
      continue;
    }
    // Double-quoted identifier
    if (raw[i] === '"') {
      let j = i + 1;
      while (j < raw.length && raw[j] !== '"') j++;
      rawTokens.push({ type: 'identifier', value: raw.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // Backtick identifier
    if (raw[i] === '`') {
      let j = i + 1;
      while (j < raw.length && raw[j] !== '`') j++;
      rawTokens.push({ type: 'identifier', value: raw.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // Whitespace
    if (/\s/.test(raw[i])) {
      i++;
      while (i < raw.length && /\s/.test(raw[i])) i++;
      continue;
    }
    // Comma
    if (raw[i] === ',') { rawTokens.push({ type: 'comma', value: ',' }); i++; continue; }
    // Semicolon
    if (raw[i] === ';') { rawTokens.push({ type: 'semicolon', value: ';' }); i++; continue; }
    // Open paren
    if (raw[i] === '(') { rawTokens.push({ type: 'open_paren', value: '(' }); i++; continue; }
    // Close paren
    if (raw[i] === ')') { rawTokens.push({ type: 'close_paren', value: ')' }); i++; continue; }
    // Multi-char operators like >=, <=, <>, !=
    if ((raw[i] === '>' || raw[i] === '<' || raw[i] === '!' || raw[i] === '=') && 
        (raw[i+1] === '=' || raw[i+1] === '>')) {
      rawTokens.push({ type: 'operator', value: raw.slice(i, i + 2) });
      i += 2;
      continue;
    }
    // Operator
    if ('=><!+-*/%&|^~'.includes(raw[i])) {
      rawTokens.push({ type: 'operator', value: raw[i] });
      i++;
      continue;
    }
    // Word
    let j = i;
    while (j < raw.length && /[a-zA-Z0-9_.$]/.test(raw[j])) j++;
    if (j > i) {
      const val = raw.slice(i, j);
      const upper = val.toUpperCase();
      rawTokens.push({
        type: KW_SET.has(upper) ? 'keyword' : 'word',
        value: KW_SET.has(upper) ? upper : val
      });
      i = j;
      continue;
    }
    // Other char
    rawTokens.push({ type: 'other', value: raw[i] }); i++;
  }

  // Pre-process keywords for multi-word keywords
  const tokens: SqlToken[] = [];
  for (let t = 0; t < rawTokens.length; t++) {
    const cur = rawTokens[t];
    const next = rawTokens[t + 1];
    if (cur.type === 'keyword' && next && next.type === 'keyword') {
      const combined = `${cur.value} ${next.value}`;
      if (combined === 'GROUP BY' || combined === 'ORDER BY' || combined === 'LEFT JOIN' || 
          combined === 'RIGHT JOIN' || combined === 'INNER JOIN' || combined === 'OUTER JOIN' || 
          combined === 'CROSS JOIN' || combined === 'CREATE TABLE' || combined === 'DROP TABLE' ||
          combined === 'INSERT INTO' || combined === 'DELETE FROM') {
        tokens.push({ type: 'keyword', value: combined });
        t++; // skip next
        continue;
      }
    }
    tokens.push(cur);
  }

  // Identify matching parentheses and check if they contain subqueries
  const stack: number[] = [];
  const parenMeta = new Map<number, { partner: number; isMultiline: boolean }>();
  
  for (let t = 0; t < tokens.length; t++) {
    if (tokens[t].type === 'open_paren') {
      stack.push(t);
    } else if (tokens[t].type === 'close_paren') {
      const openIdx = stack.pop();
      if (openIdx !== undefined) {
        let isMultiline = false;
        for (let k = openIdx + 1; k < t; k++) {
          if (tokens[k].type === 'keyword' && ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE'].includes(tokens[k].value)) {
            isMultiline = true;
            break;
          }
        }
        parenMeta.set(openIdx, { partner: t, isMultiline });
        parenMeta.set(t, { partner: openIdx, isMultiline });
      }
    }
  }

  // Formatting rules
  const NEWLINE_KEYWORDS = new Set([
    'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'LIMIT', 'OFFSET',
    'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN',
    'UNION', 'EXCEPT', 'INTERSECT', 'VALUES', 'SET', 'HAVING', 'RETURNING'
  ]);

  const LINE_BREAK_KEYWORDS = new Set(['AND', 'OR']);

  let out = '';
  let depth = 0;

  const pad = () => '  '.repeat(depth);

  for (let t = 0; t < tokens.length; t++) {
    const tok = tokens[t];
    const next = tokens[t + 1];

    const meta = parenMeta.get(t);

    if (tok.type === 'open_paren') {
      if (meta && meta.isMultiline) {
        out += '(\n';
        depth++;
        out += pad();
      } else {
        out += '(';
      }
      continue;
    }
    if (tok.type === 'close_paren') {
      if (meta && meta.isMultiline) {
        depth = Math.max(0, depth - 1);
        out = out.trimEnd();
        out += '\n' + pad() + ')';
      } else {
        out += ')';
      }
      if (next && (next.type === 'word' || next.type === 'keyword' || next.type === 'string' || next.type === 'identifier' || next.type === 'operator' || next.type === 'comment')) {
        out += ' ';
      }
      continue;
    }
    if (tok.type === 'comma') {
      out = out.trimEnd();
      let insideMultiline = false;
      for (let k = t - 1; k >= 0; k--) {
        if (tokens[k].type === 'open_paren') {
          const m = parenMeta.get(k);
          if (m && m.partner > t && m.isMultiline) {
            insideMultiline = true;
            break;
          }
        }
      }
      
      if (depth > 0 && !insideMultiline) {
        out += ', ';
      } else {
        out += ',\n' + pad();
      }
      continue;
    }
    if (tok.type === 'semicolon') {
      out = out.trimEnd();
      out += ';\n';
      continue;
    }

    if (tok.type === 'keyword' && NEWLINE_KEYWORDS.has(tok.value)) {
      out = out.trimEnd();
      out += '\n' + pad() + tok.value + ' ';
      continue;
    }

    if (tok.type === 'keyword' && LINE_BREAK_KEYWORDS.has(tok.value)) {
      out = out.trimEnd();
      out += '\n' + pad() + '  ' + tok.value + ' ';
      continue;
    }

    if (tok.type === 'comment') {
      out += tok.value;
      if (tok.value.startsWith('--')) {
        out += '\n' + pad();
      } else {
        out += ' ';
      }
      continue;
    }

    // Default spacing behavior
    out += tok.value;

    // Add space between tokens
    if (next) {
      const needSpace = 
        (
          (tok.type === 'word' || tok.type === 'keyword' || tok.type === 'string' || tok.type === 'identifier') &&
          (next.type === 'word' || next.type === 'keyword' || next.type === 'string' || next.type === 'identifier' || next.type === 'operator' || next.type === 'comment')
        ) ||
        (
          tok.type === 'keyword' && next.type === 'open_paren' && 
          !['COUNT','SUM','AVG','MIN','MAX','CONCAT','SUBSTRING','TRIM','UPPER','LOWER','LENGTH','ROUND','COALESCE','NULLIF','NOW','DATE','TIMESTAMP'].includes(tok.value)
        );

      const opSpace = 
        (tok.type === 'operator' && next.type !== 'comma' && next.type !== 'semicolon' && next.type !== 'close_paren') ||
        (next.type === 'operator');

      if (needSpace || opSpace) {
        out += ' ';
      }
    }
  }

  return out.trim().replace(/\n{3,}/g, '\n\n');
}

export default function SqlFormatterTool() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const format = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;
    try {
      const result = formatSQL(raw);
      setOutput(result);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input]);

  const clear = () => { setInput(''); setOutput(''); setError(null); inputRef.current?.focus(); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); format(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [format]);

  const inputStats  = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <div>
      <div className="action-bar">
        <button onClick={format} disabled={!input.trim()} className="btn btn-primary" title="Format SQL (Ctrl+Enter)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>
          </svg>
          Format SQL
        </button>
        <div className="action-bar-divider" />
        <CopyButton getValue={() => output} />
        <button onClick={clear} disabled={!input && !output} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
          </svg>
          Clear
        </button>
        <div className="action-bar-hints">
          <span className="hint-text"><kbd className="hint-kbd">⌃↵</kbd> Format</span>
        </div>
      </div>

      {error && <ErrorBanner message="Format Error" detail={error} />}

      <div className="editor-panels">
        <EditorPanel panelId="sql-input-panel" label="SQL Input" lang="SQL"
          indicatorColor="var(--brand-green)" stats={inputStats}>
          <textarea ref={inputRef} id="sql-input" className="panel-textarea" value={input}
            onChange={(e) => { setInput(e.target.value); setError(null); }}
            placeholder={'Paste your SQL query here…\n\nSELECT u.id, u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = true GROUP BY u.id ORDER BY order_count DESC LIMIT 10;'}
            spellCheck={false} autoComplete="off" autoCorrect="off" aria-label="SQL input" />
        </EditorPanel>

        <EditorPanel panelId="sql-output-panel" label="Formatted SQL" lang="SQL"
          badgeOk={!!output} badge={output ? 'formatted' : undefined} stats={outputStats}>
          {output ? (
            <pre className="panel-pre" aria-label="Formatted SQL output">{output}</pre>
          ) : (
            <div className="panel-empty">
              <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              <p className="panel-empty-text">Formatted SQL will appear here</p>
            </div>
          )}
        </EditorPanel>
      </div>
    </div>
  );
}
