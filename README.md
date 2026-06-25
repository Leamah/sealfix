# SealFix SA

Marketing site, instant pricing calculator, and lead-capture pipeline for SealFix SA — a South
African civil engineering, construction, and surface infrastructure contractor (roadworks,
asphalt surfacing, pothole repair, sealing, line marking, road signage, and painted road
symbols).

Built with Next.js 16 (App Router), TypeScript, and Tailwind v4.

> **Note for AI agents:** see [AGENTS.md](./AGENTS.md) — this Next.js version has breaking
> changes from what most training data assumes. Read `node_modules/next/dist/docs/` before
> writing code against it.

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — pages (App Router). Service pages live under `src/app/services/[slug]`,
  city pages under `src/app/areas/[slug]`.
- `src/lib/content/` — all editable copy: `services.ts`, `areas.ts`, `faqs.ts`, `company.ts`
  (single source of truth for name, phone, email, address, used in metadata + JSON-LD).
- `src/lib/pricing/` — the calculator engine. `rates.ts` holds base rates; `rate-store.ts`
  layers `RATE_OVERRIDE_*` env vars and `/admin` session edits on top of those defaults.
- `src/app/admin/` — password-protected (`ADMIN_PASSWORD`) pricing editor and a standalone
  quote generator (editable line items, branded PDF export with T&Cs).
- `src/app/api/leads` and `src/app/api/site-assessment` — lead capture endpoints. Both write
  a row to a Google Sheet via an Apps Script webhook and send a Brevo notification email.

## Environment variables

See [.env.local.example](./.env.local.example) for the full list with setup instructions.
Required for the site to build and run with no missing-feature warnings:

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, OG images, sitemap |
| `ADMIN_PASSWORD` | Gates `/admin` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Lead log (Apps Script `doPost`, no service account) |
| `BREVO_API_KEY` | Email notifications on new leads / site-assessment requests |
| `LEAD_NOTIFY_EMAIL` | Inbox that receives those notifications |

`RATE_OVERRIDE_*` vars are optional — they're the only way to make a base-rate change in
`/admin` persist across a Vercel redeploy (the admin UI itself only edits the running
serverless instance).

## Deploying

Pushes to `main` deploy automatically via Vercel. Run `npm run build` locally first if you
want to catch type errors before pushing — `tsc` runs as part of the build.
