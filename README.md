# ECoS — Environmental Consulting Services Website

A modern, responsive corporate website for **ECoS (Environmental Consulting Services, LLC)**, a SAM-registered small business specializing in environmental health & safety, asbestos abatement, construction, facility maintenance, and specialized IT infrastructure across Maryland, Virginia, and Washington D.C.

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom design system with CSS variables (deep navy + emerald palette)
- **Tailwind CSS** — utility classes via CDN for layout speed
- **Vanilla JavaScript** — modular, dependency-free (canvas particles, scroll progress, tilt cards, intersection-observer reveals, animated counter)
- **Google Fonts (Inter)**
- **Unsplash** — high-quality stock imagery

No build step required. Open `index.html` and the site runs.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Hero, animated stats, core pillars, NAICS marquee, CTA form |
| About Us | `about.html` | Company profile, SAM/NAICS compliance, leadership bios |
| Services | `services.html` | Tabbed UI of the 5 service disciplines |
| ECoS IT | `ecos-it.html` | IT division — cyber-security, networks, managed services |
| Contact | `contact.html` | Estimate request form, service area map |

## Creative Highlights

- Custom animated SVG shield + leaf logo
- Hero canvas with an animated network of connected particles
- 3D tilt-on-hover pillar cards with custom stroke SVG icons
- Scroll progress indicator (top of viewport)
- Cursor spotlight on dark sections
- Auto-scrolling NAICS / credentials marquee strip
- Animated wave SVG divider between hero and stats
- Animated number counter (IntersectionObserver triggered)
- Staggered reveal animations on scroll
- Reduced-motion-aware (respects `prefers-reduced-motion`)

## Local Development

Serve the folder with any static server. Example using Python:

```bash
cd ecos-website
python3 -m http.server 5500
# Then open http://localhost:5500
```

## Deployment — GitHub + Vercel

### One-time setup

1. **Create a GitHub repo** at https://github.com/new
   - Name suggestion: `ecos-website`
   - Visibility: your choice (Vercel works with both)
   - Do **not** initialize with a README (this repo already has one)

2. **Push this code** (from inside `ecos-website/`):

   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/ecos-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel** at https://vercel.com/new
   - Sign in with GitHub
   - Click **Import** next to your `ecos-website` repo
   - Framework Preset: **Other** (it's a static site)
   - Leave Build Command / Output Directory blank — Vercel will serve files directly using `vercel.json`
   - Click **Deploy**

   First deploy takes ~30 seconds. You'll get a URL like `ecos-website-xyz.vercel.app`.

### Subsequent deploys

Every `git push` to `main` automatically triggers a new Vercel deployment. Pull requests get preview URLs automatically.

### Custom domain (optional)

In Vercel → Project → Settings → Domains → add `ecosusa.biz` (or whatever you own). Vercel gives you the DNS records to point at it.

## Project Structure

```
ecos-website/
├── index.html
├── about.html
├── services.html
├── ecos-it.html
├── contact.html
├── favicon.svg
├── vercel.json          # Vercel config (headers, caching)
├── css/
│   └── styles.css       # Design system + custom animations
├── js/
│   └── main.js          # Modular interactions
└── README.md
```

## License

© Environmental Consulting Services, LLC. All rights reserved.
