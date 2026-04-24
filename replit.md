# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **AI Nexus** (`artifacts/ai-nexus`) — 8-page educational website about Artificial
  Intelligence, built with **pure HTML, CSS, and JavaScript** (no React, no
  Tailwind, no frameworks). Served by Vite as a multi-page static site at `/`.
  - Pages: `index.html`, `pages/about.html`, `pages/basics.html`,
    `pages/tech.html`, `pages/applications.html`, `pages/comparison.html`,
    `pages/login.html`, `pages/contact.html`
  - Shared CSS: `css/style.css` · Shared JS: `js/script.js` · Images: `images/`
  - Login & contact forms have client-side JS validation with feedback messages.

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
- `pnpm --filter @workspace/ai-nexus run dev` — run AI Nexus static site locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
