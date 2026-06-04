'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/site/CopyButton';
import ErrorBanner from '@/components/site/ErrorBanner';

interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = padded.length % 4;
  const padded2 = padding ? padded + '='.repeat(4 - padding) : padded;
  return decodeURIComponent(
    atob(padded2)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT: expected 3 parts separated by dots.');
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return { header, payload, signature: parts[2] };
  } catch {
    throw new Error('Failed to decode JWT. Ensure the token is valid Base64URL encoded JSON.');
  }
}

function formatDate(epoch: number): string {
  return new Date(epoch * 1000).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short',
  });
}

function isExpired(payload: Record<string, unknown>): boolean | null {
  if (typeof payload.exp !== 'number') return null;
  return Date.now() / 1000 > payload.exp;
}

export default function JwtDecoderTool() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'payload' | 'header' | 'signature'>('payload');

  const handleDecode = useCallback((value: string) => {
    setToken(value);
    if (!value.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }
    try {
      const result = decodeJwt(value);
      setDecoded(result);
      setError(null);
    } catch (e) {
      setDecoded(null);
      setError((e as Error).message);
    }
  }, []);

  const clear = () => { setToken(''); setDecoded(null); setError(null); };

  const expired = decoded ? isExpired(decoded.payload) : null;
  const payload = decoded?.payload ?? {};
  const header = decoded?.header ?? {};

  const activeJson = activeTab === 'payload'
    ? JSON.stringify(payload, null, 2)
    : activeTab === 'header'
    ? JSON.stringify(header, null, 2)
    : decoded?.signature ?? '';

  return (
    <div>
      {/* Action bar */}
      <div className="action-bar">
        <CopyButton getValue={() => activeJson} label="Copy JSON" />
        <button onClick={clear} disabled={!token} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
          </svg>
          Clear
        </button>
        {decoded && expired === false && (
          <span className="jwt-badge jwt-badge-valid">✓ Valid Token</span>
        )}
        {decoded && expired === true && (
          <span className="jwt-badge jwt-badge-expired">⚠ Expired</span>
        )}
      </div>

      {error && <ErrorBanner message="Invalid JWT" detail={error} />}

      <div className="jwt-layout">
        {/* Input */}
        <div className="editor-panel">
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-indicator" style={{ backgroundColor: 'var(--brand-orange)' }} />
              <span className="panel-label">JWT Token Input</span>
            </div>
            <span className="panel-lang">JWT</span>
          </div>
          <div className="panel-content">
            <textarea
              id="jwt-input"
              className="panel-textarea"
              value={token}
              onChange={(e) => handleDecode(e.target.value)}
              placeholder={'Paste your JWT token here…\n\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-label="JWT token input"
            />
          </div>
          <div className="panel-stats-bar">
            <span className="panel-stats-label">Input:</span>
            <span className="panel-stat">
              <span className="panel-stat-val">{token.length.toLocaleString()}</span> chars
            </span>
          </div>
        </div>

        {/* Output */}
        <div className="jwt-output-col">
          {decoded ? (
            <>
              {/* Meta info cards */}
              {(payload.iat || payload.exp || payload.sub || payload.iss) && (
                <div className="jwt-meta-grid">
                  {!!payload.sub && (
                    <div className="jwt-meta-card">
                      <div className="jwt-meta-label">Subject</div>
                      <div className="jwt-meta-val">{String(payload.sub)}</div>
                    </div>
                  )}
                  {!!payload.iss && (
                    <div className="jwt-meta-card">
                      <div className="jwt-meta-label">Issuer</div>
                      <div className="jwt-meta-val">{String(payload.iss)}</div>
                    </div>
                  )}
                  {typeof payload.iat === 'number' && (
                    <div className="jwt-meta-card">
                      <div className="jwt-meta-label">Issued At</div>
                      <div className="jwt-meta-val">{formatDate(payload.iat)}</div>
                    </div>
                  )}
                  {typeof payload.exp === 'number' && (
                    <div className="jwt-meta-card">
                      <div className="jwt-meta-label">Expires At</div>
                      <div className={`jwt-meta-val ${expired ? 'jwt-expired-text' : 'jwt-valid-text'}`}>
                        {formatDate(payload.exp)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab switcher */}
              <div className="jwt-tabs">
                {(['payload', 'header', 'signature'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`jwt-tab-btn ${activeTab === tab ? 'jwt-tab-btn-active' : ''}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* JSON output */}
              <div className="editor-panel editor-panel-active">
                <div className="panel-header">
                  <div className="panel-header-left">
                    <span className="panel-indicator" style={{ backgroundColor: 'var(--brand-blue)' }} />
                    <span className="panel-label">
                      {activeTab === 'payload' ? 'Payload' : activeTab === 'header' ? 'Header' : 'Signature'}
                    </span>
                  </div>
                  <span className="panel-lang"><span className="panel-valid">decoded ✓</span></span>
                </div>
                <div className="panel-content">
                  <pre className="panel-pre" style={{ minHeight: activeTab === 'signature' ? 80 : 280 }}>
                    {activeJson}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="editor-panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <span className="panel-indicator" />
                  <span className="panel-label">Decoded Output</span>
                </div>
              </div>
              <div className="panel-content">
                <div className="panel-empty">
                  <svg className="panel-empty-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <p className="panel-empty-text">Paste a JWT token to decode it</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
