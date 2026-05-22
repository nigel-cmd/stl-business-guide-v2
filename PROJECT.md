# STL Business Guide V2 - Project Setup

## Project Information

**Name:** STL Business Guide V2  
**Description:** Local Business Directory & Deals Platform for St. Louis  
**Type:** Next.js 16 + TypeScript + Tailwind CSS  
**Status:** Built and Ready for Deployment

## Repository Structure

```
stl-business-guide-v2/
├── src/
│   └── app/
│       ├── components/       # React components
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx
│       │   ├── Stats.tsx
│       │   ├── FeaturedBusinesses.tsx
│       │   ├── MembershipTiers.tsx
│       │   ├── HowItWorks.tsx
│       │   ├── Testimonials.tsx
│       │   ├── Newsletter.tsx
│       │   └── Footer.tsx
│       ├── globals.css       # Global styles & brand colors
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Home page
├── dist/                     # Build output (ready to deploy)
├── public/                   # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Logo Blue | #54afe6 | Primary actions, links |
| Warning | #dca206 | Alerts, notifications |
| Gold | #ffc107 | VIP tier, highlights |
| Off Red | #e36087 | Featured badges |
| Secondary | #bb7ce4 | Gradients, accents |
| Accent | #4b5563 | Text, borders |
| Primary | #371a5b | Headers, dark sections |
| Green | #86c540 | Success, checkmarks |
| Orange | #f68712 | CTAs, warm accents |

## Fonts

- **Headings:** Montserrat (400, 500, 600, 700, 800)
- **Body:** Lato (400, 700)

## Features

### Pages/Sections
1. **Hero** - Search bar, stats, CTA
2. **Stats** - 6 key metrics
3. **Featured Businesses** - VIP/Premium/Free listings
4. **Membership Tiers** - 3 pricing plans
5. **How It Works** - 4-step process
6. **Testimonials** - Success stories
7. **Newsletter** - Email signup
8. **Footer** - Contact, links, social

### Membership Plans

| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | Basic listing, 1 category |
| Premium | $49/month | Featured placement, photos, 3 categories |
| VIP | $149/month | Top priority, unlimited, dedicated manager |

## Deployment

### Build Output
- Location: `/dist/`
- Type: Static HTML export
- Ready for: Vercel, Netlify, GitHub Pages, any static host

### Deployment Steps

#### Option 1: Vercel (Recommended)
```bash
# Manual deploy
cd dist
vercel --prod

# Or connect GitHub repo in Vercel dashboard
```

#### Option 2: Netlify
```bash
# Drag & drop dist folder to netlify.com
```

#### Option 3: GitHub Pages
```bash
# Upload dist contents to gh-pages branch
```

## Environment Variables

None required for static build.

For dynamic features later:
- `GHL_API_KEY` - GoHighLevel integration
- `WLS_WEBHOOK_URL` - White Label Suite
- `NEWSLETTER_API` - Email service

## Next Steps

1. [ ] Deploy to Vercel/Netlify
2. [ ] Add real business images
3. [ ] Connect to CMS/backend
4. [ ] Set up GHL integration
5. [ ] Add analytics
6. [ ] SEO optimization

## Notes

- Site is fully responsive
- All animations are CSS-based
- No external dependencies except Lucide icons
- Ready for incremental static regeneration

## Contact

**Developer:** True Products Network LLC  
**Email:** info@trueproductsnetwork.com  
**Phone:** (314) 886-8084
