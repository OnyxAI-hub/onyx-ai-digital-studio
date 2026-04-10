

# ONYX AI — Complete Premium Website Build

## Summary
Build the full 8-page ONYX AI premium agency website from scratch. Dark theme (#0A0A0A), electric blue accent (#3B82F6), glassy cards, smooth scroll animations, conversion-focused copy, AI chatbot widget, and client portal mock. All front-end; backend mocked.

## Hero Visual Direction
- Abstract tech gradient background using CSS radial/linear gradients and subtle geometric shapes (circles, grid lines, dots)
- Faint dashboard/UI overlay elements rendered as semi-transparent CSS shapes to suggest a digital workspace
- No stock images — pure CSS/SVG abstract visuals
- Dark-to-darker gradient with electric blue glow accents

## CTA Button System
- **Primary**: Solid electric blue (#3B82F6) background, white text, hover glow/brightness increase, rounded-lg, strong contrast
- **Secondary**: Transparent/glass background with white border, white text, subtle hover fill, backdrop-blur
- Consistent across all pages — defined as shared button variants

## Dependencies to Install
- `framer-motion` for scroll/entrance animations

## What Gets Built (~45 files)

### Foundation
- `index.html` — updated title, meta description, favicon reference
- `index.css` — dark theme as default (#0A0A0A bg, white text, #3B82F6 accent, glassy card utilities)
- `tailwind.config.ts` — custom ONYX color palette
- `App.tsx` — 8 routes: `/`, `/services`, `/pricing`, `/portfolio`, `/about`, `/faq`, `/contact`, `/client-portal`
- Copy uploaded logo to `public/onyx-logo.png`

### Data Files (`src/data/`)
Centralized content for clean components:
- `packages.ts` — 3 pricing tiers + all extras/add-ons
- `services.ts` — 8 core services + 9 add-ons
- `faq.ts` — 15 Q&As
- `testimonials.ts` — 4 realistic reviews
- `portfolio.ts` — 3 projects with details
- `products.ts` — 7 service products

### Layout Components
- **Navbar** — sticky, logo image left, nav links center, mobile hamburger, "Book a Consultation" primary CTA button right
- **Footer** — logo, nav columns, social icons (IG, LinkedIn, X, FB, GitHub), contact info, copyright

### Home Page (11 sections)
1. **Hero** — abstract gradient background with subtle geometric overlays, headline "Modern Websites & Web Apps Built to Help Your Business Grow", subheadline, dual CTAs (primary blue "Book a Consultation" + secondary glass "View Pricing")
2. **Trust Section** — 4 indicators: 50+ Projects Delivered, Business-Focused Builds, Responsive on All Devices, Fast Turnaround
3. **Featured Services** — 6 service cards with icons
4. **How It Works** — 4 steps: Discover → Design → Build → Launch
5. **Why Businesses Choose ONYX AI** — 4 premium cards: Fast Turnaround, Premium Design, Web Apps & Automation, Clear Communication
6. **Package Preview** — 3 pricing cards linking to Pricing page
7. **Portfolio Preview** — 3 project cards linking to Portfolio page
8. **Testimonials** — 4 realistic reviews in a grid
9. **AI Chatbot Teaser** — section promoting the chatbot capability
10. **Newsletter** — email opt-in form
11. **Final CTA** — "Ready to Build Something Powerful?" with primary CTA

### Services Page
- 8 core service cards (business websites, landing pages, web apps, dashboards, booking systems, payment integrations, automation, AI chatbots)
- Add-on services section with 9 extras and pricing

### Pricing Page
- 3 package cards: Starter ($250), Business ($550, highlighted), Advanced ($1,100)
- Business card: electric blue border glow, "Most Popular" badge, slight scale-up on desktop, collapses cleanly on mobile
- Full feature checklists per package
- Extras/add-ons section below

### Portfolio Page
- 3 project cards with CSS gradient placeholder visuals: NutriFit Wellness (green), PrimeShine Cleaning (blue), Quality Fitness Club (dark/red)
- Category, description, tech tags, "View Project" CTA

### About Page
- Founder intro (Xavier), bilingual support, brand story
- "Why Choose ONYX AI" differentiators
- Process timeline: Discovery → Design → Build → Launch → Support

### FAQ Page
- 15 Q&A accordion using existing Radix accordion component

### Contact Page
- Contact form + full project intake form (all specified fields, validated with react-hook-form + zod)
- Booking calendar placeholder section
- Social/contact details, map placeholder
- "Let's Build Something Powerful" closing CTA

### Client Portal (`/client-portal`)
- ONYX AI logo prominently displayed
- Login / Sign Up / Password Reset tab interface
- Mock dashboard with 5 widget cards: Project Status, Files/Uploads, Invoices/Payments, Messages, Requested Revisions

### AI Chatbot Widget (global)
- Floating electric blue button bottom-right on all pages
- ONYX AI logo in chat header
- Rule-based conversation: welcome → FAQ matching → lead qualification → package recommendation
- Captures name, email, project summary
- Concise, lead-focused responses
- Fallback: "I can help with that. Please leave your details and Xavier will follow up."

### E-Commerce / Products
- 7 service product cards distributed across Services/Pricing pages
- Each with name, price, description, "Get Started" CTA

### Forms & Lead Capture
- Contact form, newsletter opt-in, consultation booking form, project intake form, chatbot lead capture
- All validated on front-end, success confirmation states with autoresponder placeholders

## Logo Placement
- Navbar (left), Footer, Client Portal login, Chatbot header
- White/monochrome on dark backgrounds, generous padding, no distortion
- Favicon from logo

## Trust Indicators (exact)
- 50+ Projects Delivered
- Business-Focused Builds
- Responsive on All Devices
- Fast Turnaround

