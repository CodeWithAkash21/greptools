interface FAQItem {
  q: string;
  a: string;
}

interface ToolFAQProps {
  items: FAQItem[];
}

export default function ToolFAQ({ items }: ToolFAQProps) {
  return (
    <section aria-labelledby="faq-heading" className="faq-section">
      <h2 id="faq-heading" className="section-heading">
        Frequently Asked Questions
      </h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-question">
              <span>{item.q}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="faq-chevron" aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="faq-answer">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
