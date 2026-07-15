import { Award, FileSearch, ServerCog } from "lucide-react";
import { Link } from "react-router-dom";
import { bilingual, useLanguage } from "../i18n/LanguageContext";
import polyuLogo from "../assets/institutions/polyu-logo.png";
import njtechLogo from "../assets/institutions/njtech-logo.png";

export function Experience() {
  const { language } = useLanguage();

  return (
    <main className="page-shell experience-page-v2 page-enter">
      <section className="secondary-page-title" aria-labelledby="experience-title">
        <h1 id="experience-title">{bilingual(language, "Experience", "经历")}</h1>
      </section>

      <section className="experience-section" aria-labelledby="education-title">
        <header><span>01</span><h2 id="education-title">{bilingual(language, "Education Background", "教育背景")}</h2></header>
        <div className="education-list">
          <article>
            <div className="institution-rail">
              <span className="institution-logo"><img alt="The Hong Kong Polytechnic University logo" loading="eager" referrerPolicy="no-referrer" src={polyuLogo} /></span>
            </div>
            <div className="institution-copy">
              <h3>{bilingual(language, "The Hong Kong Polytechnic University", "香港理工大学")}</h3>
              <p>{bilingual(language, "Incoming MSc Student in Data Science & Analytics", "数据科学与分析硕士即将入学")}</p>
            </div>
            <time dateTime="2026">2026</time>
          </article>
          <article>
            <div className="institution-rail">
              <span className="institution-logo"><img alt="Nanjing Tech University logo" loading="eager" referrerPolicy="no-referrer" src={njtechLogo} /></span>
            </div>
            <div className="institution-copy">
              <h3>{bilingual(language, "Nanjing Tech University", "南京工业大学")}</h3>
              <p>{bilingual(language, "B.Sc. in Data Science and Big Data Technology", "数据科学与大数据技术 · 理学学士")}</p>
              <strong>{bilingual(language, "Average Score: 88/100", "平均分：88/100")}</strong>
            </div>
            <time dateTime="2022/2026">2022–2026</time>
          </article>
        </div>
      </section>

      <section className="experience-section" aria-labelledby="professional-experience-title">
        <header><span>02</span><h2 id="professional-experience-title">{bilingual(language, "Internship Experience", "实习经历")}</h2></header>
        <article className="supercomputing-experience">
          <header className="supercomputing-header">
            <div className="supercomputing-title">
              <ServerCog aria-hidden="true" size={28} />
              <div>
                <h3>{bilingual(language, "National Supercomputing Center in Wuxi", "国家超级计算无锡中心")}</h3>
                <p>{bilingual(language, "Algorithm Engineer Intern", "算法工程师实习生")}</p>
              </div>
            </div>
            <time dateTime="2025-07/2025-09">2025.07–2025.09</time>
          </header>
          <strong>{bilingual(language, "230K-scale PDB / FASTA records", "23 万规模 PDB / FASTA 记录")}</strong>
          <ul>
            <li>{bilingual(language, "Parallel processing, chain reorganization, structural consistency checks, and abnormal-data cleaning.", "并行处理、链重组、结构一致性检查与异常数据清洗。")}</li>
            <li>{bilingual(language, "HADDOCK3-score execution and Spearman correlation analysis.", "HADDOCK3-score 执行与 Spearman 相关分析。")}</li>
            <li>{bilingual(language, "Factor analysis and composite statistical scoring.", "因子分析与综合统计评分。")}</li>
          </ul>
        </article>
      </section>

      <section className="experience-section" aria-labelledby="recognition-title">
        <header><span>03</span><h2 id="recognition-title">{bilingual(language, "Competition Awards", "竞赛奖项")}</h2></header>
        <article className="recognition-card">
          <div className="recognition-award-panel">
            <span>MCM/ICM 2026</span>
            <Award aria-hidden="true" size={35} />
            <strong>{bilingual(language, "M Award", "M 奖")}</strong>
          </div>
          <div className="recognition-project-panel">
            <span>{bilingual(language, "Competition Research", "竞赛研究项目")}</span>
            <h3>Compete or Coevolve: An Evolutionary Macro–Micro Framework for AI-Era Educational Policy</h3>
            {language === "zh" ? <p className="translated-title">竞争还是共生：面向 AI 时代教育政策的宏微观演化框架</p> : null}
            <p>
              {bilingual(
                language,
                "Co-developed a four-module modeling framework for AI-era education and labor-market policy. This is presented as competition research, not a formal publication.",
                "共同构建面向 AI 时代教育与劳动力市场政策的四模块建模框架。本项目作为竞赛研究展示，不视为正式发表成果。",
              )}
            </p>
            <Link className="research-action-pill" to="/brief/mcm-2026"><FileSearch aria-hidden="true" size={15} /> DETAIL</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
