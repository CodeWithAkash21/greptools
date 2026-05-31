'use client';

interface AdSlotProps {
  id: string;
  label?: string;
  className?: string;
  height?: number;
}

/**
 * AdSense-ready slot placeholder.
 * Replace the inner div content with your actual AdSense script tag once approved.
 * Slot sizes follow Google's recommended responsive units.
 */
export default function AdSlot({ id, label = 'Advertisement', className = '', height = 90 }: AdSlotProps) {
  return (
    <div
      id={id}
      className={className}
      aria-label={label}
      role="complementary"
      style={{
        width: '100%',
        minHeight: `${height}px`,
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border-subtle)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {/* 
        ↓ Replace this div with your AdSense <ins> tag when live:
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span
        style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </div>
  );
}
