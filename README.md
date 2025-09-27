This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher (recommended: 20.x)
- pnpm or npm
- PandaScore API key (sign up at [https://pandascore.co/](https://pandascore.co/))

### Installation

1. Install dependencies:

```bash
pnpm install
# or
npm install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and add your PandaScore API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and replace `your_api_key_here` with your actual PandaScore API key:

```env
PANDASCORE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## PandaScore integration & local run

Environment variables (create `.env.local`):

```
PANDASCORE_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
REDIS_URL=redis://localhost:6379   # optional for caching
CACHE_TTL_MS=300000
STALE_WINDOW_MS=60000
MAX_PAGES=5
```

Run Redis locally (optional):

```
docker run -p 6379:6379 -d redis:7
```

Start dev server:

```
pnpm dev
# or
npm run dev
```

Prefetch cache (optional):

```
pnpm run prefetch:matches
```

Run tests:

```
pnpm test
```

Healthcheck endpoint: `/api/health` (reports PandaScore & Redis connectivity)

