# Draft: Comprehensive Performance Optimization

## Requirements (confirmed)
- User reports site is "incredibly slow" especially during scrolling and interactions
- User wants comprehensive codebase audit + implementation of all optimizations
- Site: PMC (NYU Product Management Club) — Next.js 16, React 19, App Router
- No test infrastructure exists — all QA will be agent-executed via Playwright/Bash

## Tech Stack
- Next.js 16, React 19, TypeScript 5, Tailwind CSS v4
- Animation: GSAP 3.14 + ScrollTrigger, Motion (Framer Motion) 12.29, Lenis 1.3
- 3D/WebGL: Three.js 0.182, React Three Fiber 9.5, React Three Rapier 2.2, UnicornStudio
- Other: Million.js 3.1, lucide-react, Supabase

## Research Findings — 6 Parallel Agent Audits

### CATEGORY 1: 3D/WebGL Bottlenecks (CRITICAL)
- **UnicornStudio**: 2-3 WebGL iframes running simultaneously, never paused when off-screen
  - HeroScene.tsx: loads on mount, no viewport detection
  - HomeProgramsSection.tsx: 3 UnicornStudio instances per program card (!)
  - Newsletter.tsx: lazy-loaded but aggressive 200px rootMargin
- **R3F Canvas**: RocketScene.tsx and Lanyard.tsx missing `frameloop="demand"`
- **CSS 3D scenes**: PlantsScene.tsx (8+ anims), CandleScene.tsx (4+ anims) — never pause off-screen
- **HeroWarpCanvas**: 45fps continuous rendering, heavy dithering algorithm
- **Missing disposal**: RocketScene and Lanyard don't dispose geometries/materials

### CATEGORY 2: Scroll/Animation Bottlenecks (CRITICAL)
- **Lenis + ScrollTrigger conflict**: Double repaints — Lenis scroll → RAF → ScrollTrigger.update()
- **Lenis RAF at 50fps**: SmoothScroll.tsx line 53, frameInterval = 1000/50
- **Timeline.tsx**: 10 useTransform hooks doing hex→RGB color math on every scroll frame
- **GSAP scrub: 0.5**: GsapScrollEffects.tsx — continuous scroll-linked animation
- **backdrop-blur on fixed navbar**: Entire viewport recomposited on every scroll
- **Missing IntersectionObserver pause**: Most animations run even when off-screen

### CATEGORY 3: Bundle/Loading Bottlenecks (HIGH)
- **Client boundary too high**: Providers.tsx and SmoothScroll.tsx both 'use client', wrapping ALL children
- **Lanyard.tsx not dynamically imported**: Heavy 3D + physics engine loaded eagerly
- **Newsletter.tsx not dynamically imported**: UnicornStudio loaded eagerly
- **GSAP imported in 2 separate files**: Duplicate bundle code
- **Home page loads ~800 lines of client code eagerly**: All 4 sections imported directly
- **Raw <img> tags**: mentorship and case-comp pages using unoptimized images
- **Million.js**: Unnecessary with React 19 — adds complexity, may conflict with Motion/R3F

### CATEGORY 4: CSS/Paint Bottlenecks (HIGH)
- **ProgressiveBlur**: 8 stacked backdrop-filter layers — EXTREMELY expensive
- **Navbar backdrop-blur-lg/xl**: Fixed position + backdrop-filter = viewport blur on every scroll
- **Spotlight feGaussianBlur stdDeviation="151"**: Insanely high blur radius
- **CandleScene transitions**: width, height, top (layout properties!) being animated
- **animate-[spin_2s_linear_infinite]**: 3 instances of infinite spinning gradients (Button, AnimatedCursor, Newsletter)
- **mix-blend-mode**: 20+ usages across components causing compositing overhead

### CATEGORY 5: Component Rendering Bottlenecks (MEDIUM-HIGH)
- **AsciiHoverEffect**: Canvas ASCII art with global mousemove, per-frame Math.sqrt for every cell
- **TiltedCard**: Per-mousemove rotation calc, 5 Spring animations, no React.memo
- **InteractivePolaroids**: 5 Springs per card, per-mousemove tilt, ResizeObserver per card
- **TextAnimate**: Text splitting on every render, no useMemo
- **LogoLoop**: RAF animation loop + multiple ResizeObservers
- **Multiple scroll listeners**: Navbar, Timeline, AsciiHoverEffect all listening independently

### CATEGORY 6: Best Practices Research
- Remove Million.js — React 19 Compiler is sufficient
- R3F: frameloop="demand", manual invalidate(), dispose resources
- GSAP + Lenis: sync with gsap.ticker, debounced ScrollTrigger.refresh
- Motion: prefer transforms over layout animations, use motion values
- Progressive blur: replace with gradient-based fallback, limit to 2-3 blur layers max
- Single scroll listener pattern instead of multiple

## Scope Boundaries
- INCLUDE: All performance optimizations across the entire codebase
- INCLUDE: All 12 pages and shared components
- INCLUDE: Build/bundle optimizations
- EXCLUDE: Feature changes, design changes, new features
- EXCLUDE: Backend/API optimization (Supabase)
- EXCLUDE: SEO changes (unless directly related to performance)

## Technical Decisions
- Test strategy: No unit tests (no infra exists) — Agent-Executed QA via Playwright + Lighthouse
- Verification: Lighthouse scores before/after, FPS measurement during scroll
- Approach: Fix critical items first (WebGL, scroll, bundle), then medium items
- Million.js: Remove it — adds complexity with React 19

## Open Questions
- None — user requested comprehensive audit + implementation, scope is clear
