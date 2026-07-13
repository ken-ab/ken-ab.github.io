import type { ReactNode } from "react";

type MethodMapKey = "bamboo" | "digital-trade" | "moe" | "robot-vision";

export function ResearchMethodMap({ kind }: { kind: MethodMapKey }) {
  if (kind === "bamboo") return <BambooMethodMap />;
  if (kind === "robot-vision") return <RobotVisionMethodMap />;
  if (kind === "moe") return <MoeMethodMap />;
  return <DigitalTradeMethodMap />;
}

type FrameProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  figureClass: string;
  title: string;
};

function MethodMapFrame({ children, description, eyebrow, figureClass, title }: FrameProps) {
  return (
    <figure className={`research-method-map ${figureClass}`}>
      <header className="research-map-header">
        <div>
          <span>{eyebrow}</span>
          <strong>{title}</strong>
        </div>
        <span className="research-map-live"><i aria-hidden="true" /> animated route</span>
      </header>
      <div className="research-map-viewport" role="img" aria-label={description}>
        {children}
      </div>
      <figcaption>{description}</figcaption>
    </figure>
  );
}

function MapDefs({ accent, id }: { accent: string; id: string }) {
  return (
    <defs>
      <pattern height="28" id={`${id}-grid`} patternUnits="userSpaceOnUse" width="28">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeOpacity="0.065" />
      </pattern>
      <marker id={`${id}-arrow`} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
        <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
      </marker>
      <filter height="130%" id={`${id}-glow`} width="130%" x="-15%" y="-15%">
        <feGaussianBlur result="blur" stdDeviation="4" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

type NodeProps = {
  detail?: string;
  height?: number;
  label: string | string[];
  role?: string;
  tone?: "accent" | "gold" | "green" | "neutral" | "wine";
  width?: number;
  x: number;
  y: number;
};

function RouteNode({ detail, height = 106, label, role, tone = "accent", width = 168, x, y }: NodeProps) {
  const lines = Array.isArray(label) ? label : [label];
  return (
    <g className={`research-route-node is-${tone}`} transform={`translate(${x} ${y})`}>
      <rect height={height} rx="20" width={width} />
      {role ? <text className="route-node-role" x="18" y="24">{role}</text> : null}
      <text className="route-node-title" x="18" y={role ? 51 : 38}>
        {lines.map((line, index) => (
          <tspan key={line} x="18" y={(role ? 51 : 38) + index * 19}>{line}</tspan>
        ))}
      </text>
      {detail ? <text className="route-node-detail" x="18" y={height - 17}>{detail}</text> : null}
    </g>
  );
}

function FlowPath({ d, id, tone = "accent" }: { d: string; id: string; tone?: string }) {
  return (
    <>
      <path className={`research-flow-line is-${tone} is-shadow`} d={d} />
      <path className={`research-flow-line is-${tone}`} d={d} markerEnd={`url(#${id}-arrow)`} />
    </>
  );
}

function FlowDot({ begin, d, tone = "accent" }: { begin?: string; d: string; tone?: string }) {
  return (
    <circle className={`research-flow-dot is-${tone}`} r="5">
      <animateMotion begin={begin} dur="5.8s" path={d} repeatCount="indefinite" />
    </circle>
  );
}

function SmallPill({ best, label, tone, x, y }: { best?: boolean; label: string; tone?: string; x: number; y: number }) {
  return (
    <g className={`research-small-pill${best ? " is-best" : ""}${tone ? ` is-${tone}` : ""}`}>
      <rect height="31" rx="12" width="112" x={x} y={y} />
      <text x={x + 11} y={y + 20}>{label}</text>
    </g>
  );
}

function BambooMethodMap() {
  const route = "M196 252 H244 H426 H444 H700 H718 H922 H940 H1095 H1112 H1260";
  return (
    <MethodMapFrame
      description="Experimental connection data is ranked, compared across eight models, optimized with five search strategies, and returned to structural design as a feedback loop."
      eyebrow="EXPERIMENT → MODEL SELECTION → DESIGN FEEDBACK"
      figureClass="is-bamboo"
      title="From 51 specimens to an optimized connection classifier"
    >
      <svg className="research-route-svg" viewBox="0 0 1320 620" xmlns="http://www.w3.org/2000/svg">
        <MapDefs accent="#1f6652" id="bamboo" />
        <rect className="research-map-grid" fill="url(#bamboo-grid)" height="620" rx="24" width="1320" />

        <FlowPath d="M196 252 H244" id="bamboo" />
        <FlowPath d="M426 252 H444" id="bamboo" />
        <FlowPath d="M700 252 H718" id="bamboo" />
        <FlowPath d="M922 252 H940" id="bamboo" />
        <FlowPath d="M1095 252 H1112" id="bamboo" />
        <FlowDot d={route} />

        <g className="research-input-badge" transform="translate(28 175)">
          <rect height="154" rx="24" width="168" />
          <text className="route-node-role" x="20" y="28">STRUCTURAL TESTS</text>
          <path d="M44 67h82M54 49v75M116 49v75M44 104l82-36M44 68l82 36" />
          <text className="route-node-title" x="20" y="133">51 specimens</text>
          <text className="route-node-detail" x="20" y="149">249 measurement records</text>
        </g>

        <RouteNode detail="comprehensive ranking" label={["Factor", "analysis"]} role="REDUCE + RANK" width={182} x={244} y={199} />

        <g className="research-model-panel" transform="translate(444 150)">
          <rect height="204" rx="24" width="256" />
          <text className="route-node-role" x="20" y="28">COMPARE 8 MODELS</text>
          <SmallPill label="XGBoost" x={18} y={47} />
          <SmallPill label="KNN" x={126} y={47} />
          <SmallPill best label="Random Forest" x={18} y={84} />
          <SmallPill label="Logistic Reg." x={126} y={84} />
          <SmallPill label="SVM" x={18} y={121} />
          <SmallPill label="Naive Bayes" x={126} y={121} />
          <SmallPill label="BPNN" x={18} y={158} />
          <SmallPill label="Extra Trees" x={126} y={158} />
        </g>

        <RouteNode detail="≈61% test accuracy" label={["Random Forest", "selected"]} role="BEST BASE MODEL" tone="gold" width={204} x={718} y={199} />

        <g className="research-model-panel is-optimizer" transform="translate(940 174)">
          <rect height="156" rx="24" width="155" />
          <text className="route-node-role" x="18" y="28">TUNE 5 WAYS</text>
          <text className="optimizer-list" x="18" y="56">GS · GA · PSO</text>
          <text className="optimizer-list" x="18" y="83">SA · BO</text>
          <path d="M20 111 C51 95 82 135 133 107" />
          <circle cx="132" cy="107" r="5" />
          <text className="route-node-detail" x="18" y="139">5-fold CV / 70:30</text>
        </g>

        <g className="research-best-seal" transform="translate(1112 195)">
          <circle cx="57" cy="57" r="56" />
          <circle cx="57" cy="57" r="45" />
          <text className="route-node-role" textAnchor="middle" x="57" y="40">BEST TUNER</text>
          <text className="seal-main" textAnchor="middle" x="57" y="69">BO</text>
          <text className="route-node-detail" textAnchor="middle" x="57" y="91">≈67% reported</text>
        </g>

        <g className="research-output-card" transform="translate(1238 183)">
          <rect height="138" rx="24" width="72" />
          <text className="route-node-role" transform="rotate(90 36 68)" x="-7" y="69">CONNECTION TYPE</text>
        </g>

        <path className="research-feedback-line" d="M1272 332 C1272 518 215 548 90 370" markerEnd="url(#bamboo-arrow)" />
        <circle className="research-flow-dot is-green" r="5">
          <animateMotion begin="-2.4s" dur="7.6s" path="M1272 332 C1272 518 215 548 90 370" repeatCount="indefinite" />
        </circle>
        <g className="research-feedback-label" transform="translate(476 478)">
          <rect height="42" rx="21" width="374" />
          <text x="22" y="27">prediction → specimen choice → design feedback</text>
        </g>
      </svg>
    </MethodMapFrame>
  );
}

function RobotVisionMethodMap() {
  return (
    <MethodMapFrame
      description="The review organizes robot vision as a system map: deployment architectures enable perception capabilities, which are shaped by practical constraints and matched with solution directions before industrial deployment."
      eyebrow="SYSTEM TAXONOMY → PERCEPTION → DEPLOYMENT"
      figureClass="is-robot"
      title="A technology map for vision-based robotics"
    >
      <svg className="research-route-svg" viewBox="0 0 1320 660" xmlns="http://www.w3.org/2000/svg">
        <MapDefs accent="#245f84" id="robot" />
        <rect className="research-map-grid" fill="url(#robot-grid)" height="660" rx="24" width="1320" />
        <ColumnHeading label="VISION SYSTEM" number="01" x={38} />
        <ColumnHeading label="CORE CAPABILITY" number="02" x={320} />
        <ColumnHeading label="DEPLOYMENT CHALLENGE" number="03" x={608} />
        <ColumnHeading label="SOLUTION DIRECTION" number="04" x={888} />

        <RobotIconNode icon="camera" label="Global vision" note="external workspace view" x={38} y={126} />
        <RobotIconNode icon="chip" label="Local embedded" note="on-robot perception" x={38} y={272} />
        <RobotIconNode icon="cloud" label="Cloud–edge hybrid" note="distributed inference" x={38} y={418} />

        <RouteNode detail="objects + localization" label="Object Detection" width={210} x={320} y={134} />
        <RouteNode detail="geometry + spatial state" label="3D Reconstruction" width={210} x={320} y={280} />
        <RouteNode detail="motion + context" label={["Dynamic Scene", "Understanding"]} width={210} x={320} y={426} />

        <RouteNode detail="latency / compute budget" label="Real-time" tone="wine" width={206} x={608} y={134} />
        <RouteNode detail="labels / domain shift" label="Data Scarcity" tone="wine" width={206} x={608} y={280} />
        <RouteNode detail="vision + language + control" label="Multimodal Fusion" tone="wine" width={206} x={608} y={426} />

        <RouteNode detail="efficient edge inference" label="Lightweight Models" tone="green" width={214} x={888} y={134} />
        <RouteNode detail="privacy-aware learning" label="Federated Learning" tone="green" width={214} x={888} y={280} />
        <RouteNode detail="rules meet perception" label={["Neural–Symbolic", "Systems"]} tone="green" width={214} x={888} y={426} />

        {[179, 325, 471].map((y) => (
          <g key={y}>
            <FlowPath d={`M248 ${y} H320`} id="robot" />
            <FlowPath d={`M530 ${y} H608`} id="robot" />
            <FlowPath d={`M814 ${y} H888`} id="robot" />
          </g>
        ))}
        <FlowDot d="M248 179 H320 H530 H608 H814 H888 H1102" />
        <FlowDot begin="-2s" d="M248 325 H320 H530 H608 H814 H888 H1102" tone="green" />
        <FlowDot begin="-4s" d="M248 471 H320 H530 H608 H814 H888 H1102" tone="wine" />

        <g className="robot-application-node" transform="translate(1142 214)">
          <rect height="260" rx="34" width="150" />
          <circle cx="75" cy="55" r="28" />
          <path d="M75 83v55M45 108h60M55 138l-16 58M95 138l16 58M45 104l-22 44M105 104l22 44" />
          <circle cx="65" cy="51" r="3" /><circle cx="85" cy="51" r="3" />
          <text className="route-node-role" textAnchor="middle" x="75" y="222">OUTPUT</text>
          <text className="robot-output-title" textAnchor="middle" x="75" y="245">Industrial robots</text>
        </g>
        <FlowPath d="M1102 179 C1130 179 1117 265 1142 265" id="robot" />
        <FlowPath d="M1102 325 H1142" id="robot" />
        <FlowPath d="M1102 471 C1130 471 1117 410 1142 410" id="robot" />
      </svg>
    </MethodMapFrame>
  );
}

function ColumnHeading({ label, number, x }: { label: string; number: string; x: number }) {
  return (
    <g className="research-column-heading" transform={`translate(${x} 76)`}>
      <text className="column-number" x="0" y="0">{number}</text>
      <text x="37" y="0">{label}</text>
      <path d="M0 18h218" />
    </g>
  );
}

function RobotIconNode({ icon, label, note, x, y }: { icon: "camera" | "chip" | "cloud"; label: string; note: string; x: number; y: number }) {
  return (
    <g className="robot-icon-node" transform={`translate(${x} ${y})`}>
      <rect height="106" rx="20" width="210" />
      <g className="robot-glyph" transform="translate(18 22)">
        {icon === "camera" ? <><rect height="36" rx="7" width="50" y="8" /><circle cx="25" cy="26" r="10" /><path d="M14 8l5-8h16l5 8" /></> : null}
        {icon === "chip" ? <><rect height="44" rx="7" width="44" x="3" /><rect height="20" rx="3" width="20" x="15" y="12" /><path d="M0 10h-8M0 22h-8M0 34h-8M50 10h8M50 22h8M50 34h8" /></> : null}
        {icon === "cloud" ? <><path d="M8 42h37c15 0 17-22 3-26C44 3 27 0 19 11 6 7-2 21 8 29 1 33 2 42 8 42z" /><path d="M26 24v27M16 34l10-10 10 10" /></> : null}
      </g>
      <text className="route-node-title" x="82" y="43">{label}</text>
      <text className="route-node-detail" x="82" y="70">{note}</text>
    </g>
  );
}

function MoeMethodMap() {
  return (
    <MethodMapFrame
      description="Tokens are routed to a small set of experts, aggregated, then studied across seven representative MoE families and five benchmark dimensions to explain the capacity–compute trade-off."
      eyebrow="SPARSE ROUTING → ARCHITECTURE EVOLUTION → BENCHMARK"
      figureClass="is-moe"
      title="How MoE activates capacity without activating every parameter"
    >
      <svg className="research-route-svg" viewBox="0 0 1320 680" xmlns="http://www.w3.org/2000/svg">
        <MapDefs accent="#6d3f50" id="moe" />
        <rect className="research-map-grid" fill="url(#moe-grid)" height="680" rx="24" width="1320" />

        <g className="moe-token-stack" transform="translate(36 198)">
          <text className="route-node-role" x="0" y="-24">INPUT TOKENS</text>
          {[0, 1, 2, 3].map((index) => <rect height="52" key={index} rx="14" width="124" x={index * 8} y={index * 10} />)}
          <text className="moe-token-text" x="62" y="35">TOKEN</text>
        </g>
        <RouteNode detail="score experts / top-k" label={["Router", "+ Gate"]} role="SPARSE DECISION" tone="wine" width={174} x={214} y={186} />

        <g className="moe-expert-bank" transform="translate(446 116)">
          <rect height="250" rx="28" width="292" />
          <text className="route-node-role" x="22" y="31">EXPERT BANK · TOP-2 ACTIVE</text>
          {[{x:65,y:92,l:"E1",a:true},{x:207,y:92,l:"E2",a:false},{x:65,y:190,l:"E3",a:false},{x:207,y:190,l:"E4",a:true}].map((expert) => (
            <g className={expert.a ? "moe-expert is-active" : "moe-expert"} key={expert.l}>
              <circle cx={expert.x} cy={expert.y} r="39" />
              <text textAnchor="middle" x={expert.x} y={expert.y + 6}>{expert.l}</text>
              {expert.a ? <circle className="expert-orbit" cx={expert.x} cy={expert.y} fill="none" r="48" /> : null}
            </g>
          ))}
          <path className="moe-gate-line is-active" d="M-58 123 C-14 123 10 92 26 92" />
          <path className="moe-gate-line" d="M-58 123 C-14 123 130 92 168 92" />
          <path className="moe-gate-line" d="M-58 123 C-14 123 10 190 26 190" />
          <path className="moe-gate-line is-active" d="M-58 123 C-14 123 130 190 168 190" />
        </g>

        <RouteNode detail="weighted expert outputs" label={["Token-level", "aggregation"]} role="MERGE" tone="gold" width={190} x={792} y={186} />
        <FlowPath d="M160 239 H214" id="moe" />
        <FlowPath d="M388 239 H446" id="moe" />
        <FlowPath d="M738 239 H792" id="moe" />
        <FlowDot d="M160 239 H214 H388 H446" />
        <FlowDot begin="-2.9s" d="M738 239 H792 H982" tone="gold" />

        <g className="moe-result-card" transform="translate(1034 126)">
          <rect height="214" rx="28" width="250" />
          <text className="route-node-role" x="24" y="31">EFFICIENCY RESULT</text>
          <text className="moe-result-number" x="24" y="105">≥50%</text>
          <text className="moe-result-copy" x="24" y="135">less inference compute</text>
          <path d="M26 166h198" />
          <text className="route-node-detail" x="24" y="191">performance preserved</text>
        </g>
        <FlowPath d="M982 239 H1034" id="moe" />

        <g className="moe-evolution-track" transform="translate(38 430)">
          <text className="route-node-role" x="0" y="0">7 REPRESENTATIVE ARCHITECTURE FAMILIES</text>
          <path d="M0 68 H862" />
          {[
            ["GLaM", 0], ["Switch", 128], ["DeepSpeed-MoE", 256], ["PR-MoE", 384],
            ["Mixtral", 512], ["DBRX", 640], ["DeepSeek-V3", 768],
          ].map(([label, x], index) => (
            <g className="moe-timeline-stop" key={label} transform={`translate(${x} 68)`}>
              <circle r={index === 6 ? 9 : 6} />
              <text textAnchor="middle" x="0" y={index % 2 ? 43 : -22}>{label}</text>
            </g>
          ))}
          <circle className="research-flow-dot is-wine" r="5">
            <animateMotion dur="7s" path="M0 68 H862" repeatCount="indefinite" />
          </circle>
        </g>

        <g className="moe-benchmark-panel" transform="translate(950 418)">
          <rect height="184" rx="24" width="334" />
          <text className="route-node-role" x="22" y="29">BENCHMARK · 5 DIMENSIONS</text>
          {[["Aggregate",22,48],["Commonsense",170,48],["Knowledge",22,88],["Code",170,88],["Math",96,128]].map(([label,x,y]) => (
            <SmallPill best={label === "Code" || label === "Math"} key={label} label={String(label)} x={Number(x)} y={Number(y)} />
          ))}
        </g>
        <FlowPath d="M900 498 H950" id="moe" />
        <FlowPath d="M1117 418 C1117 376 1159 378 1159 340" id="moe" />
      </svg>
    </MethodMapFrame>
  );
}

function DigitalTradeMethodMap() {
  return (
    <MethodMapFrame
      description="The paper combines frontier estimation, machine-learning forecasting, and two mediation paths to explain and project digital-service export potential across Belt and Road countries."
      eyebrow="PANEL DATA → FRONTIER ESTIMATION → MEDIATION + FORECAST"
      figureClass="is-digital"
      title="Three analytical lanes, one export-potential decision system"
    >
      <svg className="research-route-svg" viewBox="0 0 1320 690" xmlns="http://www.w3.org/2000/svg">
        <MapDefs accent="#315f89" id="digital" />
        <rect className="research-map-grid" fill="url(#digital-grid)" height="690" rx="24" width="1320" />

        <g className="digital-data-node" transform="translate(34 222)">
          <rect height="170" rx="26" width="190" />
          <text className="route-node-role" x="22" y="29">PANEL INPUT</text>
          <text className="digital-data-number" x="22" y="89">36</text>
          <text className="route-node-title" x="92" y="69">BRI</text>
          <text className="route-node-title" x="92" y="91">countries</text>
          <path d="M22 111h146" />
          <text className="route-node-detail" x="22" y="139">2013–2021 · bilateral data</text>
        </g>

        <RouteNode detail="one-step frontier estimation" label="SFGM" role="MAIN MODEL" width={190} x={278} y={130} />
        <RouteNode detail="efficiency + untapped potential" label={["Trade efficiency", "+ export potential"]} role="ESTIMATE" tone="gold" width={224} x={520} y={130} />
        <FlowPath d="M224 278 C252 278 248 183 278 183" id="digital" />
        <FlowPath d="M468 183 H520" id="digital" />
        <FlowDot d="M224 278 C252 278 248 183 278 183 H744" />

        <g className="digital-lane-label" transform="translate(278 344)">
          <rect height="36" rx="18" width="470" />
          <text x="20" y="24">FORECAST LANE · RFE → XGBOOST → GA → 2022–2028</text>
        </g>
        <RouteNode detail="retain key variables" label="RFE" width={132} x={278} y={405} />
        <RouteNode detail="non-linear forecast" label="XGBoost" width={150} x={458} y={405} />
        <RouteNode detail="hyperparameter search" label="Genetic Algorithm" tone="wine" width={188} x={656} y={405} />
        <RouteNode detail="DEI / openness trajectories" label={["2022–2028", "forecast"]} tone="gold" width={180} x={892} y={405} />
        <FlowPath d="M224 338 C252 338 248 458 278 458" id="digital" />
        <FlowPath d="M410 458 H458" id="digital" />
        <FlowPath d="M608 458 H656" id="digital" />
        <FlowPath d="M844 458 H892" id="digital" />
        <FlowDot begin="-2s" d="M224 338 C252 338 248 458 278 458 H1072" tone="wine" />

        <g className="digital-mediation-panel" transform="translate(790 80)">
          <rect height="268" rx="28" width="492" />
          <text className="route-node-role" x="23" y="31">MEDIATION PATHS</text>
          <RouteNode detail="exporter-side development" label={["Digital Economy", "Index"]} width={155} x={22} y={64} />
          <RouteNode detail="partial mediation" label={["Service value-added", "share"]} tone="green" width={156} x={212} y={45} />
          <RouteNode detail="full mediation" label={["Digital Technology", "Index"]} tone="green" width={156} x={212} y={145} />
          <path className="research-flow-line is-accent" d="M177 117 H212" markerEnd="url(#digital-arrow)" />
          <path className="research-flow-line is-accent" d="M177 117 C195 117 194 198 212 198" markerEnd="url(#digital-arrow)" />
          <path className="research-flow-line is-green" d="M368 98 H436" markerEnd="url(#digital-arrow)" />
          <path className="research-flow-line is-green" d="M368 198 H436" markerEnd="url(#digital-arrow)" />
          <text className="digital-export-label" textAnchor="middle" x="447" y="132">DIGITAL</text>
          <text className="digital-export-label" textAnchor="middle" x="447" y="152">SERVICE</text>
          <text className="digital-export-label" textAnchor="middle" x="447" y="172">EXPORTS</text>
        </g>

        <g className="digital-policy-output" transform="translate(1120 405)">
          <rect height="172" rx="28" width="162" />
          <text className="route-node-role" x="22" y="29">OUTPUT</text>
          <text className="policy-line" x="22" y="66">Infrastructure</text>
          <text className="policy-line" x="22" y="96">Facilitation</text>
          <text className="policy-line" x="22" y="126">Integration</text>
          <path d="M22 145h116" />
          <text className="route-node-detail" x="22" y="162">policy directions</text>
        </g>
        <FlowPath d="M1072 458 H1120" id="digital" />
        <FlowPath d="M1036 348 C1036 374 1201 375 1201 405" id="digital" />
      </svg>
    </MethodMapFrame>
  );
}
