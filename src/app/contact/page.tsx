import type { Metadata } from 'next';
import Header from '@/components/site/Header';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Contact Us — grepTools',
  description: 'Get in touch with grepTools. Support, general feedback, and compliance inquiries.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://greptools.dev/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="page-bg min-h-screen">
        <main className="page-main py-12 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
                Contact Us
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Have questions or feedback? We&apos;d love to hear from you.
              </p>
            </div>

            {/* Content panels */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans select-text">
              {/* Contact Card */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  General & Support Inquiries
                </h2>
                <p className="mb-6">
                  For bug reports, feature suggestions, layout feedback, or inquiries regarding the site utilities, 
                  please contact us via email. We aim to respond to all developer queries within 48 business hours.
                </p>

                <div className="p-5 rounded-lg bg-slate-900/60 border border-white/5 space-y-3 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-slate-500 w-24">EMAIL:</span>
                    <a href="mailto:[CONTACT_EMAIL]" className="text-blue-400 hover:underline">[CONTACT_EMAIL]</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-slate-500 w-24">OPERATOR:</span>
                    <span className="text-slate-300">[OWNER_NAME]</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-slate-500 w-24">LOCATION:</span>
                    <span className="text-slate-300">India</span>
                  </div>
                </div>
              </div>

              {/* Compliance Card */}
              <div className="p-6 sm:p-8 rounded-xl bg-white/[0.015] border border-white/5 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-100 mb-4">
                  Privacy & Compliance
                </h2>
                <p className="mb-4">
                  Because grepTools does not collect, log, or persist inputs entered into the formatting or conversion boxes, 
                  we do not store personal utility data. 
                </p>
                <p>
                  If you have concerns related to cookie consents, analytics reporting, or advertising placements served on 
                  the site, please reach out to the contact email above, referencing &quot;Compliance&quot; in the subject line.
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
