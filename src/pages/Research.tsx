import { BookOpen, FileText, FlaskConical, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ActionButton } from "../components/portfolio/ActionButton";
import { additionalPublications, routerBenchMini, selectedPublications } from "../data/siteStructure";
import { bilingual, useLanguage } from "../i18n/LanguageContext";

export function Research() {
  const { language } = useLanguage();
  const localize = (text: { en: string; zh: string }) => bilingual(language, text.en, text.zh);

  return (
    <main className="page-shell research-page-v2 page-enter">
      <section className="secondary-page-title" aria-labelledby="research-title">
        <h1 id="research-title">{bilingual(language, "My Publications", "研究与论文")}</h1>
      </section>

      <section className="research-current-section" aria-labelledby="current-research-title">
        <header className="phase1-section-heading">
          <div>
            <p className="section-eyebrow">{bilingual(language, "02 · Current Research", "02 · 当前研究")}</p>
            <h2 id="current-research-title">RouterBench-Mini</h2>
          </div>
          <span className="research-section-note">{bilingual(language, "Accuracy · Cost · Latency", "准确率 · 成本 · 延迟")}</span>
        </header>

        <article className="research-current-card">
          <div className="research-current-copy">
            <div className="status-pills">
              {routerBenchMini.status.map((status) => <span key={status.en}>{localize(status)}</span>)}
            </div>
            <h3>{bilingual(language, "Cost-aware model routing and escalation strategies for multimodal tasks", "面向多模态任务的成本感知模型路由与升级策略研究")}</h3>
            <p>{localize(routerBenchMini.summary)}</p>
            <div className="research-current-actions">
              <ActionButton href="/brief/routerbench-mini" variant="primary">
                {bilingual(language, "Research Report", "研究报告")}
              </ActionButton>
            </div>
          </div>

          <div className="research-current-evidence">
            <div className="research-fact-grid">
              <article><strong>600</strong><span>{bilingual(language, "sampled tasks", "总体采样任务")}</span></article>
              <article><strong>3</strong><span>{bilingual(language, "task modalities", "任务模态")}</span></article>
              <article><strong>2 × 150</strong><span>{bilingual(language, "held-out batches", "held-out 批次")}</span></article>
              <article><strong>B</strong><span>{bilingual(language, "final untouched set", "最终未触碰确认集")}</span></article>
            </div>
            <div className="research-result-band">
              <span>{bilingual(language, "FROZEN TASK-AWARE VS ALWAYS STRONG", "固定 TASK-AWARE 对比 ALWAYS STRONG")}</span>
              <div>
                <strong>−0.67pp <small>{bilingual(language, "Accuracy", "准确率")}</small></strong>
                <strong>−22.5% <small>{bilingual(language, "Cost", "成本")}</small></strong>
                <strong>−26.6% <small>{bilingual(language, "Latency", "延迟")}</small></strong>
              </div>
            </div>
            <p className="research-caveat">
              {bilingual(
                language,
                "The batches are non-overlapping, but only B is the final untouched confirmation set; A informed later feature selection.",
                "两批数据互不重叠，但只有 B 组是最终未触碰确认集；A 组参与了后续特征方案选择。",
              )}
            </p>
          </div>
        </article>
      </section>

      <section className="selected-publications-section" aria-labelledby="selected-publications-title">
        <header className="phase1-section-heading">
          <div>
            <p className="section-eyebrow" id="selected-publications-title">{bilingual(language, "01 · Selected Publications", "01 · 精选论文")}</p>
          </div>
        </header>

        <div className="selected-publication-grid">
          {selectedPublications.map((publication, index) => (
            <article className="selected-publication-card" key={publication.id}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {index === 0 ? <FlaskConical aria-hidden="true" size={22} /> : <BookOpen aria-hidden="true" size={22} />}
              </header>
              <p className="publication-type-label">{localize(publication.publicationType)}</p>
              <h3>{publication.canonicalTitle}</h3>
              {language === "zh" ? <p className="translated-title">{publication.titleZh}</p> : null}
              <dl>
                <div><dt>{bilingual(language, "Role", "作者身份")}</dt><dd>{localize(publication.authorRole)}</dd></div>
                <div><dt>{bilingual(language, "Venue", "发表信息")}</dt><dd>{publication.venue}</dd></div>
              </dl>
              <p className="selected-publication-summary">{localize(publication.summary)}</p>
              <strong className="selected-publication-result">{localize(publication.result)}</strong>
              <footer>
                <Link className="research-action-pill" to={`/brief/${publication.briefId}`}><Search aria-hidden="true" size={15} /> DETAIL</Link>
                {publication.paperUrl ? <a className="research-action-pill" href={publication.paperUrl} rel="noreferrer" target="_blank"><FileText aria-hidden="true" size={15} /> PAPER</a> : null}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="additional-publications-section" aria-labelledby="additional-publications-title">
        <header className="phase1-section-heading">
          <div>
            <p className="section-eyebrow" id="additional-publications-title">{bilingual(language, "03 · Additional Publications", "03 · 其他论文")}</p>
          </div>
        </header>
        <div className="additional-publication-list">
          {additionalPublications.map((publication) => (
            <article key={publication.id}>
              {publication.homeVisual ? (
                <figure className="additional-visual">
                  <img
                    alt={localize(publication.homeVisual.alt)}
                    decoding="async"
                    height={publication.homeVisual.height}
                    loading="lazy"
                    src={publication.homeVisual.src}
                    width={publication.homeVisual.width}
                  />
                </figure>
              ) : null}
              <div className="additional-main">
                <p>{localize(publication.publicationType)} · {localize(publication.authorRole)}</p>
                <h3>{publication.canonicalTitle}</h3>
                {language === "zh" ? <span className="translated-title">{publication.titleZh}</span> : null}
                <small>{publication.venue}</small>
              </div>
              <p className="additional-summary">{localize(publication.summary)}</p>
              <div className="additional-actions">
                <Link className="research-action-pill" to={`/brief/${publication.briefId}`} aria-label={`${publication.canonicalTitle} detail`}><Search aria-hidden="true" size={15} /> DETAIL</Link>
                {publication.paperUrl ? <a className="research-action-pill" href={publication.paperUrl} rel="noreferrer" target="_blank" aria-label={`${publication.canonicalTitle} paper`}><FileText aria-hidden="true" size={15} /> PAPER</a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
