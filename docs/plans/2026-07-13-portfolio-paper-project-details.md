# Paper Routes and Mini-program Detail Pages

## Direction

Extend the existing editorial portfolio rather than introducing a second visual system. Paper briefs use animated technical-map SVGs with shared input, processing, output, connector, and reduced-motion semantics. Mini-program briefs use a separate deployment-evidence template centered on QR entry, dated metrics, captured running screens, system flow, and delivery evidence.

## Architecture

- Keep the public hash route `/brief/:id`.
- Model detail data as a `kind`-discriminated union: `publication`, `agent-project`, or `mini-program`.
- Select paper-specific method maps through `methodVisualization`.
- Store mini-program screenshots, QR codes, metrics, features, and system flow in typed case-study data.
- Never request authenticated analytics from the public portfolio. Publish dated, verified snapshots only.

## Verification

- Compare each paper route against the source PDF.
- Verify desktop and 390 px layouts, global overflow, image scaling, and reduced-motion behavior.
- Build with TypeScript and Vite before publishing.
- Check deployed hash routes and assets after GitHub Pages completes.
