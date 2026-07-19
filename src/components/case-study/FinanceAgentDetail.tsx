import {
  BadgeCheck,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { AgentProjectCaseStudy } from "../../data/caseStudies";
import { ActionButton } from "../portfolio/ActionButton";
import { FinanceAgentSystemMap } from "../finance/FinanceAgentSystemMap";
import { financeZh } from "../../i18n/content";
import { bilingual, useLanguage } from "../../i18n/LanguageContext";

const financeMetrics = [
  {
    value: "4",
    icon: Workflow,
    en: {
      label: "Specialist Agents",
      detail: "Fundamental, technical, valuation, and news branches run before report synthesis.",
    },
    zh: {
      label: "专业分析智能体",
      detail: "基本面、技术面、估值与新闻分支完成分析后再汇总报告。",
    },
  },
  {
    value: "28",
    icon: Database,
    en: {
      label: "Registered MCP Tools",
      detail: "Counted directly from active FastMCP tool decorators in the public source tree.",
    },
    zh: {
      label: "已注册 MCP 工具",
      detail: "依据公开源码中启用的 FastMCP 工具装饰器直接统计。",
    },
  },
  {
    value: "8",
    icon: Code2,
    en: {
      label: "MCP Tool Modules",
      detail: "Market, reports, indices, overview, macro, dates, analysis, and news.",
    },
    zh: {
      label: "MCP 工具模块",
      detail: "覆盖市场、财报、指数、概览、宏观、日期、分析与新闻。",
    },
  },
  {
    value: "60/60",
    icon: BadgeCheck,
    en: {
      label: "Extraction Tests Passed",
      detail: "Exact matches for company names and stock codes in the committed regression suite.",
    },
    zh: {
      label: "提取测试通过",
      detail: "仓库回归测试中，公司名称与股票代码均需精确匹配。",
    },
  },
  {
    value: "1",
    icon: RefreshCw,
    en: {
      label: "Maximum Reflection Retry",
      detail: "The workflow permits one replanning cycle and cannot reflect indefinitely.",
    },
    zh: {
      label: "最大反思重试",
      detail: "工作流最多进行一次重新规划，避免出现无限反思循环。",
    },
  },
];

export function FinanceAgentDetail({ study }: { study: AgentProjectCaseStudy }) {
  const { language } = useLanguage();
  const agents = ["Fundamental", "Technical", "Valuation", "News"];
  const toolFamilies = study.toolFamilies ?? [];
  const reportSections = study.reportSections ?? [];

  return (
    <>
      <section className="finance-detail-hero">
        <div className="finance-detail-copy">
          <p className="finance-detail-keywords">{study.keywords?.join(" · ")}</p>
          <span className="finance-detail-status"><i aria-hidden="true" /> {bilingual(language, "Technical Project Overview", financeZh.status)}</span>
          <h1>
            {language === "zh" ? (
              <>基于 MCP 协议的<br />A 股智能分析系统</>
            ) : "MCP-Based A-share Intelligent Analysis System"}
          </h1>
          <p>{bilingual(language, study.oneLineSummary, financeZh.summary)}</p>
          {study.githubUrl ? (
            <div className="finance-detail-actions">
              <ActionButton external href={study.githubUrl} variant="primary">
                <Code2 aria-hidden="true" size={17} /> GitHub
              </ActionButton>
              <ActionButton href="/brief/finance-agent/result">
                <FileText aria-hidden="true" size={17} /> {bilingual(language, "Result Demo", "结果演示")}
              </ActionButton>
            </div>
          ) : null}
        </div>

        <aside className="finance-detail-meta">
          <span>{study.period}</span>
          <strong>{bilingual(language, "Algorithm Engineer", "算法工程师")}</strong>
          <p>{bilingual(language, financeZh.responsibilityEn, financeZh.responsibility)}</p>
        </aside>
      </section>

      <section className="finance-fact-strip" aria-label={bilingual(language, "Verified Finance-Agent facts", "已核验的 Finance-Agent 事实")}>
        {study.facts?.map((fact, index) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <div>
              <h2>{bilingual(language, fact.label, financeZh.facts[index]?.label ?? fact.label)}</h2>
              <p>{bilingual(language, fact.note, financeZh.facts[index]?.note ?? fact.note)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="finance-architecture-section" aria-labelledby="finance-architecture-title">
        <header className="finance-section-heading is-label-only">
          <h2 className="finance-section-label" id="finance-architecture-title">
            {bilingual(language, "System Architecture", financeZh.architecture.eyebrow)}
          </h2>
        </header>

        <FinanceAgentSystemMap agents={agents} toolFamilies={toolFamilies} />
      </section>

      <section className="finance-tools-section" aria-labelledby="finance-tools-title">
        <header className="finance-section-heading is-label-only">
          <h2 className="finance-section-label" id="finance-tools-title">
            {bilingual(language, "Verified Repository Evidence", financeZh.tools.eyebrow)}
          </h2>
        </header>
        <div className="finance-metric-grid">
          {financeMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const copy = language === "zh" ? metric.zh : metric.en;
            return (
              <article className="finance-metric-card" key={copy.label}>
                <div className="finance-metric-card-head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
                </div>
                <strong className="finance-metric-value">{metric.value}</strong>
                <h3>{copy.label}</h3>
                <p>{copy.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="finance-output-section" aria-labelledby="finance-output-title">
        <div className="finance-markdown-sheet">
          <header>
            <div>
              <FileText aria-hidden="true" size={20} />
              <span>{bilingual(language, "ILLUSTRATIVE OUTPUT STRUCTURE", financeZh.reportLabel)}</span>
            </div>
            <small>{bilingual(language, "Markdown / no fabricated investment result", financeZh.reportNote)}</small>
          </header>
          <div className="finance-markdown-body">
            <span className="finance-md-h1"># {bilingual(language, "A-share Company Analysis", financeZh.reportTitle)}</span>
            {reportSections.map((section, index) => (
              <div className="finance-md-section" key={section}>
                <strong>## {language === "zh" ? financeZh.reportSections[index] ?? section : section}</strong>
                <i style={{ width: `${82 - (index % 3) * 11}%` }} />
                <i style={{ width: `${61 + (index % 2) * 17}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="finance-output-copy">
          <h2 className="finance-section-label" id="finance-output-title">{bilingual(language, "Evaluation & Reflection", financeZh.output.eyebrow)}</h2>
          <ol>
            <li><ShieldCheck aria-hidden="true" size={20} /><span><strong>{bilingual(language, "Evaluate", "评估")}</strong> {bilingual(language, "Combine structured rule checks with an LLM reviewer to assess report completeness, logical consistency, and alignment with the original task.", financeZh.output.steps[0])}</span></li>
            <li><RefreshCw aria-hidden="true" size={20} /><span><strong>{bilingual(language, "Reflect & Replan", "反思与重规划")}</strong> {bilingual(language, "When evaluation fails, the system summarizes missing information and logical issues into targeted instructions for the next analysis round.", financeZh.output.steps[1])}</span></li>
            <li><CheckCircle2 aria-hidden="true" size={20} /><span><strong>{bilingual(language, "Retry & Verify", "重试与验证")}</strong> {bilingual(language, "The revised guidance is fed back to the fundamental, technical, valuation, and news agents. They rerun the analysis and regenerate the report, with execution stopping after a passing result or one bounded retry.", financeZh.output.steps[2])}</span></li>
          </ol>
          {study.experimentalNote ? (
            <aside className="finance-experimental-note">
              <Code2 aria-hidden="true" size={20} />
              <div>
                <span>{bilingual(language, "EXPERIMENTAL COMPONENT", financeZh.output.experimental)}</span>
                <p>{bilingual(language, study.experimentalNote, financeZh.experimentalNote)}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
