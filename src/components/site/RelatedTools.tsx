import Link from 'next/link';

interface RelatedTool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section aria-labelledby="related-tools-heading" className="related-tools-section">
      <h2 id="related-tools-heading" className="section-heading">
        Related Tools
      </h2>
      <div className="related-tools-grid">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="related-tool-card">
            <div className="related-tool-icon">{tool.icon}</div>
            <div>
              <div className="related-tool-name">{tool.name}</div>
              <div className="related-tool-desc">{tool.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
