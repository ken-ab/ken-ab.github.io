import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Database,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import routerBenchPareto from "../../assets/case-studies/routerbench-set-b-pareto.png";
import { routerBenchMini } from "../../data/siteStructure";
import type { LocalizedText } from "../../i18n/LanguageContext";
import { bilingual, useLanguage } from "../../i18n/LanguageContext";

const repositoryUrl = "https://github.com/ken-ab/routerbench-mini";
const reportUrl = "https://github.com/ken-ab/routerbench-mini#readme";

const studyScale: Array<{ value: string; label: LocalizedText }> = [
  { value: "2", label: { en: "Unified Multimodal Models", zh: "统一多模态模型" } },
  { value: "600", label: { en: "Unique Tasks", zh: "不重复任务" } },
  { value: "3", label: { en: "Task Families", zh: "任务类型" } },
  { value: "8", label: { en: "Benchmark Datasets", zh: "基准数据集" } },
  { value: "5", label: { en: "Evaluation Strategies", zh: "评估策略" } },
  { value: "4", label: { en: "Core Metrics", zh: "核心指标" } },
];

const modelPool: Array<{ role: string; model: string; description: LocalizedText }> = [
  {
    role: "Cheap",
    model: "Qwen3.5-35B-A3B",
    description: { en: "Lower-cost unified text, vision and tool-use model", zh: "低成本的文本、视觉与工具调用统一模型" },
  },
  {
    role: "Strong",
    model: "Qwen3.5-397B-A17B",
    description: { en: "Higher-capability model with higher call cost", zh: "能力更强、调用成本也更高的统一模型" },
  },
];

const methodCards = [
  {
    number: "01",
    title: "Task-Aware Router",
    subtitle: { en: "Transparent pre-generation routing", zh: "透明的生成前路由" },
    flow: ["Observable request features", "Transparent risk score", "Cheap or Strong"],
    flowZh: ["可观察请求特征", "透明风险分数", "Cheap 或 Strong"],
    description: {
      en: "Routes each request using only features available before generation, including task length, math or logic cues, image and OCR indicators, tool count, required parameters and schema complexity.",
      zh: "仅使用生成前可获得的特征进行路由，包括任务长度、数学或逻辑线索、图像与 OCR 指标、工具数量、必填参数和 Schema 复杂度。",
    },
    notes: {
      en: ["Inference-time observable only", "No dataset identity", "No gold answer", "No test-set labels"],
      zh: ["只使用推理时可观察信息", "不使用数据集名称", "不使用正确答案", "不使用测试集标签"],
    },
  },
  {
    number: "02",
    title: "Learned Router",
    subtitle: { en: "Text-only quality-gap prediction", zh: "仅文本的质量差预测" },
    flow: ["Request text", "TF-IDF", "Ridge regression", "Predicted quality gap", "Cheap or Strong"],
    flowZh: ["请求文本", "TF-IDF", "Ridge 回归", "预测质量差", "Cheap 或 Strong"],
    description: {
      en: "Predicts whether the Strong model is expected to provide a correctness advantage over the Cheap model. The frozen final recipe uses Text-only TF-IDF.",
      zh: "预测 Strong 是否能相对 Cheap 带来正确性优势。冻结后的最终方案仅使用文本 TF-IDF。",
    },
    formula: "y = Strong correct − Cheap correct",
  },
  {
    number: "03",
    title: "Reflection",
    subtitle: { en: "Post-generation review cascade", zh: "生成后的审查级联" },
    flow: ["Cheap response", "Confidence + format + self-check", "Estimated correctness", "Accept or Strong review"],
    flowZh: ["Cheap 回答", "置信度 + 格式 + 自检", "估计正确率", "接受或交给 Strong 审查"],
    description: {
      en: "Cheap answers first. Low-confidence or structurally suspicious responses are sent to Strong for review-and-correct. Strong sees the Cheap candidate rather than answering independently.",
      zh: "Cheap 先生成答案；低置信度或结构可疑的回答会交给 Strong 审查并修正。Strong 会看到 Cheap 的候选答案，并非完全独立重新生成。",
    },
  },
] as const;

const setBResults = [
  { method: "Always Cheap", accuracy: "78.67%", cost: "0.00023762", latency: "1,178 ms", strongUse: "0%", tone: "cheap" },
  { method: "Always Strong", accuracy: "83.33%", cost: "0.00064448", latency: "2,619 ms", strongUse: "100%", tone: "strong" },
  { method: "Task-Aware", accuracy: "82.67%", cost: "0.00050139", latency: "1,767 ms", strongUse: "66%", tone: "featured" },
  { method: "Learned Router", accuracy: "80.00%", cost: "0.00043693", latency: "2,391 ms", strongUse: "50%", tone: "standard" },
  { method: "Reflection", accuracy: "80.00%", cost: "0.00047537", latency: "2,202 ms", strongUse: "46%", tone: "standard" },
] as const;

const ablationResults = [
  { method: "Combined: TF-IDF + Structural", accuracy: "78.67%", strongUse: "36.00%", cost: "0.00037586", selected: false },
  { method: "Structured-only", accuracy: "78.67%", strongUse: "46.67%", cost: "0.00039014", selected: false },
  { method: "Text-only TF-IDF", accuracy: "79.33%", strongUse: "54.67%", cost: "0.00044537", selected: true },
] as const;

function FlowLine({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="routerbench-method-flow">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{step}</span>
          {index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={13} /> : null}
        </li>
      ))}
    </ol>
  );
}

export function RouterBenchDetail() {
  const { language } = useLanguage();
  const localize = (text: LocalizedText) => bilingual(language, text.en, text.zh);

  return (
    <main className="page-shell routerbench-detail-page page-enter">
      <section className="routerbench-detail-hero" aria-labelledby="routerbench-detail-title">
        <div className="routerbench-hero-main">
          <p className="routerbench-report-kicker">
            {bilingual(language, "Independent Research Experiment · Multimodal Model Routing", "独立研究实验 · 多模态模型路由")}
          </p>
          <h1 id="routerbench-detail-title">RouterBench-Mini</h1>
          <p className="routerbench-hero-summary">{localize(routerBenchMini.summary)}</p>
          <dl className="routerbench-hero-meta">
            <div><dt>{bilingual(language, "Date", "时间")}</dt><dd>July 2026</dd></div>
            <div><dt>{bilingual(language, "Project", "项目")}</dt><dd>{bilingual(language, "Independent Research Project", "独立研究项目")}</dd></div>
            <div><dt>{bilingual(language, "Role", "角色")}</dt><dd>{bilingual(language, "Experiment Design, Implementation and Analysis", "实验设计、实现与分析")}</dd></div>
          </dl>
          <div className="routerbench-hero-actions">
            <a className="routerbench-action is-primary" href={repositoryUrl} target="_blank" rel="noreferrer">
              <Code2 aria-hidden="true" size={16} /> {bilingual(language, "View GitHub Repository", "查看 GitHub 仓库")}
            </a>
            <a className="routerbench-action" href={reportUrl} target="_blank" rel="noreferrer">
              <BookOpen aria-hidden="true" size={16} /> {bilingual(language, "Read Full Experimental Report", "阅读完整实验报告")}
            </a>
            <Link className="routerbench-action is-text" to="/research">
              <ArrowLeft aria-hidden="true" size={15} /> {bilingual(language, "Back to Research", "返回研究页")}
            </Link>
          </div>
        </div>
        <aside className="routerbench-hero-note">
          <ShieldCheck aria-hidden="true" size={24} />
          <span>{bilingual(language, "Controlled evidence", "受控实验证据")}</span>
          <strong>{bilingual(language, "One model family. Shared prompts. Untouched confirmation set.", "同一模型家族、统一提示、未触碰确认集。")}</strong>
          <p>{bilingual(language, "A compact experimental report—not a claim of a new routing theory.", "一份简洁实验报告，不宣称提出新的路由理论。")}</p>
        </aside>
      </section>

      <section className="routerbench-question" aria-labelledby="routerbench-question-title">
        <header className="routerbench-section-heading">
          <p className="section-eyebrow">01 · {bilingual(language, "Research Question", "研究问题")}</p>
          <h2 id="routerbench-question-title">{localize(routerBenchMini.question)}</h2>
        </header>

        <div className="routerbench-scale-grid" aria-label={bilingual(language, "Study scale", "实验规模")}>
          {studyScale.map((item) => (
            <article key={item.label.en}><strong>{item.value}</strong><span>{localize(item.label)}</span></article>
          ))}
        </div>

        <div className="routerbench-study-frame">
          <div className="routerbench-model-pool">
            <p className="section-eyebrow">{bilingual(language, "Model Pool", "模型池")}</p>
            {modelPool.map((model) => (
              <article key={model.role}>
                <span>{model.role}</span>
                <strong>{model.model}</strong>
                <p>{localize(model.description)}</p>
              </article>
            ))}
          </div>
          <div className="routerbench-study-tags">
            <div>
              <p className="section-eyebrow">{bilingual(language, "Task Families", "任务类型")}</p>
              <div className="routerbench-tag-row">
                {["Text Reasoning", "Vision Understanding", "Tool Calling"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div>
              <p className="section-eyebrow">{bilingual(language, "Datasets", "数据集")}</p>
              <div className="routerbench-tag-row">
                {["GSM8K", "CommonsenseQA", "BBH", "ScienceQA", "MMMU", "ChartQA", "OCR-VQA", "BFCL"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div>
              <p className="section-eyebrow">{bilingual(language, "Metrics", "指标")}</p>
              <div className="routerbench-tag-row is-metrics">
                {["Accuracy", "Average Cost", "Observed Latency", "Strong Model Use"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="routerbench-methods" aria-labelledby="routerbench-methods-title">
        <header className="routerbench-section-heading is-split">
          <div>
            <p className="section-eyebrow">02 · {bilingual(language, "Final Routing Methods", "最终路由方法")}</p>
            <h2 id="routerbench-methods-title">{bilingual(language, "Five strategies, three routing ideas", "五种策略，三类路由思路")}</h2>
          </div>
          <p>{bilingual(language, "The final comparison keeps two reference boundaries and focuses on the three methods that make an actual routing decision.", "最终比较保留两个参考边界，并聚焦三种真正执行路由决策的方法。")}</p>
        </header>

        <div className="routerbench-baselines" aria-label={bilingual(language, "Reference baselines", "参考基线")}>
          <article><span>Baseline 01</span><strong>Always Cheap</strong><p>{bilingual(language, "Minimum-cost boundary · every request uses Cheap", "最低成本边界 · 所有请求均使用 Cheap")}</p></article>
          <article className="is-strong"><span>Baseline 02</span><strong>Always Strong</strong><p>{bilingual(language, "Capability boundary · every request uses Strong", "能力上界 · 所有请求均使用 Strong")}</p></article>
        </div>

        <div className="routerbench-method-grid">
          {methodCards.map((method) => (
            <article className="routerbench-method-card" key={method.title}>
              <header><span>{method.number}</span><div><h3>{method.title}</h3><p>{localize(method.subtitle)}</p></div></header>
              <FlowLine steps={language === "zh" ? method.flowZh : method.flow} />
              {"formula" in method ? <code>{method.formula}</code> : null}
              <p className="routerbench-method-description">{localize(method.description)}</p>
              {"notes" in method ? (
                <ul>
                  {(language === "zh" ? method.notes.zh : method.notes.en).map((note) => <li key={note}><Check aria-hidden="true" size={13} />{note}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <div className="routerbench-feature-note">
          <Route aria-hidden="true" size={20} />
          <p><strong>{bilingual(language, "Representative observable features", "代表性可观察特征")}</strong>{bilingual(language, "length and numeric density · math or logic cues · image / chart / OCR signals · tool count · required arguments · schema depth", "长度与数字密度 · 数学或逻辑线索 · 图像 / 图表 / OCR 信号 · 工具数量 · 必填参数 · Schema 深度")}</p>
        </div>
      </section>

      <section className="routerbench-protocol" aria-labelledby="routerbench-protocol-title">
        <header className="routerbench-section-heading">
          <p className="section-eyebrow">03 · {bilingual(language, "Data and Confirmation Protocol", "数据与确认性评测")}</p>
          <h2 id="routerbench-protocol-title">{bilingual(language, "Development and Confirmation Protocol", "开发与确认流程")}</h2>
        </header>

        <div className="routerbench-protocol-flow" aria-label={bilingual(language, "Development and confirmation data flow", "开发与确认数据流程")}>
          <article><span>300</span><strong>{bilingual(language, "Development tasks", "原始开发题")}</strong></article>
          <b aria-hidden="true">+</b>
          <article><span>150</span><strong>Set A</strong><small>{bilingual(language, "Method and feature comparison", "方法与特征比较")}</small></article>
          <ArrowRight aria-hidden="true" size={22} />
          <article className="is-frozen"><span>450</span><strong>{bilingual(language, "Development tasks", "开发题")}</strong><small>{bilingual(language, "Freeze selected recipe", "冻结选定方案")}</small></article>
          <ArrowRight aria-hidden="true" size={22} />
          <article className="is-confirmation"><span>150</span><strong>Set B</strong><small>{bilingual(language, "Untouched final confirmation", "未触碰的最终确认")}</small></article>
        </div>

        <div className="routerbench-protocol-copy">
          <p>{bilingual(language, "Set A was used during method and feature comparison. After the Text-only Learned Router recipe was selected, the original development set and Set A were combined into 450 development tasks. Set B remained untouched until the final method recipe was fixed.", "A 组用于方法与特征比较。选定 Text-only Learned Router 后，原开发集与 A 组合并为 450 道开发题；B 组在最终方法方案固定前始终未被使用。")}</p>
          <strong><ShieldCheck aria-hidden="true" size={18} />{bilingual(language, "Set B was not used for feature selection, model selection or threshold selection.", "B 组未用于特征选择、模型选择或阈值选择。")}</strong>
        </div>
      </section>

      <section className="routerbench-results" aria-labelledby="routerbench-results-title">
        <header className="routerbench-section-heading is-split">
          <div>
            <p className="section-eyebrow">04 · {bilingual(language, "Final Results", "最终结果")}</p>
            <h2 id="routerbench-results-title">{bilingual(language, "Set B confirmation results", "Set B 确认结果")}</h2>
          </div>
          <p>{bilingual(language, "All five strategies were evaluated after the method recipe was fixed. Costs are average API cost per task in CNY; latency is observed runtime.", "五种策略均在方法方案固定后评测。成本为每题平均 API 调用成本（CNY），延迟为实际观测运行时间。")}</p>
        </header>

        <div className="routerbench-results-layout">
          <div className="routerbench-table-wrap">
            <table className="routerbench-data-table">
              <thead><tr><th>{bilingual(language, "Method", "方法")}</th><th>{bilingual(language, "Accuracy", "准确率")}</th><th>{bilingual(language, "Avg. Cost", "平均成本")}</th><th>{bilingual(language, "Latency", "延迟")}</th><th>{bilingual(language, "Strong Use", "Strong 使用率")}</th></tr></thead>
              <tbody>
                {setBResults.map((row) => (
                  <tr className={`is-${row.tone}`} key={row.method}>
                    <th scope="row" data-label={bilingual(language, "Method", "方法")}>{row.method}{row.tone === "featured" ? <span>{bilingual(language, "Best Trade-off", "最佳权衡")}</span> : null}</th>
                    <td data-label={bilingual(language, "Accuracy", "准确率")}>{row.accuracy}</td>
                    <td data-label={bilingual(language, "Avg. Cost", "平均成本")}>{row.cost}</td>
                    <td data-label={bilingual(language, "Latency", "延迟")}>{row.latency}</td>
                    <td data-label={bilingual(language, "Strong Use", "Strong 使用率")}>{row.strongUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="routerbench-pooled-result">
            <span>{bilingual(language, "Frozen baseline comparison", "冻结基线比较")}</span>
            <h3>{bilingual(language, "Task-Aware vs. Always Strong", "Task-Aware 对比 Always Strong")}</h3>
            <dl>
              <div><dt>−0.67 pp</dt><dd>{bilingual(language, "Accuracy", "准确率")}</dd></div>
              <div><dt>−22.5%</dt><dd>{bilingual(language, "Average Cost", "平均成本")}</dd></div>
              <div><dt>−26.6%</dt><dd>{bilingual(language, "Observed Latency", "观测延迟")}</dd></div>
            </dl>
            <p>{bilingual(language, "Pooled comparison of the frozen Always Strong and Task-Aware baselines across Sets A and B.", "基于 A、B 两组中冻结不变的 Always Strong 与 Task-Aware 基线进行合并比较。")}</p>
            <div className="routerbench-absolute-results">
              <p><strong>Always Strong</strong><span>81.33% {bilingual(language, "accuracy", "准确率")} · 100% Strong use</span></p>
              <p><strong>Task-Aware</strong><span>80.67% {bilingual(language, "accuracy", "准确率")} · 65.67% Strong use</span></p>
            </div>
          </aside>
        </div>

        <figure className="routerbench-pareto-figure">
          <div><img src={routerBenchPareto} alt={bilingual(language, "Repository-provided Pareto chart comparing Set B routing accuracy and average API cost.", "实验仓库提供的 Pareto 图，对比 Set B 各路由策略的准确率与平均 API 成本。")}/></div>
          <figcaption><Database aria-hidden="true" size={15} />{bilingual(language, "Repository-provided Set B Pareto plot · qwen3.5-v4-study/pareto.png", "实验仓库原始 Set B Pareto 图 · qwen3.5-v4-study/pareto.png")}</figcaption>
        </figure>
      </section>

      <section className="routerbench-ablation" aria-labelledby="routerbench-ablation-title">
        <header className="routerbench-section-heading is-split">
          <div>
            <p className="section-eyebrow">05 · {bilingual(language, "Learned Router Ablation and Conclusion", "Learned Router 消融与结论")}</p>
            <h2 id="routerbench-ablation-title">{bilingual(language, "A promising Set A result that did not replicate", "Set A 的早期优势未能复现")}</h2>
          </div>
          <p>{bilingual(language, "The ablation compares feature representations on Set A. Set B is used only for the frozen confirmation result—not for another round of ablation.", "消融仅在 A 组比较特征表示；B 组只用于冻结方案的确认结果，不进行新一轮消融。")}</p>
        </header>

        <div className="routerbench-ablation-grid">
          <div className="routerbench-table-wrap">
            <table className="routerbench-data-table is-ablation">
              <thead><tr><th>{bilingual(language, "Learned Router Features", "Learned Router 特征")}</th><th>{bilingual(language, "Accuracy on Set A", "Set A 准确率")}</th><th>{bilingual(language, "Strong Use", "Strong 使用率")}</th><th>{bilingual(language, "Avg. Cost", "平均成本")}</th></tr></thead>
              <tbody>
                {ablationResults.map((row) => (
                  <tr className={row.selected ? "is-selected" : undefined} key={row.method}>
                    <th scope="row" data-label={bilingual(language, "Features", "特征")}>{row.method}{row.selected ? <span>{bilingual(language, "Selected", "入选")}</span> : null}</th>
                    <td data-label={bilingual(language, "Accuracy on Set A", "Set A 准确率")}>{row.accuracy}</td>
                    <td data-label={bilingual(language, "Strong Use", "Strong 使用率")}>{row.strongUse}</td>
                    <td data-label={bilingual(language, "Avg. Cost", "平均成本")}>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="routerbench-ablation-note">
            <span>{bilingual(language, "Selection", "方案选择")}</span>
            <p>{bilingual(language, "Text-only TF-IDF matched Always Strong on Set A and was therefore selected as the final Learned Router recipe.", "Text-only TF-IDF 在 A 组匹配了 Always Strong，因此被选为最终 Learned Router 方案。")}</p>
            <strong>{bilingual(language, "However, the result did not replicate on untouched Set B: Learned Router reached 80.00%, compared with 83.33% for Always Strong and 82.67% for Task-Aware.", "但该结果未在未触碰的 B 组复现：Learned Router 为 80.00%，Always Strong 为 83.33%，Task-Aware 为 82.67%。")}</strong>
          </aside>
        </div>

        <ol className="routerbench-evidence-chain">
          {[{ en: "Feature ablation on Set A", zh: "在 A 组进行特征消融" }, { en: "Select Text-only TF-IDF", zh: "选定 Text-only TF-IDF" }, { en: "Freeze the recipe", zh: "冻结方案" }, { en: "Evaluate on untouched Set B", zh: "在未触碰 B 组评测" }, { en: "Early advantage does not replicate", zh: "早期优势未复现" }].map((step, index, steps) => (
            <li key={step.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{localize(step)}</strong>{index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={14} /> : null}</li>
          ))}
        </ol>

        <div className="routerbench-conclusion-grid">
          <div>
            <p className="section-eyebrow">{bilingual(language, "Final Conclusion", "最终结论")}</p>
            <h3>{bilingual(language, "The stable result was simpler—and more credible.", "更简单的结果，也更稳定可信。")}</h3>
            <p>{bilingual(language, "At the current experimental scale, the learned router and post-generation Reflection cascade did not consistently match an always-strong policy.", "在当前实验规模下，学习式路由与生成后的 Reflection 级联均未能稳定匹配 Always Strong 策略。")}</p>
            <p>{bilingual(language, "The most stable result came from the transparent Task-Aware router. Across two non-overlapping evaluation batches, it remained within 0.67 percentage points of Always Strong while reducing average calling cost by 22.5% and observed latency by 26.6%.", "最稳定的结果来自透明的 Task-Aware 路由器。在两批互不重叠的评测中，它与 Always Strong 的准确率差距保持在 0.67 个百分点以内，同时将平均调用成本降低 22.5%，观测延迟降低 26.6%。")}</p>
            <p>{bilingual(language, "The result does not imply that handcrafted rules are universally superior. It suggests that when model-disagreement supervision is sparse and uncertainty signals are unstable, the estimation error of a more complex router may outweigh its theoretical advantage.", "这并不意味着手工规则普遍更优，而是说明当模型分歧监督稀疏、不确定性信号不稳定时，更复杂 Router 的估计误差可能超过其理论优势。")}</p>
          </div>
          <aside>
            <span>{bilingual(language, "Key Finding", "关键发现")}</span>
            <strong>{bilingual(language, "Simpler routing was more stable than learned or reflective routing under limited disagreement supervision.", "在分歧监督有限时，简单路由比学习式或反思式路由更稳定。")}</strong>
          </aside>
        </div>

        <p className="routerbench-report-note">
          {bilingual(language, "Earlier iterations, leakage corrections and calibration experiments are documented in the full GitHub research report.", "早期版本、信息泄漏修正与置信度校准实验详见 GitHub 完整研究报告。")}
          <a href={reportUrl} target="_blank" rel="noreferrer">{bilingual(language, "Read report", "阅读报告")}<ArrowUpRight aria-hidden="true" size={13} /></a>
        </p>
      </section>
    </main>
  );
}
