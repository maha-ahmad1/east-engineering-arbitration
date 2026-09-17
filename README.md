# خدمات التحكيم الهندسي — Landing Page

Arabic (RTL) landing page for the engineering-arbitration service line of
**استشاريون الشرق**.

This is a **standalone project**. It shares no code, assets, database, or
deployment with the main East Consultants website — that site was used only as
a visual reference for the brand palette.

## Stack

- Next.js 16.3 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 — design tokens live in `app/globals.css` under `@theme`,
  there is no `tailwind.config.js`
- TypeScript
- `lucide-react` for icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Baserow values
npm run dev                  # http://localhost:3000
```

## Environment variables

The contact form writes leads to [Baserow](https://baserow.io).

| Variable            | Required | Notes                                                      |
| ------------------- | -------- | ---------------------------------------------------------- |
| `BASEROW_TOKEN`     | yes      | Database token with **create** permission on the leads table |
| `BASEROW_TABLE_ID`  | yes      | Numeric table id, visible in the table's URL                 |
| `BASEROW_API_URL`   | no       | Only for a self-hosted instance (default `https://api.baserow.io`) |

The token is read exclusively in `lib/baserow.ts`, which is marked
`server-only` — it never reaches the browser. Submissions go through
`app/api/lead/route.ts`.

### Baserow table columns

Create these columns, with exactly these names (the API is called with
`user_field_names=true`):

`الاسم` · `الجوال` · `البريد` · `نوع النزاع` · `ملخص النزاع` · `المصدر`

Without the env vars set, the form still renders and validates; a submit fails
gracefully and offers a WhatsApp fallback instead of dead-ending.

## Editing content

**All Arabic copy lives in `lib/content.ts`** — nothing is hardcoded in JSX.
Contact details live in `lib/site.ts`.

> ⚠ Two blocks in `content.ts` (`whyUs` and `faq`) are marked
> `⚠ DRAFT — awaiting client review`. Everything else is client-supplied text
> used verbatim and should not be reworded.

## Project layout

```
app/
  layout.tsx          lang="ar" dir="rtl", fonts, metadata, JSON-LD
  page.tsx            composes the sections in order
  globals.css         design tokens, RTL base, keyframes
  api/lead/route.ts   POST → Baserow
components/
  layout/             header, footer, WhatsApp FAB
  sections/           one file per page section
  ui/                 Button, SectionHeading, Reveal, LeadForm, StatCounter
lib/
  content.ts          all Arabic copy
  site.ts             contact details and nav
  baserow.ts          server-only Baserow client
  useReveal.ts        shared IntersectionObserver
```

Sections are self-contained — reordering the page means reordering lines in
`app/page.tsx`.

## Conventions

- **RTL via logical properties only** (`ps-`/`pe-`/`ms-`/`me-`/`text-start`).
  Never use `left`/`right` utilities.
- **Never apply `letter-spacing` to Arabic** — it breaks cursive joins.
- Server components by default; `"use client"` only where there is real
  interactivity.
- All motion is CSS-driven and disabled under `prefers-reduced-motion`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

Deploy to its own Vercel project (not the East Consultants one). Set
`BASEROW_TOKEN` and `BASEROW_TABLE_ID` in the project's environment variables.
