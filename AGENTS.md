<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

Single Next.js 16 app (App Router, `src/app/`), created with `create-next-app`. No monorepo, no CI, no tests. This directory is its own git repo.

## Not self-contained: the localhost:5000 backend

All book/borrow data is fetched client-side from an Express API in the **sibling git repo** `../Booknook-Server`, hard-coded as `http://localhost:5000` in 12 files under `src/`. If it isn't running, books/borrows pages render their error/empty states — this is the first thing to check when "data doesn't show up".

- Start it: `node index.js` in `../Booknook-Server` (no `start`/`dev` npm script; port `5000` hard-coded). It needs its own `.env` with `MONGODB_URI` and `IMGBB_API_KEY`.
- `../Booknook-Server/AGENTS.md` understates its routes — `index.js` is the source of truth (books CRUD, `/addbooks`, `/new-arrivals`, `/borrowedbooks`, `/my-borrows/:email`, `/my-books/:email`, `/upload-image`).
- Uploaded cover images live on `i.ibb.co`; only that host is in `images.remotePatterns` (`next.config.ts`). Add a hostname there before using another image host.

## Commands

- `npm run dev` — dev server (Turbopack is the default bundler in Next 16)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — script is bare `eslint`, flat config at `eslint.config.mjs`
- Typecheck: `npx tsc --noEmit` (no `typecheck` script exists)

No test runner is configured. Verify changes with `npm run lint` and `npx tsc --noEmit`.

**Both checks are red on a clean checkout** — these are pre-existing, unrelated to your change:

- `npx tsc --noEmit` → `src/app/my-books/page.tsx(64,20): Type 'Book[]' is not assignable to 'AddedBook[]'`
- `npm run lint` → `src/components/BookDetails.tsx:63 react-hooks/set-state-in-effect`

Confirm you didn't *add* new diagnostics; don't fix these unless asked.

Only one `next dev` per checkout: a second invocation exits with `⨯ Another next dev server is already running`, and if port 3000 is busy it silently moves to 3001 — read the banner before curling `localhost:3000`.

## Environment

`.env` exists locally but is gitignored (`.env*` in `.gitignore`), so fresh clones must recreate it or auth breaks. Keys: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Auth: one real system, one vestigial, one route guard

- **Route guard: `src/proxy.ts`** (Next 16 `proxy`, replaces `middleware`). Matcher `["/addbooks", "/my-books", "/my-borrows", "/books/:_id"]`; no session → redirect to `/loginreminder`.
  - The redirect target must be an **absolute** path (`/loginreminder`). A bare `"loginreminder"` resolves against the request URL, so `/books/6543…` bounces to `/books/loginreminder`, which itself matches the matcher → infinite redirect loop.
  - Matcher param names are arbitrary: `:_id` does match the `books/[id]` folder. `/books` (list page) stays public because the pattern requires a segment.
- **Real: better-auth** (`src/lib/auth.ts`, Mongo adapter) served from `src/app/api/auth/[...all]/route.ts`; client side uses `authClient` from `src/lib/auth-client.ts` (Navbar, login/register, my-books, AddBookForm, EditBookDialog, BorrowBook). Note `auth-client.ts` reads `process.env.BETTER_AUTH_URL` without a `NEXT_PUBLIC_` prefix, so it's undefined in the browser and the client falls back to same-origin — that is what actually works; don't "fix" it by hardcoding a URL.
- **Auth pages** live in `src/app/(auth)/` (login, register) with a shared `layout.tsx` that centers them in a `max-w-md` card shell.
- **Known wart:** both auth pages call `redirect()` from `next/navigation` inside async client event handlers, where it throws `NEXT_REDIRECT` instead of navigating. `useRouter().replace(...)` is the correct API — unfixed by choice, fix only if asked.
- **Mock: `src/lib/auth-context.tsx`** — a localStorage flag wrapped around the tree in `root layout.tsx`, but `useAuth()` has zero consumers and its "no backend" comment is stale (Navbar reads the better-auth session instead). Vestigial; don't build features on it.

## Stack quirks (differ from defaults — do not "fix")

- **Next 16.4.3 + React 19.3 + React Compiler** (`reactCompiler: true` in `next.config.ts`). `cacheComponents: false` and `partialPrefetching: false` are explicitly set — no `use cache` discipline is required as configured today.
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.*`. All theme tokens live in `src/app/globals.css` (`@theme inline`, CSS variables in `:root`). CSS is compiled through `@tailwindcss/turbopack` via a Turbopack rule in `next.config.ts`.
- **daisyUI 5** is loaded via `@plugin "daisyui"` in `globals.css` (no JS config).
- **shadcn with `base-nova` style** (`components.json`) — built on `@base-ui/react`, *not* Radix. Add components with `npx shadcn add <component>`; they land in `src/components/ui/`. Don't hand-write Radix-based shadcn code.
- **`cn` util** is `export { cn } from "cn"` in `src/lib/utils.ts` — the `cn` package (twMerge-compatible class merging), not the usual `clsx` + `tailwind-merge` combo.

## Design tokens are hard-coded hex, not theme variables

The palette lives as literal hex classes in components — there is no shared token for it, so copy the exact value to stay consistent:

- Headings: `text-[#1F3864]` — primary CTA buttons: `rounded-md bg-[#B3372B] … text-white hover:bg-[#B3372B]/90`
- Brand/links/nav bar: `#8C2B22` (see `BRAND` in `Navbar.tsx`); footer navy: `#1E3557`
- Carded page pattern: `w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm` inside `flex min-h-[60vh] items-center justify-center px-4` — see `src/app/loginreminder/page.tsx` and `src/app/(auth)/layout.tsx`.

## Conventions

- Path alias: `@/*` → `./src/*`.
- Static images (logo, banners) live in `src/assets/` and are imported as modules (`@/assets/...`). `public/` holds only unused files (create-next-app svgs, `api.json`) — nothing in `src/` references them.
- Root layout uses the typed-route global `LayoutProps<"/">` (generated by Next 16 into `.next/types`) instead of hand-written props — keep it.
- Server Components by default; add `"use client"` only where interactivity requires it (most pages/components here already declare it).
