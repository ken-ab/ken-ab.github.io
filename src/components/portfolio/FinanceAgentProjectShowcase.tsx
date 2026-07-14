import { Braces, Code2 } from "lucide-react";
import type { AgentSystemProjectShowcase } from "../../data/portfolio";
import { FinanceAgentSystemMap } from "../finance/FinanceAgentSystemMap";

type FinanceAgentProjectShowcaseProps = {
  showcase: AgentSystemProjectShowcase;
  title: string;
};

export function FinanceAgentProjectShowcase({ showcase, title }: FinanceAgentProjectShowcaseProps) {
  return (
    <section className="finance-project-showcase" aria-label={`${title} system preview`}>
      <div className="finance-showcase-heading">
        <div>
          <span className="finance-source-dot" aria-hidden="true" />
          <strong>{showcase.status}</strong>
        </div>
        <span><Code2 aria-hidden="true" size={14} /> ken-ab/Finance-Agent</span>
      </div>

      <FinanceAgentSystemMap
        agents={showcase.agents}
        compact
        query={showcase.query}
        toolFamilies={showcase.toolFamilies}
      />

      <div className="finance-showcase-footer">
        <dl className="finance-showcase-facts">
          {showcase.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
        <div className="finance-report-ribbon">
          <Braces aria-hidden="true" size={18} />
          <span>Structured output</span>
          <strong>{showcase.reportSections.join(" · ")}</strong>
        </div>
      </div>
    </section>
  );
}
