import React from 'react';
import Header from '@/components/site/Header';
import Breadcrumb from '@/components/site/Breadcrumb';
import AdSlot from '@/components/site/AdSlot';
import RelatedTools from '@/components/site/RelatedTools';
import ToolFAQ from '@/components/site/ToolFAQ';

interface RelatedTool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface FeatureChip {
  icon: string;
  text: string;
}

interface ToolShellProps {
  toolName: string;
  toolIcon: string;
  heading: string;
  intro: string;
  chips: FeatureChip[];
  breadcrumbLabel: string;
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
  aboutContent: React.ReactNode;
  children: React.ReactNode;
}

export default function ToolShell({
  toolName,
  toolIcon,
  heading,
  intro,
  chips,
  breadcrumbLabel,
  faqs,
  relatedTools,
  aboutContent,
  children,
}: ToolShellProps) {
  return (
    <>
      <Header />
      <div className="page-bg">
        <main className="page-main">

          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: breadcrumbLabel },
          ]} />

          {/* Top ad */}
          <div className="ad-wrapper">
            <AdSlot id={`ad-top-${toolName}`} label="Advertisement" height={90} />
          </div>

          {/* Page header */}
          <header className="tool-page-header">
            <div className="tool-title-row">
              <div className="tool-icon-badge">{toolIcon}</div>
              <h1 className="tool-heading">{heading}</h1>
            </div>
            <p className="tool-intro">{intro}</p>
            <div className="chip-row">
              {chips.map((chip) => (
                <span key={chip.text} className="chip">
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>
          </header>

          {/* Interactive tool */}
          <section aria-label={`${heading} Tool`} className="tool-section">
            {children}
          </section>

          {/* Below-tool ad */}
          <div className="ad-wrapper">
            <AdSlot id={`ad-below-${toolName}`} label="Advertisement" height={250} />
          </div>

          <RelatedTools tools={relatedTools} />

          <ToolFAQ items={faqs} />

          {/* About / SEO block */}
          <aside className="about-block">
            <h2 className="about-heading">About This Tool</h2>
            <div className="about-body">{aboutContent}</div>
          </aside>

        </main>
      </div>
    </>
  );
}
