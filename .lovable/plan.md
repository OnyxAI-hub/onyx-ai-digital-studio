# ONYX AI Studio → AI Creative Platform Transformation

This is a large scope. I'll execute in phases so nothing breaks. **Phase 1 (this build) = all frontend/copy/pages.** Phase 2 = Lovable Cloud + Stripe backend (requires your go-ahead since it touches billing).

## Phase 1 — Frontend platform reposition (this build)

### 1. Homepage (`src/pages/Index.tsx`)
- New hero: headline "Create Websites, Media & Automation With AI", new subheadline, AI prompt-style input bar with chips (Image, Video, Audio, Website, Automation), CTAs: **Start Creating**, **Buy Credits**, **Book a Consultation**
- Keep existing animated/code background
- New "Choose What You Want to Create" section — 3 premium cards (Websites & Web Apps / AI Creative Studio / Business Automation)
- New "Create Across Multiple AI Workflows" — 8 model/category cards with credit costs
- New "How ONYX AI Studio Works" — 5 steps
- Keep existing portfolio, testimonials, trust strip, contact map

### 2. Pricing page (`src/pages/Pricing.tsx`)
- Add **Monthly/Annual toggle**
- Replace current packages with 5 SaaS tiers: Starter $4, Basic $9, Premium $21 (Popular), Pro $54, Ultra $124 — full feature lists per spec
- Add **Credit Costs** transparency table
- Add **One-Time Credit Packs** section (4 packs: $25/$75/$150/$300)
- Keep existing **One-Time Services** section, updated to the 6 services in spec
- All CTAs route to `/project-intake` with `?package=` prefill until Stripe is wired

### 3. Services page (`src/pages/Services.tsx`)
- Reframe as "Need It Done For You?" agency section, keep existing 6 service cards (update copy to platform tone)
- Add chips/tags for credit-vs-service distinction

### 4. Project Intake (`src/pages/ProjectIntake.tsx`)
- Expand "Type of Project" dropdown with all 17 options from spec
- Add fields: style/vibe, references/links, target platform, request type (credits/one-time/consultation)
- Group visually: Creative / Business / Automation
- **Keep Zapier webhook, all existing field IDs, validation, navigate to /thank-you**

### 5. New page: `/generate` (`src/pages/Generate.tsx`)
- Prompt box + type tabs (Image/Video/Audio/Website/Automation) + model selector + credit cost preview
- Reference upload (UI only)
- Button = **"Submit Request"** (NOT fake instant generation) → routes to `/project-intake` with type prefilled
- Recent requests placeholder (empty state messaging)

### 6. New page: `/dashboard` (`src/pages/Dashboard.tsx`)
- Mock credit balance, plan, request history, storage usage, active requests
- "Connect account to track real credits" notice (since no auth yet)
- Buttons: Upgrade, Buy Credits

### 7. Navbar (`src/components/layout/Navbar.tsx`)
- Add **Generate** link, keep all existing routes
- Add small **Buy Credits** CTA

### 8. Routes (`src/App.tsx`)
- Register `/generate` and `/dashboard`
- All existing routes untouched

### 9. Data file: `src/data/credits.ts` (new)
- Plans array, credit packs, model categories, cost table — single source of truth

## Phase 2 — Backend (separate build, ask first)

When you're ready, I'll:
1. Enable **Lovable Cloud** (auth, DB, storage)
2. Tables: `profiles`, `subscriptions`, `credit_balances`, `credit_transactions`, `creative_requests`, `uploaded_files`, `payments`, `model_pricing`
3. Enable Stripe via `enable_stripe_payments` (seamless), create the 5 subscription products + 4 credit packs
4. Stripe webhook → credit allocation
5. Real `/dashboard` + `/generate` with auth
6. Admin dashboard

## Guardrails honored
- ✅ Existing pages, Calendly, Zapier, Stripe links, forms, automation flows all preserved
- ✅ Visual identity unchanged — black/charcoal/silver + existing accent
- ✅ No fake instant generation — all CTAs say "Submit Request" / "Start a Request"
- ✅ No Lovable / third-party tool name-drops
- ✅ No "unlimited" claims
- ✅ Honest MVP language: "request-based, credit-supported"

## What I need from you
- **Approve this plan to start Phase 1** (frontend only, ~9 files touched, ~2 new pages)
- Confirm when you want Phase 2 (Cloud + Stripe) — that's a separate ask since it touches billing
