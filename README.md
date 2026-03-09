# OnGo SmartBath Wipes Landing (Next.js)

A one-page Next.js site to validate user interest in **OnGo SmartBath Wipes**.

## What this includes

- Product-focused landing page content
- `Interested` and `Not Interested` vote buttons
- Live vote totals displayed on the page
- Mobile-friendly responsive layout

## Important note on vote storage

The current vote API uses in-memory storage in `src/app/api/vote/route.js`.
Counts reset when the server restarts or redeploys. For permanent analytics, connect a database (Supabase, Firebase, or similar).

## Run locally

1. Install Node.js 18.17+ or 20+
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`
