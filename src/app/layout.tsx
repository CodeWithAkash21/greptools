import type { Metadata } from 'next';
import Script from 'next/script';
import CookieConsent from '@/components/legal/CookieConsent';
import AnalyticsLoader from '@/components/legal/AnalyticsLoader';
import './globals.css';

export const metadata: Metadata = {
  title: 'grepTools — Free Browser-Based Developer Tools',
  description:
    'grepTools is a fast, privacy-first developer tools platform with 10 browser-based utilities: JSON formatter, Base64 encoder, URL encoder, UUID generator, Unix timestamp converter, JWT decoder, password generator, regex tester, YAML to JSON converter, and SQL formatter.',
  metadataBase: new URL('https://greptools.dev'),
  alternates: {
    canonical: 'https://greptools.dev',
  },
  openGraph: {
    title: 'grepTools — Free Browser-Based Developer Tools',
    description:
      'grepTools has 10 browser-based developer utilities: JSON, Base64, URL encoding, UUID, timestamps, JWT, passwords, regex, YAML, and SQL — all client-side, no signup, no data transmitted.',
    url: 'https://greptools.dev',
    siteName: 'grepTools',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'grepTools — Browser-Based Developer Utilities',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'grepTools — Free Browser-Based Developer Tools',
    description:
      'grepTools has 10 browser-based developer utilities: JSON, Base64, URL, UUID, timestamps, JWT, passwords, regex, YAML, and SQL. Free, no signup, client-side.',
    images: ['/og.png'],
    site: '@greptools',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Google Consent Mode Default Setup */}
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </head>
      <body>
        <AnalyticsLoader />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
