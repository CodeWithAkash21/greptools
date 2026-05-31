import type { Metadata } from 'next';
import Header from '@/components/site/Header';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy — grepTools',
  description: 'Cookie policy for grepTools.dev. Understand how we use analytics cookies and how you can manage them.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://greptools.dev/cookies',
  },
};

export default function CookiePage() {
  return (
    <>
      <Header />
      <div className="page-bg min-h-screen">
        <main className="page-main py-12 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
                Cookie Policy
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Last updated: May 31, 2026
              </p>
            </div>

            {/* Legal content panels */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans select-text">
              {/* What Cookies Are */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">01.</span> What Are Cookies?
                </h2>
                <p className="mb-4">
                  Cookies are small text files stored on your computer or mobile device by your web browser when you visit 
                  certain websites. They are widely used to make websites work or perform more efficiently, as well as to 
                  provide analytical usage data to the site operators.
                </p>
                <p>
                  Cookies can be &quot;persistent&quot; (remaining on your device after you close your browser) or 
                  &quot;session-based&quot; (deleted when you close your browser).
                </p>
              </div>

              {/* Cookies We Use */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">02.</span> Cookies We Use
                </h2>
                <p className="mb-4">
                  At grepTools, we believe in minimizing tracking. We set <strong>zero cookies</strong> for the operation of 
                  our developer utility tools. The only cookies utilized are through Google Analytics 4 (GA4) for statistics 
                  and Google AdSense for displaying advertisements:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-200">
                        <th className="py-2 pr-4 font-semibold">Cookie Name</th>
                        <th className="py-2 px-4 font-semibold">Provider</th>
                        <th className="py-2 px-4 font-semibold">Purpose</th>
                        <th className="py-2 pl-4 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-400">
                      <tr>
                        <td className="py-3 pr-4 font-mono font-medium text-slate-300">_ga</td>
                        <td className="py-3 px-4">Google Analytics</td>
                        <td className="py-3 px-4">Used to distinguish unique users for aggregated visitor reports.</td>
                        <td className="py-3 pl-4">2 years</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono font-medium text-slate-300">_ga_XXXXXXXXXX</td>
                        <td className="py-3 px-4">Google Analytics</td>
                        <td className="py-3 px-4">Used to maintain session state for analytics.</td>
                        <td className="py-3 pl-4">2 years</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono font-medium text-slate-300">__gads / __gpi</td>
                        <td className="py-3 px-4">Google AdSense</td>
                        <td className="py-3 px-4">Used to serve and measure advertising campaigns on the site.</td>
                        <td className="py-3 pl-4">13 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Opt-out / Consent management */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-blue-400 font-mono">03.</span> Managing Your Cookie Consent
                </h2>
                <p className="mb-4">
                  We seek your consent before initializing any non-essential cookies. You can control cookies in the 
                  following ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-4">
                  <li>
                    <strong>Consent Banner:</strong> Click &quot;Decline&quot; on our cookie banner at the bottom of the 
                    screen to prevent Google Analytics from initializing analytics cookies.
                  </li>
                  <li>
                    <strong>Browser Settings:</strong> You can configure your browser to reject cookies or warn you 
                    when cookies are set. Refer to your browser&apos;s &quot;Help&quot; menu.
                  </li>
                  <li>
                    <strong>Google Analytics Add-on:</strong> You can install the 
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:underline mx-1"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a> 
                    to block analytics across all websites you visit.
                  </li>
                </ul>
                <p>
                  To learn more about how Google handles user data in its advertising network, consult the 
                  <a 
                    href="https://policies.google.com/technologies/ads" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Google Advertising Privacy Policy
                  </a>.
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
