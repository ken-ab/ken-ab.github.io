import { AlertTriangle, CalendarDays, FileText, GitFork } from "lucide-react";
import type { ReactNode } from "react";
import financeReportRaw from "../assets/reports/finance-agent-anonymized-demo.md?raw";
import financeReportUrl from "../assets/reports/finance-agent-anonymized-demo.md?url&no-inline";
import { ActionButton } from "../components/portfolio/ActionButton";
import { bilingual, useLanguage } from "../i18n/LanguageContext";
import "./FinanceResultDemo.css";

type ReportSection = {
  title: string;
  lines: string[];
};

type ReportBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: Array<{ depth: number; text: string }> };

const report = parseReport(financeReportRaw);

export function FinanceResultDemo() {
  const { language } = useLanguage();

  return (
    <main className="page-shell finance-result-page page-enter">
      <header className="finance-result-hero">
        <div>
          <p className="finance-result-kicker">{bilingual(language, "ANONYMIZED REPORT EXAMPLE", "匿名化报告示例")}</p>
          <h1>{report.title}</h1>
          <p className="finance-result-intro">
            {bilingual(
              language,
              "This synthetic, anonymized example demonstrates the report structure without presenting unverified market facts or investment results.",
              "这是一份合成、匿名化的结构示例，用于展示报告格式，不呈现未经验证的市场事实或投资结果。",
            )}
          </p>
        </div>
        <div className="finance-result-meta">
          <span><CalendarDays aria-hidden="true" size={16} /> {bilingual(language, "Analysis timestamp", "分析基准")}</span>
          <strong>{report.analysisTime}</strong>
        </div>
        <div className="finance-result-actions">
          <ActionButton href="/brief/finance-agent" variant="primary">{bilingual(language, "Back to System Detail", "返回系统详情")}</ActionButton>
          <ActionButton external href={financeReportUrl}><FileText aria-hidden="true" size={16} /> {bilingual(language, "Original Markdown", "原始 Markdown")}</ActionButton>
          <ActionButton external href="https://github.com/ken-ab/Finance-Agent"><GitFork aria-hidden="true" size={16} /> GitHub</ActionButton>
        </div>
      </header>

      <aside className="finance-result-notice" role="note">
        <AlertTriangle aria-hidden="true" size={21} />
        <div>
          <strong>{bilingual(language, "Report note", "演示说明")}</strong>
          <p>
            {bilingual(
              language,
              "Every company name, figure, event, and conclusion on this page is synthetic. It documents the output schema and evidence-disclosure style only; it is not a live run, a current market view, or investment advice.",
              "本页中的公司、数字、事件和结论均为合成内容，仅用于说明输出结构与证据披露方式；它不是真实运行结果、不代表当前市场观点，也不构成投资建议。",
            )}
          </p>
        </div>
      </aside>

      <article className="finance-result-paper">
        <header>
          <span><FileText aria-hidden="true" size={18} /> MARKDOWN REPORT</span>
          <small>Finance-Agent / SYNTHETIC-001</small>
        </header>
        <div className="finance-result-report-body">
          {report.sections.map((section, index) => (
            <section key={section.title}>
              <div className="finance-result-section-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
              </div>
              <ReportSectionBody lines={section.lines} />
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

function ReportSectionBody({ lines }: { lines: string[] }) {
  return groupReportBlocks(lines).map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={`paragraph-${index}`}>{renderInline(block.text)}</p>;
    }

    return (
      <ul key={`list-${index}`}>
        {block.items.map((item, itemIndex) => (
          <li className={item.depth > 0 ? "is-nested" : undefined} key={`${item.text}-${itemIndex}`}>
            {renderInline(item.text)}
          </li>
        ))}
      </ul>
    );
  });
}

function parseReport(source: string) {
  const lines = source.replace(/\r/g, "").trim().split("\n");
  const title = lines.shift()?.replace(/^#\s+/, "") ?? "Finance-Agent 输出报告";
  const sections: ReportSection[] = [];
  let analysisTime = "2026-07-19";
  let current: ReportSection | undefined;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      current = { title: line.slice(3).trim(), lines: [] };
      sections.push(current);
      continue;
    }

    if (line.startsWith("分析基准时间：")) {
      analysisTime = line.slice("分析基准时间：".length).trim();
      continue;
    }

    current?.lines.push(line);
  }

  return { title, sections, analysisTime };
}

function groupReportBlocks(lines: string[]): ReportBlock[] {
  const blocks: ReportBlock[] = [];
  let paragraph: string[] = [];
  let list: Array<{ depth: number; text: string }> = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const line of lines) {
    const bullet = line.match(/^(\s*)-\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push({ depth: bullet[1].length >= 2 ? 1 : 0, text: bullet[2].trim() });
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => (
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ));
}
