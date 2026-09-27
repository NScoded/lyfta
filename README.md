# Lyfta Dashboard

## Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `LYFTA_API_KEY` to your Lyfta API key.
3. Run `npm run dev` to start the Vite UI and Express API server together.

Vite serves the UI at `http://localhost:5173` and proxies `/api` requests to the API server on port 5000.

## Vercel

Vercel serves `api/workouts.js` as a serverless function. Add `LYFTA_API_KEY` under **Project Settings > Environment Variables** for the Production environment (and Preview if needed), then redeploy. Keep the key in Vercel's environment settings; do not commit it or expose it in a `VITE_` variable.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
