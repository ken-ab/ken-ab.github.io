import { BrainCircuit, Database, Medal, Trophy, UsersRound } from "lucide-react";

type MethodStep = {
  label: string;
  title: string;
  body: string;
};

type OlympicMethodRouteProps = {
  steps: MethodStep[];
};

const quickRoute = [
  {
    semantic: "INPUT",
    icon: Database,
    signals: ["1896–2024", "Medals · events · athletes"],
  },
  {
    semantic: "PROCESS 01",
    icon: UsersRound,
    signals: ["K-means · 234 nations", "Factor analysis"],
  },
  {
    semantic: "PROCESS 02",
    icon: BrainCircuit,
    signals: ["MPXG + FMPM", "ARIMA · XGBoost · FCNN"],
  },
  {
    semantic: "OUTPUT",
    icon: Medal,
    signals: ["2028 forecast", "Host + coach effects"],
  },
];

export function OlympicMethodRoute({ steps }: OlympicMethodRouteProps) {
  return (
    <div className="olympic-method-experience">
      <figure className="olympic-technical-map">
        <div className="olympic-map-header">
          <div>
            <span>Custom technical map</span>
            <strong>One dataset. Two prediction paths. One interpretable forecast.</strong>
          </div>
          <span className="olympic-live-indicator"><i aria-hidden="true" /> animated data flow</span>
        </div>

        <div className="olympic-svg-scroll" role="img" aria-labelledby="olympic-map-title olympic-map-description">
          <svg className="olympic-route-svg" viewBox="0 0 1180 610" xmlns="http://www.w3.org/2000/svg">
            <title id="olympic-map-title">Dual-model technical route for the Olympic medal prediction paper</title>
            <desc id="olympic-map-description">
              Historical Olympic data is split into an MPXG medal prediction path and an FMPM first-medal prediction path, then combined with host and great-coach effect analysis.
            </desc>
            <defs>
              <pattern id="olympic-paper-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
              </pattern>
              <marker id="olympic-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
              </marker>
              <filter id="olympic-pencil" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence baseFrequency="0.012" numOctaves="1" result="noise" seed="7" type="fractalNoise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.65" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            <rect className="olympic-svg-grid" height="610" rx="24" width="1180" />

            <g className="olympic-svg-input" filter="url(#olympic-pencil)">
              <rect height="178" rx="24" width="190" x="28" y="216" />
              <text className="olympic-svg-role" x="52" y="246">INPUT</text>
              <ellipse cx="104" cy="289" rx="45" ry="13" />
              <path d="M59 289v44c0 8 20 14 45 14s45-6 45-14v-44" />
              <path d="M59 311c0 8 20 14 45 14s45-6 45-14" />
              <text className="olympic-svg-title" x="52" y="370">Olympic history</text>
              <text className="olympic-svg-note" x="52" y="388">1896–2024</text>
              <path className="olympic-svg-spark" d="M171 265l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
            </g>

            <path className="olympic-svg-sketch-path is-ghost" d="M218 306 C270 306 265 162 330 162 H981 C1017 162 1010 255 1044 275" />
            <path className="olympic-svg-sketch-path" d="M218 304 C270 304 268 168 330 168 H980 C1014 168 1009 258 1044 279" id="olympic-top-flow" markerEnd="url(#olympic-arrow)" />
            <path className="olympic-svg-sketch-path is-ghost" d="M218 310 C270 310 265 451 330 451 H981 C1017 451 1010 358 1044 338" />
            <path className="olympic-svg-sketch-path" d="M218 308 C270 308 268 445 330 445 H980 C1014 445 1009 355 1044 334" id="olympic-bottom-flow" markerEnd="url(#olympic-arrow)" />

            <circle className="olympic-flow-dot is-top" r="6">
              <animateMotion dur="6.8s" path="M218 304 C270 304 268 168 330 168 H980 C1014 168 1009 258 1044 279" repeatCount="indefinite" />
            </circle>
            <circle className="olympic-flow-dot is-bottom" r="6">
              <animateMotion begin="-3.4s" dur="6.8s" path="M218 308 C270 308 268 445 330 445 H980 C1014 445 1009 355 1044 334" repeatCount="indefinite" />
            </circle>

            <g className="olympic-svg-branch-label">
              <rect height="42" rx="21" width="326" x="317" y="54" />
              <text x="340" y="80">PROCESS A · MPXG MEDAL FORECAST</text>
            </g>
            <g className="olympic-svg-branch-label is-second">
              <rect height="42" rx="21" width="335" x="317" y="514" />
              <text x="340" y="540">PROCESS B · FMPM FIRST MEDAL</text>
            </g>

            <SvgNode detail="234 nations" label="K-means" x={316} y={119} />
            <SvgNode detail="10 → 3 factors" label="Factor analysis" x={496} y={119} />
            <SvgNode detail="ARIMA(3,1,2)" label="2028 features" x={676} y={119} />
            <SvgNode detail="best performer" label="XGBoost" x={856} y={119} />

            <SvgNode detail="country records" label="Participation" x={316} y={396} />
            <SvgNode detail="2028 estimate" label="ARIMA forecast" x={496} y={396} />
            <SvgNode detail="64 → 32 → 1" label="Three-layer FCNN" x={676} y={396} />
            <SvgNode detail="first medal" label="Probability" x={856} y={396} />

            <g className="olympic-svg-output" filter="url(#olympic-pencil)">
              <rect height="244" rx="28" width="126" x="1036" y="183" />
              <text className="olympic-svg-role" x="1056" y="214">OUTPUT</text>
              <path d="M1080 238h38v12c0 17-9 27-19 27s-19-10-19-27z" />
              <path d="M1089 278h20v12h-20zM1080 290h38" />
              <path d="M1080 246h-11c0 15 6 23 17 25M1118 246h11c0 15-6 23-17 25" />
              <text className="olympic-svg-title is-output" x="1056" y="326">2028</text>
              <text className="olympic-svg-note" x="1056" y="346">medal forecast</text>
              <line x1="1056" x2="1142" y1="365" y2="365" />
              <text className="olympic-svg-note is-strong" x="1056" y="386">Host effect</text>
              <text className="olympic-svg-note is-strong" x="1056" y="407">Coach effect</text>
            </g>

            <g className="olympic-svg-annotation">
              <path d="M748 278c32-32 64-38 97-17" />
              <text x="684" y="290">two models answer different questions</text>
            </g>
          </svg>
        </div>
        <figcaption>
          The technical map separates medal-count forecasting from first-medal probability, then reconnects both results to interpretable host and coaching effects.
        </figcaption>
      </figure>

      <div className="olympic-fast-route-heading">
        <span>FAST SCAN · 4 STAGES</span>
        <p>Follow the moving signal from historical records to an explainable 2028 forecast.</p>
      </div>

      <div className="olympic-animated-route" role="list" aria-label="Four-stage animated Olympic prediction route">
        {steps.map((step, index) => {
          const route = quickRoute[index];
          const Icon = route.icon;

          return (
            <article className="olympic-route-stage" data-stage={index + 1} key={step.label} role="listitem">
              <div className="olympic-route-glyph">
                <span className="olympic-stage-number">0{index + 1}</span>
                <span className="olympic-glyph-orbit" aria-hidden="true">
                  <i className="olympic-orbit-dot is-a" />
                  <i className="olympic-orbit-dot is-b" />
                </span>
                <Icon aria-hidden="true" size={31} strokeWidth={1.7} />
                {index === 3 ? <Trophy aria-hidden="true" className="olympic-result-spark" size={15} /> : null}
              </div>

              <div className="olympic-route-copy">
                <span className="olympic-route-semantic">{route.semantic}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <div className="olympic-route-signals" aria-label="Key methods and evidence">
                  {route.signals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
              </div>

              {index < steps.length - 1 ? (
                <span className="olympic-route-connector" aria-hidden="true">
                  <i />
                </span>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

type SvgNodeProps = {
  detail: string;
  label: string;
  x: number;
  y: number;
};

function SvgNode({ detail, label, x, y }: SvgNodeProps) {
  return (
    <g className="olympic-svg-node" transform={`translate(${x} ${y})`}>
      <rect height="98" rx="18" width="152" />
      <circle cx="24" cy="27" r="8" />
      <path d="M40 27h84" />
      <text className="olympic-svg-node-title" x="18" y="58">{label}</text>
      <text className="olympic-svg-node-detail" x="18" y="80">{detail}</text>
    </g>
  );
}
