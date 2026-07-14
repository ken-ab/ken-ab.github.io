import {
  Activity,
  BarChart3,
  Database,
  FileText,
  GitBranch,
  Newspaper,
  RefreshCw,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type FinanceAgentSystemMapProps = {
  agents: string[];
  compact?: boolean;
  query?: string;
  toolFamilies: string[];
};

const agentIcons = [Database, Activity, BarChart3, Newspaper];

export function FinanceAgentSystemMap({
  agents,
  compact = false,
  query = "Analyze BYD (002594)",
  toolFamilies,
}: FinanceAgentSystemMapProps) {
  return (
    <div
      aria-label="Finance-Agent workflow from natural-language query through MCP tools, parallel specialist agents, summary, evaluation, reflection, and Markdown output"
      className={`finance-system-map${compact ? " is-compact" : ""}`}
    >
      <svg aria-hidden="true" className="finance-system-wires" preserveAspectRatio="none" viewBox="0 0 1200 520">
        <defs>
          <marker id={compact ? "finance-arrow-compact" : "finance-arrow"} markerHeight="7" markerWidth="8" orient="auto" refX="7" refY="3.5">
            <path d="M0,0 L8,3.5 L0,7 Z" />
          </marker>
        </defs>
        <g markerEnd={`url(#${compact ? "finance-arrow-compact" : "finance-arrow"})`}>
          <path className="finance-wire is-flowing" d="M170 260 H225" />
          <path className="finance-wire is-flowing" d="M335 260 C380 260 380 145 420 145" />
          <path className="finance-wire is-flowing delay-1" d="M335 260 C380 260 380 145 590 145" />
          <path className="finance-wire is-flowing delay-2" d="M335 260 C380 260 380 375 420 375" />
          <path className="finance-wire is-flowing delay-3" d="M335 260 C380 260 380 375 590 375" />
          <path className="finance-wire is-flowing" d="M545 145 C735 145 700 260 745 260" />
          <path className="finance-wire is-flowing delay-1" d="M715 145 C735 145 720 260 745 260" />
          <path className="finance-wire is-flowing delay-2" d="M545 375 C735 375 700 260 745 260" />
          <path className="finance-wire is-flowing delay-3" d="M715 375 C735 375 720 260 745 260" />
          <path className="finance-wire is-flowing" d="M850 260 H885" />
          <path className="finance-wire is-pass" d="M995 240 C1030 220 1030 155 1060 155" />
          <path className="finance-wire is-review" d="M940 305 V375" />
          <path className="finance-wire is-review" d="M885 425 C745 490 610 475 540 410" />
        </g>
      </svg>

      <article className="finance-system-node finance-query-node">
        <span>01 / INPUT</span>
        <Search aria-hidden="true" size={compact ? 17 : 22} />
        <strong>{query}</strong>
        <p>Natural-language stock request</p>
      </article>

      <article className="finance-system-node finance-mcp-node">
        <span>02 / DATA</span>
        <Workflow aria-hidden="true" size={compact ? 18 : 23} />
        <strong>MCP tool fabric</strong>
        <p>{toolFamilies.length} registered tool families</p>
        <div className="finance-tool-ticks" aria-hidden="true">
          {toolFamilies.map((tool) => <i key={tool} />)}
        </div>
      </article>

      <section className="finance-agent-cluster" aria-label="Parallel specialist agents">
        <header>
          <span>03 / PARALLEL REASONING</span>
          <strong>Specialist agents</strong>
        </header>
        <div>
          {agents.map((agent, index) => {
            const Icon = agentIcons[index] ?? Database;
            return (
              <article className="finance-agent-node" key={agent}>
                <Icon aria-hidden="true" size={compact ? 16 : 20} />
                <strong>{agent}</strong>
                <i aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </section>

      <article className="finance-system-node finance-summary-node">
        <span>04 / SYNTHESIZE</span>
        <FileText aria-hidden="true" size={compact ? 18 : 22} />
        <strong>Summary agent</strong>
        <p>Merge four traceable perspectives</p>
      </article>

      <article className="finance-system-node finance-evaluator-node">
        <span>05 / CHECK</span>
        <ShieldCheck aria-hidden="true" size={compact ? 18 : 22} />
        <strong>Evaluator</strong>
        <p>Coverage, logic, and goal alignment</p>
      </article>

      <article className="finance-system-node finance-report-node">
        <span>PASS</span>
        <FileText aria-hidden="true" size={compact ? 18 : 22} />
        <strong>Markdown report</strong>
        <p>Structured, saved, inspectable</p>
      </article>

      <article className="finance-system-node finance-reflection-node">
        <span>NEEDS REVISION</span>
        <RefreshCw aria-hidden="true" size={compact ? 18 : 22} />
        <strong>Reflection</strong>
        <p>One bounded replan, then rerun</p>
      </article>

      <div className="finance-loop-label" aria-hidden="true">
        <GitBranch size={14} /> evaluator-controlled branch
      </div>
    </div>
  );
}
