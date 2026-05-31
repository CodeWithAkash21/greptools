'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function AnalyticsLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setShouldLoad(true);
    }

    // Listen for custom event when user clicks Accept on the banner
    const handleConsentChange = () => {
      const updatedConsent = localStorage.getItem('cookie-consent');
      if (updatedConsent === 'accepted') {
        setShouldLoad(true);
      }
    };

    window.addEventListener('cookie-consent-change', handleConsentChange);
    return () => {
      window.removeEventListener('cookie-consent-change', handleConsentChange);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
