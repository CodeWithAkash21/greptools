interface ErrorBannerProps {
  message: string;
  detail?: string;
  location?: { line: number; col: number };
}

export default function ErrorBanner({ message, detail, location }: ErrorBannerProps) {
  return (
    <div role="alert" aria-live="polite" className="error-banner">
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className="error-icon" aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className="error-body">
        <p className="error-title">
          {message}
          {location && (
            <span className="error-location">
              line {location.line}, col {location.col}
            </span>
          )}
        </p>
        {detail && <p className="error-detail">{detail}</p>}
      </div>
    </div>
  );
}
