import { Code2, FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";
import routerBenchOverview from "../../assets/case-studies/routerbench-cost-aware-routing.png";
import cbcrOverview from "../../assets/publication-cards/cbcr-future-behavior-repair.png";
import { routerBenchMini, selectedPublications, type PublicationSummary } from "../../data/siteStructure";
import { bilingual, useLanguage } from "../../i18n/LanguageContext";
import { ZoomableImage } from "../media/ZoomableImage";
import "./SelectedResearchShowcase.css";

export function SelectedResearchShowcase() {
  const { language } = useLanguage();
  const localize = (text: { en: string; zh: string }) => bilingual(language, text.en, text.zh);

  return (
    <div className="selected-research-showcase">
      <div className="home-publication-pair">
        {selectedPublications.map((publication) => (
          <article
            className={`home-publication-card is-${publication.id} is-${language}`}
            key={publication.id}
          >
            <div className="home-publication-meta">
              <span>{localize(publication.publicationType)}</span>
              {publication.homepageCitation ? <HomepageCitation citation={publication.homepageCitation} /> : null}
            </div>
            <h3>{language === "zh" ? publication.titleZh : publication.canonicalTitle}</h3>
            {publication.homeVisual ? (
              <div className="home-publication-visual-slot">
                <ZoomableImage
                  alt={localize(publication.homeVisual.alt)}
                  className="home-publication-visual"
                  decoding="async"
                  height={publication.homeVisual.height}
                  src={publication.homeVisual.src}
                  width={publication.homeVisual.width}
                />
              </div>
            ) : null}
            <p>{localize(publication.summary)}</p>
            <footer>
              <strong>{localize(publication.result)}</strong>
              <div className="home-publication-actions">
                <Link className="research-action-pill" to={`/brief/${publication.briefId}`}>
                  <Search aria-hidden="true" size={15} /> DETAIL
                </Link>
                {publication.paperUrl ? (
                  <a className="research-action-pill" href={publication.paperUrl} rel="noreferrer" target="_blank">
                    <FileText aria-hidden="true" size={15} /> PAPER
                  </a>
                ) : null}
              </div>
            </footer>
          </article>
        ))}
      </div>

      <div className="current-research-pair">
        <article className={`current-research-card is-routerbench is-${language}`}>
          <div className="current-research-copy">
            <div className="status-pills">
              {routerBenchMini.status.map((status) => <span key={status.en}>{localize(status)}</span>)}
            </div>
            <h3>{bilingual(language, routerBenchMini.title.en, "面向多模态任务的成本感知模型路由研究")}</h3>
            <p>{localize(routerBenchMini.question)}</p>
          </div>
          <figure className="current-research-visual">
            <ZoomableImage
              alt={bilingual(language, "Cost-aware model routing research for multimodal tasks.", "面向多模态任务的成本感知模型路由研究图。")}
              decoding="async"
              loading="lazy"
              src={routerBenchOverview}
            />
          </figure>
          <footer className="current-research-actions">
            <Link className="research-action-pill" to="/brief/routerbench-mini">
              <Search aria-hidden="true" size={15} /> DETAIL
            </Link>
            <a className="research-action-pill" href="https://github.com/ken-ab/routerbench-mini" rel="noreferrer" target="_blank">
              <Code2 aria-hidden="true" size={15} /> GITHUB
            </a>
          </footer>
        </article>

        <article className={`current-research-card is-cbcr is-${language}`}>
          <div className="current-research-copy">
            <div className="status-pills">
              <span>{bilingual(language, "Recent Research", "近期研究")}</span>
            </div>
            <h3>
              {bilingual(
                language,
                "CBCR: Counterexample-Guided Future-Behavior Repair for Contaminated Memory in LLM Agents",
                "CBCR：面向大语言模型智能体污染记忆的反例引导未来行为修复",
              )}
            </h3>
            <p>
              {bilingual(
                language,
                "This work studies a new post-contamination memory-repair problem for long-running LLM agents and proposes Counterexample-Guided Behavioral Coalition Repair (CBCR), aiming to eliminate the influence of contaminated memory on future decisions while preserving verifiable benign supporting information.",
                "本文探讨了一项面向长期运行大语言模型智能体的新型污染后记忆修复问题，并提出反例引导的行为联盟修复方法（CBCR），旨在消除污染记忆对未来决策的影响，同时保留可验证的良性支持信息。",
              )}
            </p>
          </div>
          <figure className="current-research-visual">
            <ZoomableImage
              alt={bilingual(language, "CBCR future-behavior repair framework.", "CBCR 未来行为修复框架。")}
              decoding="async"
              loading="lazy"
              src={cbcrOverview}
            />
          </figure>
          <footer className="current-research-note">
            <span aria-hidden="true" />
            {bilingual(
              language,
              "Manuscript in progress · preparing for AAAI · code and paper materials will be released later.",
              "文章在写，准备投 AAAI，后面会开源代码和展示论文。",
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}

function HomepageCitation({ citation }: { citation: NonNullable<PublicationSummary["homepageCitation"]> }) {
  if (citation.kind === "conference") {
    return <cite className="home-publication-citation"><strong>{citation.name}</strong></cite>;
  }

  return (
    <cite className="home-publication-citation">
      <em>{citation.journal}</em>{" "}
      <strong>{citation.year}</strong>,{" "}
      <em>{citation.volume}</em>,{" "}
      {citation.article}
    </cite>
  );
}
