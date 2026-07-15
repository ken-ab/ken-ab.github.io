import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ActionButton } from "../components/portfolio/ActionButton";
import { ProfileCard } from "../components/portfolio/ProfileCard";
import { profile } from "../data/portfolio";
import { publicCvUrl } from "../data/publicAssets";
import {
  experienceHighlights,
  homepageEngineering,
  routerBenchMini,
  routerBenchV4Routes,
  selectedPublications,
} from "../data/siteStructure";
import { homeZh } from "../i18n/content";
import { bilingual, useLanguage } from "../i18n/LanguageContext";

export function Home() {
  const { language } = useLanguage();
  const localize = (text: { en: string; zh: string }) => bilingual(language, text.en, text.zh);
  const introduction = bilingual(language, profile.intro, homeZh.intro).split("\n\n");

  return (
    <main className="page-shell phase1-home page-enter">
      <section className="phase1-hero" aria-labelledby="home-title">
        <div className="phase1-hero-copy">
          <p className="hero-kicker">
            {bilingual(language, "GENERATIVE AI · DATA MODELING · MODEL ROUTING", "生成式 AI · 数据建模 · 模型路由")}
          </p>
          <div className={`phase1-motto-lockup is-${language}`}>
            <h1
              aria-label={bilingual(language, "Good research takes time. Good systems take care.", "好的研究需要时间，好的系统需要用心。")}
              className="phase1-hero-motto"
              id="home-title"
            >
              <span aria-hidden="true">
                {bilingual(language, "Good research takes ", "好的研究需要")}
                <em>{bilingual(language, "time", "时间")}</em>
                {bilingual(language, ",", "，")}
              </span>
              <span aria-hidden="true">
                {bilingual(language, "Good systems take ", "好的系统需要")}
                <mark>{bilingual(language, "care", "用心")}</mark>
                <b>{bilingual(language, ".", "。")}</b>
              </span>
            </h1>
          </div>
          <div aria-hidden="true" className="phase1-motto-rule"><span /></div>
          <div className="phase1-hero-summary">
            {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="hero-actions" aria-label={bilingual(language, "Primary actions", "主要操作")}>
            <ActionButton href="/research" variant="primary">
              {bilingual(language, "Current Research", "当前研究")}
            </ActionButton>
            <ActionButton download="Ken_Zhang_Public_CV.pdf" href={publicCvUrl}>CV</ActionButton>
            <ActionButton external href={profile.github}>GitHub</ActionButton>
          </div>
        </div>

        <ProfileCard />
      </section>

      <section className="home-section phase1-selected-research" aria-labelledby="selected-research-title">
        <header className="phase1-section-heading">
          <div>
            <p className="section-eyebrow" id="selected-research-title">
              {bilingual(language, "Selected Research", "精选研究")}
            </p>
          </div>
          <Link to="/research">
            {bilingual(language, "All research", "查看全部研究")} <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </header>

        <Link className="routerbench-home-card" to="/brief/routerbench-mini">
          <div className="routerbench-home-copy">
            <div className="status-pills">
              {routerBenchMini.status.map((status) => <span key={status.en}>{localize(status)}</span>)}
            </div>
            <h3>{bilingual(language, routerBenchMini.title.en, "面向多模态任务的成本感知模型路由研究")}</h3>
            <p>
              {bilingual(
                language,
                routerBenchMini.question.en,
                "在向 AI 提问时，能否根据问题难度动态选择不同能力和成本的模型，在尽量保持准确率的同时降低调用成本与响应延迟？",
              )}
            </p>
          </div>
          <div className="routerbench-v4-table-wrap">
            <div className="routerbench-v4-table-heading">
              <span>V4</span>
              <strong>{bilingual(language, "Confirmatory results · 150 held-out tasks", "确认性结果 · 150 道 held-out 任务")}</strong>
            </div>
            <table className="routerbench-v4-table">
              <thead>
                <tr>
                  <th>{bilingual(language, "Routing method", "路由方式")}</th>
                  <th>{bilingual(language, "Accuracy", "准确率")}</th>
                  <th>{bilingual(language, "Latency", "延迟")}</th>
                  <th>{bilingual(language, "Avg. cost", "平均成本")}</th>
                </tr>
              </thead>
              <tbody>
                {routerBenchV4Routes.map((route) => (
                  <tr className={"featured" in route ? "is-featured" : undefined} key={route.method}>
                    <th scope="row">{route.method}</th>
                    <td>{route.accuracy}</td>
                    <td>{route.latency}</td>
                    <td>¥{route.averageCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ArrowUpRight aria-hidden="true" className="card-corner-arrow" size={20} />
        </Link>

        <div className="home-publication-pair">
          {selectedPublications.map((publication) => (
            <Link
              className={`home-publication-card is-${publication.id} is-${language}`}
              key={publication.id}
              to={`/brief/${publication.briefId}`}
            >
              <span>{localize(publication.publicationType)}</span>
              <h3>{language === "zh" ? publication.titleZh : publication.canonicalTitle}</h3>
              {publication.homeVisual ? (
                <div className="home-publication-visual-slot">
                  <img
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
                <ArrowUpRight aria-hidden="true" size={18} />
              </footer>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="engineering-systems-title">
        <header className="phase1-section-heading">
          <div>
            <p className="section-eyebrow" id="engineering-systems-title">
              {bilingual(language, "Engineering & Systems", "工程与系统")}
            </p>
          </div>
          <Link to="/engineering">
            {bilingual(language, "Engineering work", "查看工程项目")} <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </header>
        <div className="home-engineering-links">
          {homepageEngineering.map((project) => (
            <Link key={project.id} to={project.href}>
              <span>{typeof project.title === "string" ? project.title : localize(project.title)}</span>
              <p>{localize(project.summary)}</p>
              <strong>{localize(project.evidence)}</strong>
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-experience-strip" aria-labelledby="experience-recognition-title">
        <div>
          <p className="section-eyebrow">{bilingual(language, "Experience & Recognition", "经历与荣誉")}</p>
          <h2 id="experience-recognition-title">{bilingual(language, "Experience beyond projects.", "其他经历")}</h2>
        </div>
        {experienceHighlights.map((item) => (
          <article key={item.title.en}>
            <span>{localize(item.title)}</span>
            <strong>{localize(item.evidence)}</strong>
          </article>
        ))}
        <Link to="/experience" aria-label={bilingual(language, "View experience", "查看经历")}>
          <ArrowRight aria-hidden="true" size={19} />
        </Link>
      </section>
    </main>
  );
}
