interface TextStats {
  chars: number;
  lines: number;
}

interface PanelStatsBarProps {
  stats: TextStats;
  label: string;
  badge?: string;
  badgeOk?: boolean;
}

export function getTextStats(text: string): TextStats {
  if (!text) return { chars: 0, lines: 0 };
  return { chars: text.length, lines: text.split('\n').length };
}

export function PanelStatsBar({ stats, label, badge, badgeOk }: PanelStatsBarProps) {
  return (
    <div className="panel-stats-bar">
      <span className="panel-stats-label">{label}</span>
      <span className="panel-stat">
        <span className="panel-stat-val">{stats.chars.toLocaleString()}</span> chars
      </span>
      <span className="panel-stat">
        <span className="panel-stat-val">{stats.lines.toLocaleString()}</span> lines
      </span>
      {badge && (
        <span className={`panel-badge ${badgeOk ? 'panel-badge-ok' : 'panel-badge-muted'}`}>
          {badge}
        </span>
      )}
    </div>
  );
}

interface EditorPanelProps {
  panelId: string;
  label: string;
  lang?: string;
  indicatorColor?: string;
  badge?: string;
  badgeOk?: boolean;
  stats: TextStats;
  children: React.ReactNode;
}

export function EditorPanel({ panelId, label, lang, indicatorColor, badge, badgeOk, stats, children }: EditorPanelProps) {
  return (
    <div className={`editor-panel ${badgeOk ? 'editor-panel-active' : ''}`} id={panelId}>
      <div className="panel-header">
        <div className="panel-header-left">
          <span
            className="panel-indicator"
            style={{ backgroundColor: indicatorColor ?? (badgeOk ? 'var(--brand-blue)' : 'var(--text-muted)') }}
          />
          <span className="panel-label">{label}</span>
        </div>
        {lang && <span className="panel-lang">{badge && badgeOk ? <span className="panel-valid">valid ✓</span> : lang}</span>}
      </div>
      <div className="panel-content">{children}</div>
      <PanelStatsBar stats={stats} label={`${label}:`} badge={badge} badgeOk={badgeOk} />
    </div>
  );
}
