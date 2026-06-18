# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server with HMR
npm run build      # tsc -b + vite build (type-check first)
npm run lint       # ESLint across all .ts/.tsx files
npm run preview    # serve the production build locally
```

There are no tests configured yet.

## Architecture

**Stack**: React 19, TypeScript 6, Vite 8, Tailwind CSS v4, TanStack Router, TanStack Query, Zustand, React Hook Form + Zod, i18next, Axios, Motion (Framer Motion), Lucide React icons, Sonner toasts, `clsx` + `tailwind-merge`.

**CSS / Design System** — Tailwind v4 is configured entirely through CSS, not a JS config file:

- `src/css/Index.css` — root entry: imports `tailwindcss`, then `theme.css`, `globals.css`, `helpers.css`
- `src/css/theme.css` — all design tokens live here inside `@theme { … }`: color palette, neumorphic shadow presets (`--shadow-nm-raised`, `--shadow-nm-inset`, `--shadow-nm-pressed`, `--shadow-nm-accent-raised`), z-index scale (`--z-sidebar`, `--z-bottom-nav`, `--z-modal`), responsive type scale
- `src/css/globals.css` — `@layer base` global resets (dark color-scheme, fonts, links, inputs, focus-visible style using `--color-accent`, text selection)

The design language is **dark neumorphic** with a "Mining Gold" accent (`--color-accent: #C9A347`). Primary background is `#1E1E20`. Use the shadow tokens via `shadow-nm-*` Tailwind utilities rather than raw box-shadow values.

Fonts: **Inter** (`--font-sans`, body/data) and **Space Grotesk** (`--font-display`, headings/tables). Headings and `th` elements inherit `font-display` automatically via `globals.css`.

**Routing** — TanStack Router (`@tanstack/react-router`).

**Server state** — TanStack Query (`@tanstack/react-query`) for API calls. HTTP transport via Axios.

**Client state** — Zustand stores.

**Forms** — React Hook Form + `@hookform/resolvers` with Zod v4 schemas for validation.

**i18n** — i18next + `react-i18next` + `i18next-browser-languagedetector`. UI strings should be externalized through i18next rather than hardcoded.

**Components** live in `src/Components/`. Currently only `Button.tsx` exists.

## TypeScript strictness

`tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly`. Keep imports and parameters clean — unused ones are compile errors. `allowImportingTsExtensions` is on, so `.tsx` extensions in imports are fine and required.