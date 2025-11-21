# Trait Flow v3.0 — Next.js + Supabase + LangGraph Orchestrator

This repository now mirrors the production-ready prototype that lives in [`trait-flow-screen`](https://github.com/k-naruse3209/trait-flow-screen). It uses the same Next.js 15 + Supabase stack for authentication, TIPI onboarding, mood check-ins, multilingual dashboards, and Server Components, while adding the **AI Coaching** workflow described in [`new_design.md`](./new_design.md) and `docs/ai_coaching_message_design.md`.

The Vite-based proof-of-concept has been replaced with this architecture so that we can ship the new coaching experience without maintaining two separate stacks.

## Key Features

- **Supabase Auth & Data**: App Router pages and Middleware enforce Supabase sessions across locales. Database schema + RLS + Edge Functions live under `supabase/`.
- **TIPI & Check-ins**: Users complete the Big Five onboarding (`/api/tipi-submit`) and submit daily mood/energy/note check-ins (`/api/checkins`).
- **AI Coaching via Orchestrator**: Whenever an intervention is required, the Next.js API calls the LangGraph orchestrator (`lib/orchestrator-client.ts`). It sends mood/energy/note/context and receives a structured coaching message that is saved to `interventions`. If the orchestrator is unavailable, the legacy OpenAI fallback from the prototype runs locally.
- **Dashboards & History**: The dashboard (`app/[locale]/(protected)/dashboard`) displays streaks, mood analytics, interventions, and check-in history using shadcn/ui.
- **Documentation**: The specs that guided this rewrite live in `docs/` (integration plan, orchestrator spec, system spec, and the new AI coaching design).

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   - Copy `.env.example` to `.env.local`.
   - Fill in:
     - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     - `ORCHESTRATOR_URL`, `ORCHESTRATOR_API_KEY`, `ORCHESTRATOR_TIMEOUT_MS`
     - (Optional) `OPENAI_API_KEY` if you want the built-in fallback generator.
3. **Run Supabase migrations**
   ```bash
   npx supabase db push
   ```
4. **Start the dev server**
   ```bash
   npm run dev
   ```

## Orchestrator Integration

- `lib/orchestrator-client.ts` encapsulates the POST `/api/respond` call. It passes the payload specified in [`new_design.md`](./new_design.md): mood, energy, last note, analytics (average mood, trend, streak), Big Five traits, and history references.
- `app/api/checkins/route.ts` now:
  1. Stores the check-in in Supabase.
  2. Computes analytics and, when needed, calls `triggerInterventionGeneration`.
  3. `triggerInterventionGeneration` prefers the orchestrator result; if unavailable, it falls back to the original `processInterventionWithAI`.
  4. Saves the resulting message to `interventions` so both dashboard and mobile UI consume the same data.

Configure the orchestrator URL/API key to point at the LangGraph FastAPI deployment described in `docs/orchestrator_spec.md`.

## Repository Structure

- `app/`: Next.js App Router pages (auth, dashboard, locale-aware routes, API handlers).
- `components/`: shadcn/ui based UI kit, history widgets, and TIPI/Check-in components.
- `hooks/`: data fetching hooks powered by Supabase.
- `lib/`: TIPI scoring, mood analytics, orchestrator + OpenAI clients, monitoring utilities.
- `supabase/`: migrations, config, and Edge Functions (`tipi-submit`, `traits`).
- `docs/`: integration plan, system spec, orchestrator spec, Vietnamese font notes, and the new AI coaching design.

## Additional References

- [`new_design.md`](./new_design.md): High-level LangGraph workflow (State Analysis → RAG → Strategy Selection → Generation).
- [`docs/ai_coaching_message_design.md`](./docs/ai_coaching_message_design.md): Payloads, prompts, KPI plan.
- [`docs/mvp3-integration-plan.md`](./docs/mvp3-integration-plan.md): How this repo aligns with `trait-flow-screen`.

This setup lets us iterate on one stack (Next.js + Supabase) while rolling out the v3.0 AI coaching experience defined in the new design documents.
