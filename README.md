# Lizz Shop

A responsive fashion storefront built with Next.js App Router, Clerk authentication, MongoDB, Stripe Checkout, and Resend order emails.

## Requirements

- Node.js 20 or later
- A MongoDB Atlas database (or a MongoDB instance reachable by the app)
- Clerk application keys
- Stripe keys and a webhook endpoint
- Resend API key and a verified sender address for production email

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in each value from its provider dashboard. Keep `.env.local` private; it is ignored by Git.
3. In Clerk, add `http://localhost:3000` as a development domain and configure sign-in and sign-up URLs as `/login` and `/signup`.
4. In MongoDB Atlas, create a database user and allow network access from your development machine. Put the connection string in `MONGODB_URI` and include the database name in the URL.
5. In Stripe, use test keys and configure a webhook to `http://localhost:3000/api/webhook` for the `checkout.session.completed` event. For local webhook testing, run `stripe listen --forward-to localhost:3000/api/webhook` and copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
6. In Resend, create an API key and verify the sender domain/address used by `RESEND_FROM_EMAIL`. Resend's test sender is for limited testing and is not suitable for production orders.
7. Start the app with `npm run dev` and open <http://localhost:3000>.

Product data currently comes from `src/data/products.json`. Checkout accepts product IDs and quantities from the browser, then looks up prices on the server before creating the pending MongoDB order and Stripe Checkout session. Stripe's signed webhook changes the order to `processing` after a paid session. The browser return URL alone never marks an order as paid.

## Production deployment

1. Deploy to a Node.js-compatible host such as Vercel and set every variable from `.env.example` in the host's encrypted environment settings. Set `NEXT_PUBLIC_APP_URL` to the canonical HTTPS origin with no trailing slash.
2. Use production Clerk keys and add the production hostname to the Clerk application.
3. Restrict MongoDB network access to the deployment platform where possible, use a dedicated least-privilege database user, and enable backups.
4. Use Stripe live keys. Register `https://YOUR_DOMAIN/api/webhook` in Stripe and set its signing secret as `STRIPE_WEBHOOK_SECRET`. Keep the webhook route public so Stripe can reach it; signature verification authenticates webhook requests.
5. Verify the Resend sending domain and use its production sender address.
6. Run `npm run typecheck`, `npm run lint`, and `npm run build` before deployment. After deployment, complete a low-value end-to-end purchase and verify the order status and email.

## Environment variables

See `.env.example` for the full list. Never commit `.env.local`, publish secret keys, or prefix server-only keys with `NEXT_PUBLIC_`.

## Operational notes

- `GET /api/orders` requires a signed-in Clerk user and returns only that user's latest 50 orders.
- `POST /api/create-payment-intent` requires a signed-in Clerk user and rejects unknown product IDs, invalid quantities, and incomplete shipping addresses.
- The order confirmation email is sent from the Stripe webhook after payment confirmation. Stripe may retry webhook events; webhook handling is safe when the same event is delivered more than once.
- The shop uses an in-repository sample catalog. Replace it with managed product data and inventory controls before accepting real customer orders at scale.
