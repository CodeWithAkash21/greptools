interface AdSlotProps {
  id: string;
  label?: string;
  height?: number;
}

/**
 * AdSense-ready slot placeholder.
 * Replace the inner comment section with your actual <ins> AdSense tag.
 */
export default function AdSlot({ id, label = 'Advertisement', height = 90 }: AdSlotProps) {
  return (
    <div
      id={id}
      className="ad-slot"
      aria-label={label}
      role="complementary"
      style={{ minHeight: `${height}px` }}
    >
      {/*
        Replace this with your AdSense <ins> tag:
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span className="ad-label">{label}</span>
    </div>
  );
}
