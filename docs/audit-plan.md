# PMC Site — Audit + Fix Plan (executed)

Date: 2026-01-28 (local)
Repo: `/Users/briandai/Documents/pmc-site-surya` (branch `surya-branch`)

## Current status (2026-01-29)
- Gate: ✅ `npm ci`, ✅ `npm run lint`, ✅ `npm run typecheck`, ✅ `npm run check:assets`, ✅ `npm run build`, ✅ `npm audit --audit-level=high`
- Note: `next build` warns that Edge runtime routes disable SSG for those routes (`/opengraph-image`, `/twitter-image`) — expected.

## Intake (quick answers help; optional)
- “Fix all problems” scope: strict (treat warnings as bugs) vs pragmatic?
- Deploy target: Vercel vs static export vs self-host?
- Dependency policy: no new deps vs small deps ok?

Assumptions (until you answer): strict audit, Vercel, no new deps.

## Baseline findings (was true at start)
- Security: `npm audit` reported a critical in `next@15.1.9` (fixed via upgrade).
- Next config: `next build` warned `next.config.ts` had an invalid key `turbopack` (fixed).
- Lint: `eslint` produced many warnings due to warn-downgrade config (fixed).
- Deps: deprecated/duplicate scroll deps (fixed).

## Success criteria (definition of “done”)
- `npm ci` clean; `npm audit` => 0 critical/high (or explicitly accepted + documented).
- `npm run lint` => 0 warnings (or gated budget: e.g. <=5 w/ owner + expiry).
- `npm run build` => 0 warnings + production build succeeds.
- A11y: keyboard nav works; reduced motion supported; no obvious WCAG failures on key pages.
- SEO/metadata: titles/descriptions/OG tags correct per route; sitemap/robots sane.
- Perf: LCP/CLS improved vs baseline; no major animation jank regressions.
- CI: automatic gate for PRs (lint/build/typecheck/audit).

## Skills to use (mapped to work)
- `context7`: Next.js/Tailwind/Lenis/Supabase API/config changes before edits.
- `fixing-metadata`: titles, OpenGraph, icons, robots/sitemap, structured data.
- `fixing-accessibility`: semantics, focus, keyboard, reduced motion, contrast.
- `fixing-motion-performance`: GSAP/Framer/Motion/Lenis perf, scroll/RAF loops.
- `vercel-react-best-practices`: bundle/perf patterns for Next/React.
- `Frontend Responsive Design Standards`: breakpoint/layout/touch targets.
- `baseline-ui`: prevent “UI slop” if UI polish/refactor needed.
- `oracle`: second-model review for risky refactors or stubborn regressions.

## Execution plan (phased; small PRs; keep diffs reviewable)

### Phase 0 — Lock the baseline
Goal: reproducible starting point + measurable outputs.
- Capture outputs: `npm audit`, `npm run lint`, `npm run build`.
- Decide policy: warning budget + dep upgrade policy + deploy target.
- Add/confirm “gate” script list: `lint`, `build`, `typecheck` (if missing), `audit`.

### Phase 1 — Security + dependency hygiene (highest leverage)
Goal: eliminate critical/high vulns; remove deprecated/duplicate deps.
- Upgrade `next` to patched version (per `npm audit` fix recommendation).
- Re-run `npm audit` and ensure no new critical/high issues.
- Remove `@studio-freight/lenis` (migrate imports to `lenis`); dedupe `lenis` usage.
- Sanity-check `package-lock.json` integrity; keep changes minimal.

### Phase 2 — Next config correctness
Goal: eliminate config warnings; align with Next 15+ config schema.
- Fix/remove `turbopack` key in `next.config.ts` (use current supported config).
- Confirm dev workflow still supports desired bundler (Turbopack vs webpack) via CLI flags.
- Re-run `npm run build` to ensure config warning is gone.

### Phase 3 — Lint + TypeScript hardening (zero-warning target)
Goal: stop hiding issues; gradually make lint meaningful without big-bang churn.
- Change ESLint rules from warn -> error in a controlled order:
  - unused vars/imports
  - hook deps correctness
  - `any` cleanup in hotspots
  - `next/image` migration where worth it (LCP pages first)
- Fix issues file-by-file; keep each PR narrow (one subsystem at a time).
- Add a “temporary allowlist” only if needed (with expiry date + owner).

### Phase 4 — A11y pass (app router pages)
Goal: obvious WCAG failures gone; navigation usable without mouse.
- Keyboard/focus: visible focus rings; skip-to-content; logical tab order.
- Motion: respect `prefers-reduced-motion`; disable heavy scroll effects when requested.
- Images: `alt` coverage; decorative images empty-alt; avoid `<img>` where Next Image helps.
- Forms/CTA: proper labels/roles; aria only when necessary.

### Phase 5 — Metadata + SEO correctness
Goal: correct previews + indexing posture.
- Use Next metadata APIs per route: titles, descriptions, OG/Twitter cards.
- Add `robots.txt` + `sitemap.xml` strategy (static + dynamic routes).
- Validate canonical URLs, `not-found`, and social preview images.

### Phase 6 — Performance + motion/3D stabilization
Goal: no jank; controlled CPU/GPU; better LCP/CLS.
- Audit scroll-linked effects (Lenis/GSAP/Motion): avoid layout thrash; throttle/RAF hygiene.
- Defer heavy 3D work off critical path; lazy-load scenes; reduce texture cost.
- Image optimization: sizes, priority, placeholder, responsive variants.
- Measure: Lighthouse (mobile) + basic runtime profiling; compare against baseline.

### Phase 7 — CI gate + repo hygiene
Goal: “green or it doesn’t land”.
- Add CI workflow: `npm ci`, `npm run lint`, `npm run build`, `npm audit` (policy-driven).
- Optional (if allowed): typecheck step explicit (`tsc --noEmit`) to catch drift.
- Document local “gate” commands in `README.md`.

## Testing / verification checklist (per PR)
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm audit`
- Smoke: `npm run dev` + click-through key routes (`/`, people, programs)

## Risks (and mitigations)
- Next upgrade regressions: mitigate w/ small upgrade PR + immediate rollback path.
- Perf regressions from “fixing lint”: mitigate w/ measure-before/after + staged refactors.
- Image migration costs: mitigate w/ prioritize above-the-fold only first.
- Self-critique: this plan assumes Vercel + default Next behaviors; if hosting differs, some steps change.
- Self-critique: “fix all problems” can balloon; needs a strict definition of “problem” + warning budget.

## Rollback plan
- Keep PRs small; revert single PR if regression.
- Tag pre-audit baseline (or record commit SHA) before dependency upgrades.

## Open questions (blocking definitions)
- What’s the deploy target + env var setup (Supabase keys, domains)?
- Any pages/routes “must not change” visually (pixel lock)?
- Are we allowed to add test deps (Playwright/Vitest) later if needed?
