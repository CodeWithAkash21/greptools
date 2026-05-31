import type { Metadata } from 'next';
import Header from '@/components/site/Header';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — grepTools',
  description: 'Privacy policy for grepTools.dev. Learn how we handle your data with local browser-side execution.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://greptools.dev/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="page-bg min-h-screen">
        <main className="page-main py-12 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Last updated: May 31, 2026
              </p>
            </div>

            {/* Legal content panels */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans select-text">
              {/* Introduction Card */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">01.</span> Introduction
                </h2>
                <p className="mb-4">
                  Welcome to <strong>grepTools</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible via 
                  <a href="https://greptools.dev" className="text-blue-400 hover:underline ml-1">https://greptools.dev</a>. 
                  We are operated by <strong>[OWNER_NAME]</strong>, based in India.
                </p>
                <p>
                  Your privacy is of paramount importance to us. We have built grepTools to be as privacy-respecting 
                  as possible: <strong>all utility calculations, text formatting, and conversions are executed entirely 
                  client-side in your web browser. No data you input into our tools is ever sent to our servers or stored.</strong>
                </p>
              </div>

              {/* Data We Collect */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">02.</span> Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">A. Tool Data Input (Zero Storage)</h3>
                    <p className="text-slate-400">
                      When you paste text, JSON, URLs, or any other data into our tools, it is processed locally 
                      using your browser&apos;s native resources. We do not store, copy, upload, or transmit any inputs 
                      or outputs to any server. Your inputs never leave your device.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">B. Analytical Usage Data</h3>
                    <p className="text-slate-400">
                      We use Google Analytics 4 (GA4) to compile aggregated, non-personally identifiable site-usage 
                      statistics (e.g., page views, session duration, and interface interactions). This service is only 
                      initialized if you explicitly grant permission via our Cookie Consent banner.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">C. Cookies</h3>
                    <p className="text-slate-400">
                      If you accept cookies, Google Analytics may set identifiers in your browser to record site interactions. 
                      You can manage your preferences or opt out at any time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Services */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">03.</span> Third-Party Integrations
                </h2>
                <p className="mb-4">
                  We integrate third-party services to analyze user traffic and fund development:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-4">
                  <li>
                    <strong>Google Analytics 4 (GA4):</strong> Analyzes site traffic patterns and user behavior. Runs 
                    in cookie-less mode or is fully disabled until you select &quot;Accept&quot; on our consent prompt.
                  </li>
                  <li>
                    <strong>Google AdSense:</strong> We display advertisements served by Google. Google uses cookies 
                    to serve ads based on your prior visits to this and other websites. You may opt out of personalized 
                    advertising by visiting Google&apos;s Ad Settings.
                  </li>
                </ul>
                <p>
                  These third parties have their own privacy policies governing their collection of logs and advertising 
                  identifiers. We encourage you to review Google&apos;s Partner Site Policy.
                </p>
              </div>

              {/* Global User Rights */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">04.</span> Global Privacy Rights
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">GDPR & UK GDPR Compliance</h3>
                    <p className="text-slate-400">
                      If you reside in the European Economic Area (EEA) or the United Kingdom, you have rights to access, 
                      rectify, or erase any personal data we hold. Since we collect zero personal inputs, the only personal 
                      data processed is through opt-in analytics cookies. You may revoke consent at any time.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-1">CCPA Compliance</h3>
                    <p className="text-slate-400">
                      If you are a California resident, you have the right to request disclosure of personal data collected, 
                      request deletion, and opt-out of the &quot;sale&quot; or &quot;sharing&quot; of personal information. We do 
                      not sell or rent your personal data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Info */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">05.</span> Governing Law & Contact Info
                </h2>
                <p className="mb-4">
                  This Privacy Policy and all disputes arising from it shall be governed by and construed in 
                  accordance with the laws of <strong>India</strong>, without regard to conflict of law principles.
                </p>
                <p className="mb-4">
                  If you have questions about this policy, please reach out to us at:
                </p>
                <div className="p-4 rounded bg-slate-900/60 border border-white/5 font-mono text-xs text-blue-400">
                  Email: [CONTACT_EMAIL]
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
