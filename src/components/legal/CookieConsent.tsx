'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      triggerConsentUpdate('granted');
    } else {
      triggerConsentUpdate('denied');
    }
  }, []);

  const triggerConsentUpdate = (status: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    triggerConsentUpdate('granted');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookie-consent-change'));
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    triggerConsentUpdate('denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-[100] p-5 rounded-xl bg-[#0e1424]/90 border border-white/5 shadow-2xl backdrop-blur-md animate-fade-in font-sans text-xs">
      <div className="text-slate-200 leading-relaxed mb-4">
        We use cookies to analyze site usage via Google Analytics. No personal data from our tools is ever collected or stored. 
        Read our{' '}
        <Link href="/cookies" className="text-blue-400 hover:underline">
          Cookie Policy
        </Link>{' '}
        for details.
      </div>
      <div className="flex items-center justify-end gap-3 font-semibold">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 rounded bg-transparent border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-slate-100 shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-all duration-200 cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
