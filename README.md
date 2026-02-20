# pngwn website + waitlist

Production-focused Next.js website with a server-side Supabase waitlist API.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (`waitlist_signups` table)
- Vercel deployment

## Ocean checklist (exact setup)

1. Create a Supabase project
   - Go to https://supabase.com/dashboard
   - Create a new project and wait until provisioning is complete.
2. Get required Supabase values
   - In Supabase: `Project Settings` -> `API`
   - Copy:
     - `Project URL` -> `SUPABASE_URL`
     - `service_role` key -> `SUPABASE_SERVICE_ROLE_KEY`
3. Run the database schema
   - Open Supabase `SQL Editor`
   - Open repo file `supabase/schema.sql`
   - Copy/paste SQL from that file and run it.
4. Configure local environment

```bash
cp .env.example .env.local
```

   - Fill `.env.local`:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
     - Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=` (leave unset by default)
5. Install and run locally

```bash
npm install
npm run dev
```

6. Confirm waitlist works end-to-end
   - First submit (new email) should return `200`:

```bash
curl -s -i -X POST http://127.0.0.1:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"ocean-test@example.com","source":"website"}'
```

   - Submit same email again should return `409`:

```bash
curl -s -i -X POST http://127.0.0.1:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"ocean-test@example.com","source":"website"}'
```

   - In Supabase Table Editor, confirm the row exists in `waitlist_signups`.

## Security note (important)

`SUPABASE_SERVICE_ROLE_KEY` is a server-only secret.

- Never use it in client-side code.
- Never commit it to git.
- Store it only in `.env.local` (local) and Vercel environment variables (deployed app).

## Predictable behavior when backend is not configured

If `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing, valid submissions return:

- Status: `503`
- Body: `{ "message": "Waitlist backend not configured yet." }`

Quick test (with env vars intentionally unset):

```bash
curl -s -i -X POST http://127.0.0.1:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","source":"website"}'
```

## Local verification commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel (staging first)

Stage A keeps control with Ocean before final brand domain goes live.

1. Import this project into Vercel.
2. Set environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
     - Stage A value: the Vercel URL for this deployment
   - Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (leave unset by default)
3. Deploy.

Explicit note: Vercel automatically generates a default `*.vercel.app` URL on first deploy. Use that URL as Stage A (staging).

4. Validate on the Vercel URL:
   - submit new email => `200`
   - submit same email again => `409`
   - row appears in `waitlist_signups`

## Later: connect custom domain (final cutover)

Stage B happens only when Ocean decides the final brand domain is ready.

1. Add custom domain in Vercel project settings.
2. Add Vercel-provided DNS records at registrar (Ocean-controlled).
3. After domain verification, update Vercel env var:
   - `NEXT_PUBLIC_SITE_URL=https://your-final-domain.com`
4. Redeploy.
5. Re-run waitlist smoke test on the custom domain.

For a concise domain-only checklist, see `DOMAIN.md`.
