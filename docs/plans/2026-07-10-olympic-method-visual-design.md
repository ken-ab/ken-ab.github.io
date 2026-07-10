# Olympic Method / System Visual Design

## Goal

Prototype a richer Method / System section only for the Olympic medal prediction case study. Keep the other five case-study pages unchanged until the visual direction is approved.

## Two-layer design

1. A custom inline SVG explains the paper's actual dual-model architecture. Historical Olympic data enters from the left, then splits into the medal-prediction branch (MPXG) and first-medal branch (FMPM). Both outputs feed the interpretation layer for host and great-coach effects.
2. A four-stage animated route provides the fast-scanning version: historical data, country grouping, dual prediction, and effect explanation. Large symbols, directional connectors, and moving light particles make the order explicit.

The SVG uses slightly irregular curved paths, rounded marker-like strokes, and a paper-grid background to feel drawn for this paper rather than generated from a generic card template. The animation is restrained and disabled when the user prefers reduced motion.

## Verification

- Confirm only `/brief/olympic-prediction` receives the new component.
- Check desktop and narrow-screen layouts.
- Confirm SVG labels remain legible and the dynamic route preserves input/process/output order.
- Run the production build with the GitHub Pages base path.
