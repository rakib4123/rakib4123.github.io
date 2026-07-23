# Md. Rakib Hossain — Portfolio

A single-page personal portfolio built with [Next.js](https://nextjs.org), React, Tailwind CSS, and Framer Motion.

## Structure

- `src/app/` — root layout and page
- `src/components/` — one component per section (Hero, About, Projects, Robotics, Timeline, Skills, Contact, etc.)
- `public/images/` — photos, project shots, certificates

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. Edit `src/app/page.tsx` or any component under `src/components/` — the page auto-updates.

## Deployment

The site is statically exported (`output: "export"` in `next.config.ts`) and deployed to GitHub Pages automatically via `.github/workflows/deploy.yml` on every push to `main`.
