import {
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Layers3,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import type { AgentProjectCaseStudy } from "../../data/caseStudies";
import { ActionButton } from "../portfolio/ActionButton";
import { FinanceAgentSystemMap } from "../finance/FinanceAgentSystemMap";

export function FinanceAgentDetail({ study }: { study: AgentProjectCaseStudy }) {
  const agents = ["Fundamental", "Technical", "Valuation", "News"];
  const toolFamilies = study.toolFamilies ?? [];
  const reportSections = study.reportSections ?? [];

  return (
    <>
      <section className="finance-detail-hero">
        <div className="finance-detail-copy">
          <p className="finance-detail-keywords">{study.keywords?.join(" · ")}</p>
          <span className="finance-detail-status"><i aria-hidden="true" /> source-backed system brief</span>
          <h1>{study.title}</h1>
          <p>{study.subtitle}</p>
          {study.githubUrl ? (
            <div className="finance-detail-actions">
              <ActionButton external href={study.githubUrl} variant="primary">
                <Code2 aria-hidden="true" size={17} /> GitHub
              </ActionButton>
            </div>
          ) : null}
        </div>

        <aside className="finance-detail-meta">
          <span>{study.period}</span>
          <strong>{study.role}</strong>
          <p>{study.oneLineSummary}</p>
        </aside>
      </section>

      <section className="finance-fact-strip" aria-label="Verified Finance-Agent facts">
        {study.facts?.map((fact, index) => (
          <article key={fact.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{fact.value}</strong>
            <div>
              <h2>{fact.label}</h2>
              <p>{fact.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="finance-architecture-section" aria-labelledby="finance-architecture-title">
        <header className="finance-section-heading">
          <div>
            <p className="section-eyebrow">System Architecture</p>
            <h2 id="finance-architecture-title">One query, four perspectives, one inspected report</h2>
          </div>
          <p>The graph keeps each analytical role visible, then routes incomplete reports through one bounded reflection round.</p>
        </header>

        <FinanceAgentSystemMap agents={agents} toolFamilies={toolFamilies} />
      </section>

      <section className="finance-tools-section" aria-labelledby="finance-tools-title">
        <header className="finance-section-heading is-compact">
          <div>
            <p className="section-eyebrow">MCP Capability Surface</p>
            <h2 id="finance-tools-title">Eight registered tool families</h2>
          </div>
          <p>Each family is present in the repository tool registration layer; this is a capability map, not a performance claim.</p>
        </header>
        <div className="finance-tool-grid">
          {toolFamilies.map((tool, index) => (
            <article key={tool}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {index % 3 === 0 ? <Database aria-hidden="true" size={20} /> : index % 3 === 1 ? <Layers3 aria-hidden="true" size={20} /> : <Code2 aria-hidden="true" size={20} />}
              <strong>{tool}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="finance-output-section" aria-labelledby="finance-output-title">
        <div className="finance-markdown-sheet">
          <header>
            <div>
              <FileText aria-hidden="true" size={20} />
              <span>ILLUSTRATIVE OUTPUT STRUCTURE</span>
            </div>
            <small>Markdown / no fabricated investment result</small>
          </header>
          <div className="finance-markdown-body">
            <span className="finance-md-h1"># A-share Company Analysis</span>
            {reportSections.map((section, index) => (
              <div className="finance-md-section" key={section}>
                <strong>## {section}</strong>
                <i style={{ width: `${82 - (index % 3) * 11}%` }} />
                <i style={{ width: `${61 + (index % 2) * 17}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="finance-output-copy">
          <p className="section-eyebrow">Evaluation & Reflection</p>
          <h2 id="finance-output-title">The report is checked before the graph stops</h2>
          <ol>
            <li><ShieldCheck aria-hidden="true" size={20} /><span><strong>Evaluate</strong> section coverage, logic, and task alignment.</span></li>
            <li><RefreshCw aria-hidden="true" size={20} /><span><strong>Reflect</strong> with a replan instruction only when the evaluator requests revision.</span></li>
            <li><CheckCircle2 aria-hidden="true" size={20} /><span><strong>Terminate</strong> after a passing report or the single bounded retry.</span></li>
          </ol>
          {study.experimentalNote ? (
            <aside className="finance-experimental-note">
              <Code2 aria-hidden="true" size={20} />
              <div>
                <span>EXPERIMENTAL SIDE TRACK</span>
                <p>{study.experimentalNote}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
