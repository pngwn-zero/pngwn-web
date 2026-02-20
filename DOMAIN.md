# Domain process for pngwn

This project does not require a purchased domain yet.

## Stage A: Vercel staging URL first

1. Deploy project to Vercel.
2. Use the default URL Vercel creates automatically (a `*.vercel.app` URL).
3. Set `NEXT_PUBLIC_SITE_URL` to that `*.vercel.app` URL.
4. Validate waitlist flow on that URL (`200` new, `409` duplicate).

## Stage B: custom domain later (Ocean-controlled)

When Ocean is ready to go live on final brand domain:

1. Buy domain at your registrar (Ocean-controlled account).
2. In Vercel project settings, add the custom domain.
3. In registrar DNS settings, add records exactly as Vercel shows.
4. Wait for domain verification/propagation.
5. Update `NEXT_PUBLIC_SITE_URL` in Vercel to the custom domain URL.
6. Redeploy and re-run waitlist smoke test.

No app changes require a purchased domain before Stage B.
