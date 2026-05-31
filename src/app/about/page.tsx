import type { Metadata } from 'next';
import Header from '@/components/site/Header';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'About Us — grepTools',
  description: 'Learn about grepTools, our mission to build fast, free, browser-based utilities, and our client-side processing architecture.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://greptools.dev/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="page-bg min-h-screen">
        <main className="page-main py-12 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
                About grepTools
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Fast, browser-based utilities for developers.
              </p>
            </div>

            {/* Content panels */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans select-text">
              {/* Mission Statement */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  Our Mission
                </h2>
                <p className="mb-4">
                  At grepTools, we build modern, simple, and high-performance utilities that fit seamlessly into your development workflow. 
                  Unlike many developer sites that are bloated with tracking cookies, email collection prompts, and heavy server-side operations, 
                  grepTools runs directly in your web browser.
                </p>
                <p>
                  Our goal is to remain a fast, lightweight companion that you keep pinned in your tabs to format JSON, 
                  convert timestamps, encode URLs, encode/decode Base64 strings, or generate cryptographically secure UUIDs.
                </p>
              </div>

              {/* Client-Side Architecture */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  Browser-Based Architecture
                </h2>
                <p className="mb-4">
                  To ensure maximum privacy and instant feedback, all utility functions execute locally inside your browser window. 
                  Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.
                </p>
                <p className="mb-4">
                  By leveraging native browser APIs (such as the standard JavaScript Web Cryptography API for UUID generation and 
                  Unicode-safe encoding routines), we bypass server latency and server logs entirely.
                </p>
                <p>
                  This means your confidential configuration settings, access keys, or JSON payloads never traverse the public 
                  network as part of our core tooling routines.
                </p>
              </div>

              {/* Indian Roots, Global Reach */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  India to the World
                </h2>
                <p className="mb-4">
                  grepTools is operated by [OWNER_NAME], an independent developer based in India. We design and package 
                  every utility to adhere to global specifications (RFC 4122 for UUIDs, ECMA-404 for JSON, etc.), 
                  helping developers across India, the US, Europe, and globally build better software.
                </p>
                <p>
                  Operation costs and developer hours are supported by non-obtrusive advertisements and donations. This allows 
                  us to maintain a completely free and accessible utility dashboard.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
