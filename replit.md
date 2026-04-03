# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Portfolio — MGS Codec Portfolio (artifacts/portfolio)
- **Type**: React + Vite, frontend-only (no backend)
- **Route**: `/` (root)
- **Theme**: Metal Gear Solid CODEC communication system
- **Description**: Immersive personal portfolio for Asfand Khan (junior software developer) styled as an MGS Codec call screen
- **Key files**:
  - `src/App.tsx` — main codec interface, navigation logic, audio synthesis
  - `src/data/portfolio.ts` — all portfolio content (sections, skills, projects, timeline, contact)
  - `src/components/PortraitPanel.tsx` — SVG character portrait panels
  - `src/components/SectionContent.tsx` — all section content renderers
  - `src/components/TypewriterText.tsx` — typewriter text animation for codec dialogue
  - `src/index.css` — full CRT aesthetic: scanlines, phosphor glow, flicker, animations
- **Fonts**: VT323, Share Tech Mono, Orbitron (via Google Fonts in index.html)
- **Features**:
  - Frequency-based navigation (◄ ► arrows or keyboard)
  - 6 sections: Home, About, Skills, Projects, Experience, Contact
  - CRT scanline + vignette overlay
  - Typewriter dialogue at the bottom
  - Web Audio API sound effects (muted by default, toggle available)
  - Boot sequence animation
  - Static/noise transition effect between frequencies
  - SVG character portrait panels
  - Responsive for mobile
