import type { DevelopmentProject } from "../../data/portfolio";
import { ActionButton } from "./ActionButton";
import { FinanceAgentProjectShowcase } from "./FinanceAgentProjectShowcase";
import { MiniProgramProjectShowcase } from "./MiniProgramProjectShowcase";
import { TagList } from "./TagList";

type SystemProjectCardProps = {
  project: DevelopmentProject;
};

const sectionLabels = [
  ["Problem", "problem"],
  ["Architecture", "architecture"],
  ["My Work", "work"],
  ["Outcome", "outcome"],
] as const;

export function SystemProjectCard({ project }: SystemProjectCardProps) {
  const featured = project.emphasis === "featured";

  return (
    <article className={featured ? "system-card is-featured" : "system-card"}>
      <div className="system-card-header">
        <div>
          <span className="system-period">{project.period}</span>
          <h2>{project.title}</h2>
          {project.chineseTitle ? <p className="timeline-chinese-title">{project.chineseTitle}</p> : null}
        </div>
        <p>{project.type}</p>
      </div>

      <p className="system-description">{project.description}</p>

      {project.showcase?.kind === "mini-program" ? (
        <MiniProgramProjectShowcase showcase={project.showcase} title={project.title} />
      ) : project.showcase?.kind === "agent-system" ? (
        <FinanceAgentProjectShowcase showcase={project.showcase} title={project.title} />
      ) : null}

      {!project.showcase && project.sections ? (
        <div className="system-modules">
          {sectionLabels.map(([label, key]) => (
            <section className="system-module" key={key}>
              <h3>{label}</h3>
              <p>{project.sections![key]}</p>
            </section>
          ))}
        </div>
      ) : null}

      {!project.showcase ? (
        <>
          <ul className="highlight-list system-highlights">
            {project.highlights?.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <TagList tags={project.tags} />
        </>
      ) : null}

      {project.actions?.length ? (
        <div className="inline-actions">
          {project.actions.map((action) => (
            <ActionButton external={action.external} href={action.href} key={action.label} variant="quiet">
              {action.label}
            </ActionButton>
          ))}
        </div>
      ) : null}
    </article>
  );
}
