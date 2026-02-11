# PMC – NYU's Premier Product Management Club

> **Building the product leaders of tomorrow.**

PMC (Product Management Club) is NYU Stern's premier entrepreneurship and product management club, established in 2003. We empower students to succeed as product managers in any industry through hands-on programs, industry speaker events, office tours, and our flagship national case competition.

Our members have gone on to work at companies like Google, Meta, Microsoft, Amazon, Goldman Sachs, JP Morgan, Spotify, Adobe, Discord, and many more.

---

## 📅 Events

### 🎤 Speaker Series
Every Thursday at 6:00 PM, we bring product leaders from across industries directly to NYU students—no fluff, just real conversations with people building the future.

- **50+ speakers** hosted from 30+ companies
- **500+ students** attended over 4 semesters
- Topics include PM fundamentals, discovery, roadmap prioritization, cross-functional leadership, metrics, and go-to-market
- Open to all NYU students, free of charge

### 🏢 Office Tours
Small-group visits to startups, tech giants, and VC firms across NYC. See real product teams in action—how they work, collaborate, and ship.

- **15+ companies** visited (Fintech, Consumer Social, B2B SaaS, Media, E-Commerce, VC, and more)
- Groups of 15-20 students per tour
- Includes Q&A sessions and networking with employees

### 🏆 Case Competition
The NYU National Product Case Competition—a 48-hour product strategy challenge with students from top universities (Penn, Columbia, Duke, Georgetown, Michigan, Brown, UCLA, and more).

- Teams of 3-5 students tackle real product challenges
- 24-hour case sprints followed by live pitch finals
- Judges from Meta, Google, Microsoft, Amazon, IBM, TikTok, Capital One, and more
- Cash prizes, mentorship opportunities, and recruiting pathways
- Partner schools include UPenn, Columbia, Cornell, Duke, Georgetown, UMich, UCLA, Brown, Binghamton, and UIUC

---

## 🚀 Programs

### Product Team
A **10-week hands-on program** for first and second-year undergraduates to experience the full PM lifecycle.

- **Phase 1 (Weeks 1-3):** Research & Discovery—user interviews, data analysis, problem discovery
- **Phase 2 (Weeks 4-6):** Ideation & Prototyping—wireframes, interactive prototypes
- **Phase 3 (Weeks 7-8):** Strategy & Roadmapping—product strategy, launch planning
- **Phase 4 (Weeks 9-10):** Presentations & Feedback—present to industry PMs

**Deliverables:** Product case study, high-fidelity Figma prototypes, product roadmap, and portfolio-ready work.

### Mentorship Program
One-on-one mentorship with two tracks:

**Intro Track:**
- For students new to product management
- Paired with a PMC E-Board member with PM experience
- Focus on PM fundamentals and career preparation

**Advanced Track:**
- For students actively recruiting
- Paired with full-time Product Managers from companies like Google, Meta, JP Morgan, Mastercard, PwC, and Capital One
- Focus on recruiting prep and career progression

**Events include:** Kickoff sessions, career workshops, office visits, and a farewell celebration.

### Graduate PM Bootcamp
A **10-day intensive program** for 10-12 NYU graduate students.

- **Sessions 1-3:** Research & Problem Framing—Design Thinking, journey mapping
- **Sessions 4-5:** Ideation & Prioritization—SCAMPER, Crazy 8s, RICE, MoSCoW
- **Sessions 6-8:** PRD, Prototyping & Testing—PRD writing, MVP prototyping, usability testing, AARRR/HEART metrics
- **Sessions 9-10:** Storytelling & Presentations—final presentations to industry PMs

**Deliverables:** Portfolio-ready PRD, user research summaries, working prototype, presentation deck.

---

## 🏗️ Architecture

This is a [Next.js 16](https://nextjs.org/) application using the **App Router** architecture with React 19.

```
pmc-redesign/
├── app/                          # Next.js App Router
│   ├── components/               # Page-specific components
│   │   ├── HomeHeroSection.tsx   # Landing page hero with 3D canvas
│   │   ├── HomeProgramsSection.tsx
│   │   ├── JoinUsSection.tsx     # Newsletter signup
│   │   ├── FAQSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollAnimations.tsx  # Scroll-based animations
│   │   └── ...
│   ├── events/                   # Event pages
│   │   ├── case-comp/            # Case Competition
│   │   ├── office-visits/        # Office Tours
│   │   └── speakers/             # Speaker Series
│   ├── programs/                 # Program pages
│   │   ├── product-team/
│   │   ├── mentorship/
│   │   └── grad-bootcamp/
│   ├── people/                   # Team pages
│   │   ├── e-board/
│   │   ├── leads/
│   │   └── past-teams/
│   ├── api/                      # API routes
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Shared/reusable components
│   ├── ui/                       # UI primitives (buttons, inputs, etc.)
│   ├── animate-ui/               # Animation components
│   ├── motion-primitives/        # Motion components
│   ├── smoothui/                 # Smooth UI components
│   ├── AsciiHoverEffect.tsx      # ASCII art hover effect
│   ├── CountUp.tsx               # Animated number counter
│   ├── LogoLoop.tsx              # Logo carousel
│   ├── TiltedCard.tsx            # 3D tilt card effect
│   └── ...
├── lib/                          # Utilities and helpers
│   ├── gsap/                     # GSAP scroll effects
│   ├── supabase/                 # Supabase client
│   └── utils.ts
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
│   ├── companies/                # Company logos
│   ├── portraits/                # Team member photos
│   ├── schools/                  # Partner school logos
│   ├── fonts/                    # Custom fonts (Satoshi, Gotham)
│   └── ...
└── scripts/                      # Build/utility scripts
```

### Key Architectural Patterns

1. **App Router:** All pages use Next.js 16 App Router with `page.tsx` files
2. **Server & Client Components:** Strategic use of `'use client'` for interactive components
3. **Dynamic Imports:** Heavy 3D/WebGL components are dynamically imported with `next/dynamic`
4. **Smooth Scrolling:** Custom Lenis-based smooth scroll implementation
5. **Animation System:** GSAP + Motion (Framer Motion) for scroll-triggered and hover animations

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js](https://nextjs.org/)** 16.x – React framework with App Router
- **[React](https://react.dev/)** 19.0 – UI library
- **[TypeScript](https://www.typescriptlang.org/)** 5.x – Type safety

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** v4 – Utility-first CSS
- **[tw-animate-css](https://github.com/animate-css/animate.css)** – CSS animations
- **Custom fonts** – Geist, Satoshi, Gotham

### Animation & 3D
- **[Motion (Framer Motion)](https://motion.dev/)** – React animations
- **[GSAP](https://gsap.com/)** – Scroll-triggered animations
- **[Three.js](https://threejs.org/)** – 3D graphics
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** – React renderer for Three.js
- **[React Three Drei](https://github.com/pmndrs/drei)** – Three.js helpers
- **[React Three Rapier](https://github.com/pmndrs/react-three-rapier)** – Physics engine
- **[Lenis](https://lenis.studiofreight.com/)** – Smooth scrolling
- **[UnicornStudio](https://www.unicorn.studio/)** – WebGL backgrounds

### Backend & Data
- **[Supabase](https://supabase.com/)** – Database & auth

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** – Headless UI primitives
- **[Headless UI](https://headlessui.com/)** – Accessible components
- **[Lucide React](https://lucide.dev/)** – Icons
- **[Sonner](https://sonner.emilkowal.ski/)** – Toast notifications

### Utilities
- **[clsx](https://github.com/lukeed/clsx)** – Class name utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** – Tailwind class merging
- **[class-variance-authority](https://cva.style/)** – Component variants

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pmc-redesign

# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔍 Pre-commit Checks (CI Gate)

Run these commands before opening a PR:

```bash
npm ci
npm run lint
npm run typecheck
npm run check:assets
npm run build
npm audit --audit-level=high
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run check:assets` | Verify asset file casing |

---

## 🌐 Environment Variables

Create a `.env.local` file for local development:

```env
# Supabase (for newsletter signup)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📱 Features

- **Responsive Design:** Fully responsive across all device sizes
- **Dark Mode:** Native dark theme
- **Smooth Scrolling:** Lenis-powered smooth scroll experience
- **Scroll Animations:** GSAP ScrollTrigger for parallax and fade effects
- **3D Elements:** Interactive Three.js scenes on the homepage
- **WebGL Backgrounds:** Dynamic animated backgrounds via UnicornStudio
- **Accessibility:** Skip-to-content links, semantic HTML, ARIA labels
- **SEO Optimized:** OpenGraph and Twitter cards, sitemap, robots.txt
- **Performance:** Dynamic imports, optimized images (AVIF/WebP)

---

## 📄 License

This project is private and proprietary to PMC at NYU.

---

## 📬 Contact

- **Email:** pmc@nyu.edu
- **Instagram:** [@nyupmc](https://www.instagram.com/nyupmc/)
- **LinkedIn:** [NYU PMC](https://www.linkedin.com/company/nyupmc/)

---

<p align="center">
  <strong>Where NYU's Founders & Investors Are Made</strong><br/>
  Established 2003 · NYU Stern School of Business
</p>
