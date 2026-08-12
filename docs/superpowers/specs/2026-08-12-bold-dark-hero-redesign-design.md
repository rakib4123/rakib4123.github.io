# Bold, dark-hero visual redesign

## Context

Inspired by a reference AI/ML portfolio ("Eshaal Malik" — bold black/white heavy-sans design with a dark hero showing giant name text behind a standing avatar, and numbered/tag-heavy content cards below). The user wants this visual language applied across their existing site, keeping their cyan accent color and current information architecture (no new sections — just restyling what exists).

## 1. Global typography and color system

- Drop `Roboto_Slab` entirely. Remove its import and `variable` from `src/app/layout.tsx`, remove the `--font-serif` theme token and its `font-serif` Tailwind utility mapping from `src/app/globals.css`.
- Every `font-serif` usage across components (`Navbar.tsx`, `About.tsx`, `SectionHeading.tsx`, `Stats.tsx`, `Skills.tsx`, `Robotics.tsx`) is replaced with `font-sans font-extrabold` (or the component's existing weight bumped to `font-extrabold`/`font-black` where it was already bold), tightened with `tracking-tight` where not already present.
- Keep the existing `brand-cyan` / `brand-emerald` CSS variables and their usage untouched — no color palette change beyond the font swap.
- `SectionHeading.tsx`'s eyebrow tag (currently a small cyan line + "01 — Introduction" text) simplifies to a plain uppercase micro-label (no cyan line-and-dot), matching the reference's plainer "ABOUT" / "PROJECTS" style label. The heading text itself becomes the bold sans treatment from above.

## 2. Navbar

- `Navbar.tsx` changes from the current transparent-then-white-on-scroll header to a permanently dark pill/bar: `bg-slate-950` (or near-black), rounded corners, always visible in that state (the `isScrolled` transparent/white toggle logic is removed — the bar no longer needs to react to scroll position since it's dark at all times).
- Nav link text switches to light-on-dark (`text-slate-300` default, `hover:text-brand-cyan`), brand name in bold caps stays cyan-free (white/light), Resume button keeps its cyan pill treatment (already accent-colored, works fine on dark).
- Mobile menu panel also switches to a dark background to match.

## 3. Hero (Option A from the visual mockup — confirmed)

`Hero.tsx` becomes a full-dark section:

- Section background: near-black (`bg-slate-950` or similar), full `min-h-screen`.
- Small pill tag at top center: "AI · ML · COMPUTER VISION · DATA SCIENCE" (dark pill, light border, light-gray text) — replaces the current left-aligned "Final-year CSE · AIUB · Dhaka" badge position/style (that line moves below the giant text as smaller supporting text, or is dropped in favor of the pill — final call made during implementation, matching the mockup's layout).
- Giant bold headline "Hi, I'm Rakib." rendered large and dark-gray-on-black (decorative background text, e.g. `text-slate-800`), centered, sized to roughly fill the hero width.
- The user's avatar photo, background removed (transparent PNG, chroma-keyed from the original blue-background image), rendered on top of/overlapping the giant text, as the visual focal point — replacing the current circular cropped photo treatment.
- Below/around that: the real, fully-readable positioning line in a smaller weight — "I explore AI, ML, computer vision & data science through software I build myself" (existing copy), with the AI/ML/CV/Data-science phrase kept in cyan.
- CTA buttons ("See the work ↓", "Resume") retained with existing Magnetic wrapper, restyled for dark background (e.g. the dark "See the work" button becomes light-on-dark or cyan-filled; the outlined "Resume" button gets a light border instead of gray).
- `AntigravityBackground` canvas stays mounted behind everything; its particle color (`#06b6d4`, already cyan) already works on black, no change needed there.
- Scroll-down arrow cue stays, restyled for dark background (`text-slate-500 hover:text-brand-cyan`).

### New asset

- The background-removed avatar (RGBA PNG, chroma-keyed from `/home/dextro/Downloads/Media (9).jpeg`, background threshold tuned against that image's blue backdrop) is saved to `public/images/profile-transparent.png` and used only in the Hero. The existing circular `public/images/profile.jpg` stays as-is for the About section (unchanged, out of scope — see §5).

## 4. Content sections below the fold (About, Stats, Projects, Robotics, Timeline, Skills, Contact, Footer)

These stay light (`bg-white` / `bg-bg-main`) — the dark Hero remains the one dramatic contrast point, matching the reference's dark-hero/light-body pattern. Shared, non-structural changes:

- Headings: bold sans per §1 (no structural or copy changes).
- Card borders darken slightly (`border-slate-200` instead of `border-gray-100`) and drop-shadow blur radii shrink somewhat, for a flatter/harder-edged card look versus the current soft-SaaS shadows. Exact shadow values are an implementation-time judgment call within "flatter than today, not dramatically different."
- `Projects.tsx`: the two featured project cards (RideGuard, PulseStone) gain a small numbered badge (01, 02) in a top corner of their image, matching the reference's numbered project cards. No other structural change — gallery, tags, buttons, and the three small project cards stay as they are today (only picking up the global heading/border treatment).
- `Skills.tsx`: no structural change (it already matches the reference's category-card + tag-pill pattern) — only the global heading/border/font treatment applies.
- `Stats.tsx`, `Robotics.tsx`, `Timeline.tsx`, `Contact.tsx`, `Footer.tsx`: heading/border/typography treatment only, no structural changes.

## 5. Out of scope

- No new sections (no Certifications, AI Agent, or Future Work sections — confirmed with the user).
- No change to the About section's photo treatment (stays the existing circular `profile.jpg`).
- No change to information architecture, routing, the `/resume` page, or any project/skill/award content.
- No change to the custom cursor, magnetic buttons, scroll progress bar, or tilt cards added previously — those interactions carry over unchanged.

## Verification

- `npx eslint .` and `npx tsc --noEmit` clean.
- `npm run build` succeeds.
- Manual/visual check once deployed: dark Hero renders correctly with the transparent avatar composited over the giant text, Navbar is legible in its new dark state at all scroll positions, and no section below the fold accidentally inherited a dark background.
