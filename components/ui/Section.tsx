import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="section-subtitle">{subtitle}</p>
          )}
        </header>

        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
