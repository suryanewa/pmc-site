# Phase 2 Baseline Performance Evidence

**Captured**: 2026-02-12 02:44 UTC  
**Purpose**: Establish pre-optimization baseline for runtime performance improvements

## Contents

### 1. FPS Report (`fps-report.json`)
Automated FPS measurement during homepage scroll:
- **Average FPS**: 116 fps
- **Minimum FPS**: 60 fps  
- **Frame Drops**: 0 (frames below 30fps)
- **Test**: 5-second smooth scroll from top to bottom at 1440px viewport

### 2. Screenshots (JPEG, 1440px viewport)
Visual snapshots of 6 key pages after networkidle + 2s wait:
- `homepage.jpeg` - Landing page with hero, programs, featured speakers
- `people-e-board.jpeg` - Executive board member profiles
- `people-leads.jpeg` - Program leads profiles
- `events-speakers.jpeg` - Speaker series information
- `programs-product-team.jpeg` - Product Team program details
- `events-case-comp.jpeg` - Case Competition information

### 3. Build Output (`build-output.txt`)
Production build results:
- Build time: ~2 seconds
- 17 static pages generated
- No errors or warnings
- All routes statically generated except API routes

## Baseline Metrics Summary

| Metric | Value | Status |
|--------|-------|--------|
| Average FPS | 116 fps | ✅ Excellent |
| Minimum FPS | 60 fps | ✅ No drops |
| Frame Drops | 0 | ✅ Smooth |
| Build Time | ~2s | ✅ Fast |
| Static Pages | 17 | ✅ All routes |

## Next Steps

This baseline will be compared against Task 8 (final measurement) to quantify improvements from:
1. Lazy loading heavy components (HeroWarpCanvas, UnicornStudio)
2. Optimizing scroll listeners (debouncing, passive listeners)
3. Reducing layout thrashing (batch DOM reads/writes)
4. Debouncing resize handlers
5. Virtualizing long lists (if applicable)

**Expected Outcome**: Maintain or improve FPS while reducing CPU usage and improving perceived performance on lower-end devices.
