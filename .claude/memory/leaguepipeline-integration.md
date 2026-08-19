---
name: leaguepipeline-integration
description: The producer/consumer contract with leaguepipeline — shared Postgres schema, no API layer, and where drift could break queries silently.
metadata:
  type: project
---

Snapshot as of 2026-08-18 (leaguepipeline HEAD 257a94e, leaguefrontend HEAD 47e070c). Update if
either side's integration surface changes.

This app and the `leaguepipeline` repo (Python crawler) both connect directly to the same
Supabase Postgres via `DATABASE_URL` — there is no API between them. This app re-implements
its own SQL against `matches`/`participants`/`champions` (see `src/app/page.tsx`, the only
place these queries live now — `src/lib/queries/leaderboard.ts` and its unused
`/api/leaderboard` route were deleted 2026-08-19 as dead/duplicate code); the leaderboard
query is a hand-kept duplicate of `leaguepipeline`'s `queries.sql`. Nothing enforces that the
two stay in sync — a column rename or table drop on the pipeline side only surfaces here as a
runtime query failure.

Verified as of the snapshot above: all columns this app queries
(`champions.name/riot_id`, `participants.champion_id/role/win/kills/deaths/assists`,
`matches.game_creation_ts`) exist in `leaguepipeline`'s `schema.sql`. That schema also defines
`timeline_frames`, `timeline_events`, `champion_matchups`, `item_win_rates` — dead tables no
longer populated by the pipeline — this app doesn't query them today, but don't assume they're
live if a future feature reaches for them.

TLS to the DB requires `certs/supabase-ca.crt` (committed in this repo, `rejectUnauthorized: true`
in `src/lib/db.ts`) — connection fails without it.
