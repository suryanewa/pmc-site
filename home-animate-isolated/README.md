# GSAP Home Animate - Isolated Demo

A fully self-contained recreation of the "Nice and Easy Easing" animation section from the GSAP website homepage.

## Structure

- `index.html` - Complete HTML markup with all SVG elements
- `styles.css` - All CSS styles needed for the animation
- `main.js` - GSAP animation logic
- `lib/` - GSAP core and plugins (included for portability)
- `assets/` - Noise texture image used in SVGs

## Requirements

This demo uses **GSAP Club GreenSock plugins** (SplitText, MorphSVG, DrawSVG) which require a valid license for commercial use. These files are included for demonstration purposes.

- **GSAP Core** - Free (MIT license)
- **ScrollTrigger** - Free (MIT license)  
- **CustomEase** - Free (MIT license)
- **SplitText** - Club GreenSock (requires license)
- **MorphSVGPlugin** - Club GreenSock (requires license)
- **DrawSVGPlugin** - Club GreenSock (requires license)

## Usage

1. **Serve via local server** (required for ES modules):
   ```bash
   # From this directory
   python3 -m http.server 8000
   # Or
   npx serve
   ```

2. Open `http://localhost:8000` in your browser

3. **Note**: The animation is hidden on screens smaller than 77.5rem (1240px) to match the original design.

## Portability

✅ **Fully portable** - This directory can be moved anywhere and will work independently. All dependencies are included:
- GSAP files are in `lib/`
- Assets are in `assets/`
- All paths are relative

## Browser Support

- Modern browsers with ES module support
- Horizontal scrolling animations work best on desktop/large screens
- Respects `prefers-reduced-motion` media query
