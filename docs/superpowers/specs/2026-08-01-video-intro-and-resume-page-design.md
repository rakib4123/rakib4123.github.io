# Video introduction + separate Resume page

## Context

The portfolio needs to satisfy an e-portfolio assignment checklist:
- Photo & short bio — already satisfied by the existing About section.
- Video introduction — not present. To be added.
- Resume on a different page/tab — currently a direct PDF download link, not a page.
- Other skills/projects/experience — already satisfied by the existing Projects, Robotics, Timeline, and Skills sections on the home page (reachable via the navbar).

The site stays a single scrolling home page for everything except the resume, which becomes a real separate route.

## 1. Video introduction (Hero section)

`src/components/Hero.tsx` currently centers a single text column over the canvas background (`AntigravityBackground`). Change it to a two-column layout:

- **Desktop:** text on the left, video player on the right.
- **Mobile:** video stacks below the text.

The video player is a plain HTML5 `<video controls playsInline>` element (same pattern already used in `Robotics.tsx` for the robot build video), with:
- `poster="/images/profile.jpg"` (existing profile photo, shown before playback)
- `<source src="/intro-video.mp4" type="video/mp4" />`

`/intro-video.mp4` does not exist yet — the user will add it to `public/` later. No code needs to handle its absence specially; the browser will just show a broken/empty player until the file exists, exactly like the resume PDF link did before it was resolved.

## 2. Resume — separate page

New route: `src/app/resume/page.tsx`.

Contents:
- A "← Back to portfolio" link at the top, pointing to `/`.
- The resume embedded full-width via `<iframe src="/Rakib_Hossain_CV.pdf">`.
- A "Download PDF" button/link (`<a href="/Rakib_Hossain_CV.pdf" download>`).

`Rakib_Hossain_CV.pdf` does not exist yet either (user-provided, as already discussed) — the iframe will show a not-found state until it's added.

### Nav changes

- `Navbar.tsx`: the "Resume" link changes from `<a href="/Rakib_Hossain_CV.pdf" download>` to a Next.js `<Link href="/resume">` (internal navigation, no `download` attribute).
- `Hero.tsx`: same change for its "Resume" button.

### Config change

Add `trailingSlash: true` to `next.config.ts`. With `output: "export"`, this makes Next emit `resume/index.html` instead of `resume.html`, which is the more portable static-hosting shape and avoids relying on GitHub Pages' extension-less URL matching.

## Out of scope

- No changes to About, Projects, Robotics, Timeline, Skills, Contact, or Footer.
- No handling for missing video/PDF files beyond graceful degradation (same as today).
- No new nav link for the video (it lives inside Hero, not a separate section).

## Verification

- `npx eslint .` and `npx tsc --noEmit` clean.
- `npm run build` succeeds and produces `out/resume/index.html`.
- Manual check: Navbar and Hero "Resume" buttons navigate to `/resume` (no download attribute), the resume page has a working back-link, and the Hero section renders as two columns on desktop / stacked on mobile.
