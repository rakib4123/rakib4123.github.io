# Two-ink risograph print redesign, reframed on the 2026 CV

## Context

The user supplied a reference site — https://udaydey-boss.github.io/Syntecxhub_Portfolio_Website/ — and asked for "this type of design", plus a content reframe against the current CV at `/home/dextro/Downloads/MD.RAKIB-HOSSAIN_CV.pdf` (already published at `public/Rakib_Hossain_CV.pdf`).

The reference's own stylesheet names its direction: a **two-ink risograph print**. Pale stock, two flat inks, a halftone dot screen over the whole page, Archivo Black display type, hairline rules between sections, square corners, hard un-blurred offset shadows, numbered mono section labels, dot-leader lists, and a giant hero name whose second ink pass is deliberately knocked out of register.

This is the opposite of the current site, which is a polished dark-hero design with cyan gradients, a particle canvas, a custom crosshair cursor, and mouse-reactive tilt/spotlight cards.

Three decisions were settled with the user before this spec:

1. **Same system, own inks.** Adopt the reference's full structural and typographic language, but not its palette — the site must not read as a recolour of another developer's portfolio.
2. **Keep every section.** All seven current sections survive, retranslated into the print language. Nothing is cut to match the reference's thinner information architecture.
3. **Petrol + fluoro orange** on pale sage stock.

## 1. The ink system

`src/app/globals.css` loses the cyan/slate theme and gains the print token layer. Tokens are declared in Tailwind v4's `@theme` block so they are available as utilities, with the raw values also on `:root` for use in plain CSS.

```
--paper       #e3e7e4   page stock
--paper-lift  #edf0ee   cards, spec panels, plates
--ink         #14161b   body text and every rule
--petrol      #0c5661   ink 1 — headings, labels, hero pass 1
--fluoro      #ff5c1a   ink 2 — accents, hero pass 2, hover, focus
--rule        1.5px solid var(--ink)
--pad         clamp(1.25rem, 5vw, 5.5rem)
--gap         clamp(2.5rem, 7vw, 6rem)
```

The existing `--color-brand-cyan`, `--color-brand-teal`, `--color-brand-emerald`, `--color-brand-dark`, `--color-bg-main` and `--color-bg-card` tokens are removed. Every component reference to them is rewritten as part of §4 — no component may still reference a deleted token when the work is done.

### Typography

`Inter` is dropped from `src/app/layout.tsx`. Three faces replace it, all via `next/font/google` (self-hosted, no render-blocking `<link>`, unlike the reference which uses a Google Fonts stylesheet):

- **Archivo Black** → `--font-display`: the hero name, section `h2`s, card titles, the About lede, the contact headline, and the big email.
- **Space Grotesk** → `--font-sans`: body copy. Base size `clamp(1rem, .95rem + .25vw, 1.075rem)`, line-height `1.65`.
- **Space Mono** → `--font-mono`: every uppercase micro-label — nav links, section numbers, eyebrows, hero meta, spec panels, dot-leader values, card types, footer.

### Global print primitives

- **Halftone screen.** `body::after`, `position: fixed`, `inset: 0`, `z-index: 999`, `pointer-events: none`, `opacity: .16`, `background-image: radial-gradient(var(--ink) 0.9px, transparent 1px)`, `background-size: 4px 4px`, `mix-blend-mode: multiply`. It prints over modals too, which is correct for the medium; `pointer-events: none` keeps it from intercepting clicks. This must be verified against both modals (§4.9, §4.10).
- **Hairline rules.** Every section carries `border-bottom: var(--rule)`. This replaces the current `border-gray-100` / `border-t` treatments.
- **Hard shadows.** Every blurred shadow in the codebase (`shadow-[0_20px_40px_...]`, `shadow-md`, `shadow-lg`, `shadow-sm`, `shadow-2xl`, and the coloured cyan/emerald glows) is replaced by an offset hard shadow — `8px 8px 0 var(--fluoro)` for static panels, `12px 12px 0 var(--petrol)` paired with `translate(-6px, -6px)` for hover states.
- **Square corners.** Every `rounded-*` utility is removed. The two exceptions are the `.mark__dot` in the navbar and any genuinely circular affordance (modal close/prev/next buttons), which stay `rounded-full`.
- **Focus.** `:focus-visible { outline: 3px solid var(--fluoro); outline-offset: 3px; }` globally.
- **Selection.** `::selection { background: var(--fluoro); color: var(--paper-lift); }`.
- **Scrollbar.** The existing `::-webkit-scrollbar` rules are re-inked: track `--paper`, thumb `--petrol`, square (no `border-radius`).
- **Reduced motion.** A `@media (prefers-reduced-motion: reduce)` block sets all animation and transition durations to `.001ms` and disables `scroll-behavior: smooth`.

The `.custom-cursor-active` / `.cursor-crosshair` / `.crosshair-*` rules and the `gradientAnim` keyframes are deleted along with the components that used them.

## 2. Motion and interaction

The current interaction layer is built on depth, glow and mouse-tracking. All of it contradicts a flat printed surface, so these five components are **deleted**:

- `src/components/AntigravityBackground.tsx` — particle canvas
- `src/components/CustomCursor.tsx` — cyan crosshair cursor
- `src/components/TiltCard.tsx` — 3D tilt on hover
- `src/components/SpotlightCard.tsx` — mouse-follow radial glow
- `src/components/Magnetic.tsx` — magnetic button pull

`src/components/TypewriterRole.tsx` is also deleted: the hero becomes a static printed block, and animated type has no place in the medium. (Flagged to the user as a reversible call before approval; reinstating it is a one-component change.)

What survives:

- **The register animation.** The hero's fluoro second pass animates from `translate(46px, 26px)` / `opacity: 0` to its resting `translate(10px, 10px)` over `1.1s cubic-bezier(.2,.75,.25,1)`, exactly as the reference does. On viewports under `34rem` the resting offset drops to `6px, 6px` and the animation starts from `translate(26px, 16px)`.
- **Reveal on scroll.** `framer-motion` stays, but every reveal is flattened to a short opacity + small `y` translate (`0.4–0.5s`). All `scale`, spring and stagger-heavy variants are removed — including the `tagContainer`/`tagItem` stagger in `Projects.tsx` and `Skills.tsx`.
- **`ScrollProgress`** is restyled as a solid `--fluoro` bar with no gradient.
- Both modals stay, reskinned flat (§4.9, §4.10).

`framer-motion`, `lucide-react`, `react-icons`, `clsx` and `tailwind-merge` all remain in `package.json`. No dependency is added or removed.

## 3. Content corrections from the CV

These are content changes, not restyling, and each is a real mismatch between the live site and the supplied CV.

### 3.1 Skills regrouped to the CV's own groups

`src/components/Skills.tsx` currently invents six categories of its own. It is rewritten to the CV's exact six groups and their exact members:

| Group | Members |
|---|---|
| Languages | Python, SQL, C++, TypeScript/JavaScript |
| Data Science & ML | pandas, NumPy, scikit-learn, CatBoost, PyTorch, YOLO, OpenCV, SHAP |
| Methods | Exploratory data analysis, feature engineering, association-rule mining, model calibration, leakage auditing, benchmarking, experiment design |
| Backend | NestJS, Node.js, REST APIs, Prisma, PostgreSQL |
| Frontend | React, Next.js, Tailwind CSS, HTML/CSS |
| Tools | Git/GitHub, VS Code, Jupyter, Roboflow, Claude Code, Antigravity, Canva, Microsoft 365, Vercel, Render |

This **adds the Methods group**, which the site omits entirely and which is the most distinctive part of the CV's skill list. It **drops TensorFlow, XGBoost, Power BI, Excel, .NET and SQL Server** — none appear in this CV — along with the site's invented "Embedded" and "Ways of working" groups. Embedded work is not lost; it stays where the CV puts it, in the PulseStone project entry.

### 3.2 Projects reordered to the CV's order, AIUB STEAM dropped

The CV lists Drikon first. The site currently buries it as a small side card while featuring RideGuard and PulseStone. New order, all four as full entries:

1. **Drikon** — Full-Stack E-Commerce Platform with Recommendation Engine · `Next.js 15, React 19, NestJS 11, PostgreSQL, Prisma` · Live + Code
2. **RideGuard** — Calibrated and Auditable ML Risk Framework · `Python, CatBoost, scikit-learn, SHAP` · Research + App Code + Live
3. **DhakaNight** — Night-Time Object Detection Dataset and Benchmark · `Python, PyTorch, YOLO, OpenCV, Roboflow` · Code
4. **PulseStone** — Handheld Anxiety-Relief Device · `ESP32-C3, Arduino C++, Python` · Code

`AIUB STEAM` is **removed**. It is absent from this CV and is the only thing keeping `.NET`/`SQL Server` on the page.

RideGuard's tag list drops `XGBoost` and `TensorFlow` to match the CV, and gains the **Research** link the CV lists but the site does not expose. The Research URL is not in the repo; if it is not supplied before implementation, the Research link is omitted rather than guessed, and this is reported.

### 3.3 Publications gain first authorship

`src/components/Publications.tsx` adds **"First author"** to both entries, which the CV states and the site currently omits.

### 3.4 Stats corrected to CV-supported figures

`src/components/Stats.tsx` currently claims `14+ podiums` and `6+ robot classes`. Neither is supported by the CV, which names six podium finishes and four classes of robot. The four printed figures become:

| Figure | Source |
|---|---|
| 2 papers accepted, ICCA 2026 | CV Publications |
| 4 classes of robot built | CV Leadership — "line-following, soccer, race, and battle" |
| 2,300+ images labelled | CV DhakaNight |
| 14.5× faster to first breath | CV PulseStone — 0.52s vs 7.49s |

The count-up animation is removed; these render as static printed figures.

### 3.5 Robotics and Contact detail

`Robotics.tsx` adds the CV's four robot classes and the **ESAB (Engineering Students' Association of Bangladesh) membership since 2023**, which the site does not mention outside the About spec list. `Contact.tsx` keeps the existing email, phone, GitHub and LinkedIn — all already match the CV.

### 3.6 Languages, and what stays off the page

About's spec list renders languages as **Bangla (native) · English (intermediate)** per the CV, replacing the bare "Bangla · English".

**CGPA stays off the page.** The CV states 3.28/4.00, but commit `6447a54` removed it deliberately. That decision is honoured; it is not reinstated by this redesign.

## 4. Section-by-section treatment

### 4.1 Navbar (`Navbar.tsx`)

The fixed dark blurred bar becomes the reference's `topbar`: `position: sticky`, `top: 0`, `background: var(--paper)`, `border-bottom: var(--rule)`, no blur, no shadow, square. Left is a `mark` — a fluoro dot beside `M.R.H.` in mono, the dot scaling to `1.4` and turning petrol on hover. Right is the nav, mono uppercase `.82rem`, each link with a fluoro underline that scales in from the left on hover (`transform-origin: left`, `.28s`).

The seven existing anchors are kept and the `IntersectionObserver` active-section logic is kept, with the active link marked by a **persistent** fluoro underline rather than a colour change. The `Magnetic` wrapper on the Resume button is removed; the button becomes a mono link with a petrol border. The mobile menu panel is re-inked to `--paper` with a rule border.

Under `34rem` the topbar stacks (`flex-direction: column`, `align-items: flex-start`), matching the reference.

### 4.2 Hero (`Hero.tsx`)

Loses the particle canvas, the grid overlay, the transparent-PNG portrait, the typewriter, both `Magnetic` buttons and the gradient text. It becomes the reference's hero on `--paper`:

- **Eyebrow**, mono uppercase petrol, letter-spaced `.16em`: `Data Science & Machine Learning · Full-Stack Developer — Dhaka, Bangladesh`
- **The name**, Archivo Black, `clamp(3.4rem, 15vw, 12rem)`, `line-height: .84`, uppercase petrol, on two lines: `MD. RAKIB` / `HOSSAIN`, with the fluoro second pass drawn from a `data-name` attribute carrying identical text and animated into register (§2).
- **The line**, max `46ch`, from the CV summary: that he takes machine-learning systems end to end — dataset curation, exploratory analysis, feature engineering, model calibration and deployment — and ships the applications around them.
- **Meta**, three mono columns with petrol uppercase keys: `Available` / open to full-stack, AI-ML and software engineering roles · `Stack` / Python · TypeScript · Next.js · NestJS · PyTorch · `Currently` / two papers accepted at ICCA 2026.

The scroll cue to `#about` is kept as a mono `↓` link, without the bouncing loop.

The portrait is not lost — it moves to About (§4.3).

### 4.3 About (`About.tsx`) and the stats band

Becomes the reference's two-column `about` grid — `minmax(0, 1.6fr) minmax(0, .85fr)`, collapsing to one column under `62rem`.

Left: an Archivo Black **lede** in petrol, then body copy drawn from the CV summary, naming Drikon, RideGuard, DhakaNight and PulseStone, the Khepa Chakka foundership, and daily AI-assisted development with Claude Code.

Right: the **specs panel** — `--paper-lift`, `var(--rule)` border, `8px 8px 0 var(--fluoro)` shadow, a `<dl>` of mono rows with dotted separators and petrol keys: Based in / Dhaka, Bangladesh · Education / B.Sc. CSE, AIUB (expected 2026) · Focus / Full-stack · AI-ML · Computer vision · Role / Founder, Khepa Chakka · Affiliation / ESAB, AIUB · Languages / Bangla (native), English (intermediate).

`public/images/profile.jpg` renders above the specs panel as a **bordered square plate** — `var(--rule)`, no border-radius, `filter: grayscale(1) contrast(1.1)` so it reads as a single-ink print rather than a photograph.

`Stats.tsx` stays its own component, mounted in `page.tsx` immediately after `<About />` and rendered as a **ruled band** that reads as part of the About block — `border-top: var(--rule)`, no bottom rule of its own, no section label or number: four static figures in Archivo Black petrol above mono uppercase captions, separated by vertical hairline rules. Content per §3.4. The `Counter` component and its `animate`/`useInView` machinery are deleted.

### 4.4 Section shell (`SectionHeading.tsx`)

Rewritten to the reference's pair: a mono uppercase `section__label` in petrol (`01 — ABOUT`, `.78rem`, letter-spacing `.18em`) followed by the heading in Archivo Black. The current cyan line-and-dot eyebrow and its gradient underline are removed. The optional `subtitle` prop is kept, rendering as body copy capped at `62ch`.

Section numbering follows the page order: `01 — About`, `02 — Projects`, `03 — Publications`, `04 — Robotics`, `05 — Awards & Education`, `06 — Skills`, `07 — Contact`.

### 4.5 Projects (`Projects.tsx`)

The `TiltCard` + `SpotlightCard` + gradient-border card grid is replaced by four alternating full-width rows (image/plate on one side, text on the other, flipping each row), in the CV order of §3.2.

Each row: mono uppercase petrol project type · Archivo Black petrol title · mono tag row (square, `--paper-lift`, ruled border — not pills) · body copy · mono links with fluoro underlines (`Live ↗`, `Code ↗`, `Research ↗`).

**Drikon has no screenshot in `public/images/`.** It gets a CSS-generated **print plate** — the reference's `plate--a/b/c` device, re-inked in petrol and fluoro (layered `radial-gradient`, `repeating-linear-gradient` and `conic-gradient` over `--paper`), `aspect-ratio: 4/3`, ruled border. This is extracted as a new `src/components/Plate.tsx` taking a `variant` prop, so DhakaNight — which also has no image — can use a second variant. When a Drikon screenshot is supplied it swaps straight in.

RideGuard keeps its four-image gallery with the thumbnail strip; thumbnails become square with a fluoro border on the active one. Photographic images get the same `grayscale(1) contrast(1.1)` print treatment as the portrait; hover lifts the plate `translate(-6px, -6px)` with a `12px 12px 0 var(--petrol)` shadow.

The `01`/`02` number badges become mono petrol labels sitting outside the plate, not dark pills laid over the image.

### 4.6 Publications (`Publications.tsx`)

The gradient emerald cards become two ruled entries on `--paper-lift` with `8px 8px 0 var(--fluoro)`. Each: Archivo Black petrol title, mono venue line, mono **`FIRST AUTHOR`** and a fluoro **`ACCEPTED`** stamp — the stamp being mono uppercase text in a ruled fluoro box, rotated `-4deg`, not a rounded badge. The `lucide-react` `FileText` icon tile is dropped; the print language carries this without iconography.

### 4.7 Robotics (`Robotics.tsx`)

Structure and behaviour are kept — video, three galleries, certificates toggle, lightbox. The reskin: figures become ruled plates with hard shadows on hover, the `aspect-[4/3]` frames keep their crop, captions become mono uppercase in a `--paper-lift` bar beneath each plate rather than a gradient overlay that fades in on hover (a printed caption does not hide until hovered). Gallery images take the same grayscale print filter. The `ZoomIn` icon is replaced by a mono `[ZOOM]` label.

Intro copy gains the CV's four robot classes and the ESAB membership (§3.5).

### 4.8 Awards & Education (`Timeline.tsx`)

The vertical line-and-dot timeline of bordered cards becomes two **ruled ledgers** using the reference's `leaders` pattern: each row is `year · title — org` on the left, a dotted petrol leader filling the gap, and the placement (`WINNER`, `CHAMPION`, `1ST RUNNER-UP`, `2ND RUNNER-UP`, `COMPETED`) in mono uppercase on the right, turning fluoro and shifting `-4px` on hover. The coloured amber/slate/orange rank pills are removed — placement is carried by the mono label alone.

All seven award rows and three education rows from the current component are kept; the awards' content already matches the CV. The `Trophy` and `GraduationCap` icons are dropped in favour of mono `h2` group headings.

### 4.9 Contact (`Contact.tsx`)

Becomes the reference's contact block: an Archivo Black headline capped at `18ch`, a mono sub-line, then `r1.rakibhossain1@gmail.com` as the **`bigmail`** — Archivo Black petrol at `clamp(1.25rem, .9rem + 2.4vw, 3rem)`, with a fluoro `background-size: 100% 4px` underline that grows to `100% 100%` on hover as the text goes ink-black. Beneath it, an `elsewhere` row of mono uppercase links: GitHub · LinkedIn · +880 1632 941507 · rakib4123.github.io. The three filled/bordered buttons and the `Mail`/`FaGithub`/`FaLinkedin` icons are removed.

### 4.10 Footer, modals, and `/resume`

`Footer.tsx` becomes the reference's `foot` — a mono row, copyright left, `Back to top ↑` right, no rule beneath.

`DemoModal.tsx` and the Robotics lightbox: square corners, `var(--rule)` borders, `--paper` chrome instead of white/blur, mono labels, fluoro focus rings. Both keep their existing keyboard and click-out behaviour. Their `z-index` stays below the halftone's `999`.

`src/app/resume/page.tsx` is re-inked to match: mono `← Back to portfolio` link, a mono `Download PDF ↓` link with a fluoro underline in place of the dark filled button, and the PDF iframe in a square ruled frame with an `8px 8px 0 var(--petrol)` shadow.

`src/app/layout.tsx` drops the `Inter` import and the `CustomCursor` mount, adds the three fonts, and updates `metadata.title`/`description` to the CV's positioning — `Data Science and Machine Learning | Full-Stack Developer`.

## 5. Files

**Rewritten:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/resume/page.tsx`, and `Navbar`, `Hero`, `About`, `Stats`, `Projects`, `Publications`, `Robotics`, `Timeline`, `Skills`, `Contact`, `Footer`, `SectionHeading`, `ScrollProgress`, `DemoModal`.

**Deleted:** `AntigravityBackground.tsx`, `CustomCursor.tsx`, `TiltCard.tsx`, `SpotlightCard.tsx`, `Magnetic.tsx`, `TypewriterRole.tsx`.

**Added:** `src/components/Plate.tsx`.

`src/app/page.tsx` keeps its current section order and all eleven mounts unchanged, including `<Stats />` directly after `<About />` (§4.3). `src/lib/utils.ts` is untouched.

## 6. Verification

The repo has no test framework — `package.json` exposes only `dev`, `build`, `start` and `lint` — so verification is a build gate plus a manual pass, and no completion claim is made until both have actually been run:

1. `npm run lint` clean.
2. `npm run build` clean — this is the real gate, since it type-checks every rewritten component and will catch any surviving reference to a deleted component or deleted theme token.
3. `grep` for `brand-cyan`, `brand-emerald`, `bg-bg-main`, `rounded-`, `shadow-[0_` and the six deleted component names across `src/` — each must return either nothing or a documented exception (§1).
4. Dev-server pass at 320px, 768px and 1440px: no horizontal scroll at any width, the topbar stacking correctly under `34rem`, and the hero name never overflowing.
5. Keyboard tab through the page: the fluoro focus ring visible against `--paper` at every stop, both modals trapping and releasing focus as they do today.
6. The halftone overlay intercepting no clicks — every link, both modals, the certificates toggle and the gallery thumbnails still operable.
7. `prefers-reduced-motion: reduce` set in the browser: the register animation and all reveals resolve instantly to their final state.

## 7. Out of scope

- The standalone `index.html` at the repo's parent level is a separate, older Google-Sites-era page with no CV link. It is not touched.
- No change to routing, to `public/Rakib_Hossain_CV.pdf`, or to any image asset beyond CSS filters applied at render.
- No new dependency, and no change to the GitHub Pages deploy workflow.
