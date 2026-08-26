# Risograph print redesign — archived

A complete alternative design for this portfolio: a **two-ink risograph print** in petrol (`#0c5661`) and fluoro orange (`#ff5c1a`) on pale sage stock (`#e3e7e4`), with a halftone dot screen, Archivo Black / Space Grotesk / Space Mono, hairline rules, hard offset shadows, and a misregistered two-pass hero name.

It was built, reviewed, deployed to `main`, and then rolled back in favour of the previous dark/cyan design. Nothing here is wired into the build — this folder sits outside `src/`, so Next.js and TypeScript ignore it.

## Restoring it

The archive is a drop-in replacement for `src/`:

```bash
rm -rf src && cp -r design-archive/riso-print/src src
npm run build
```

Or take it from git history instead, which is the same content:

```bash
git checkout riso-print-redesign -- src/     # branch
git checkout riso-print                      # tag, detached
```

## What differs from the live design, beyond styling

The redesign also carried content corrections against `MD.RAKIB-HOSSAIN_CV.pdf`. **These corrections are NOT in the currently live design** — it still shows the older content:

- **Skills** regrouped to the CV's own six groups, adding a **Methods** group (association-rule mining, model calibration, leakage auditing, benchmarking, experiment design) and dropping **TensorFlow, XGBoost, Power BI, Excel, .NET and SQL Server**, none of which appear in the CV.
- **Projects** reordered to CV order with **Drikon leading**; **AIUB STEAM removed** (absent from the CV); RideGuard's tags reduced to `Python, CatBoost, scikit-learn, SHAP`.
- **Publications** gained **"First author"** on both papers, which the CV states.
- **Stats** figures corrected to CV-supported numbers (2 papers / 4 robot classes / 2,300+ images / 14.5×), replacing the unsupported `14+ podiums` and `6+ robot classes`.
- **Robotics** gained the four robot classes and the ESAB membership; the race-bot photos already on disk were rendered for the first time.

If you keep the old design, those content fixes are worth porting across on their own.

## Known open items

- `public/images/profile.jpg` has a coloured backdrop. The print design frames photos as hard-edged squares and greyscales them, so it renders as a black square with a circular vignette. A headshot on a plain light background fixes it.
- **Drikon has no screenshot**, so it renders a CSS-generated print plate (`Plate.tsx`, variant `a`).
- **RideGuard's Research link is missing.** The CV lists one; the URL was not in the repo and was deliberately not guessed. Add `research: "<url>"` to the RideGuard entry in `Projects.tsx` and it renders automatically.

## Provenance

- Spec: `docs/superpowers/specs/2026-08-26-riso-print-redesign-design.md`
- Plan: `docs/superpowers/plans/2026-08-26-riso-print-redesign.md`
- Built across 11 tasks; tasks 1–9 each passed an independent review plus a browser verification pass, tasks 10–11 were verified but not independently reviewed.
