// Real ER prioritization adapter — implement once ready to go live, then set ERS_ADAPTER=real.
// In production this merges two sources:
//   1. Aha Portfolio API (https://www.aha.io/api) for the ER records themselves
//      (title, product, requester) — same auth pattern as adapters/aha/real.js.
//   2. A Snowflake query against the prioritization scoring table for the
//      numeric score. Snowflake auth is account + key-pair (not a simple PAT),
//      so this needs its own settings fields and a proper secret store before
//      it can be wired up — out of scope for the current demo.
//
// Sketch:
//   export async function listPrioritizedErs() {
//     const ers = await fetchAhaPortfolioErs();
//     const scores = await queryScoresFromSnowflake(ers.map((er) => er.id));
//     return ers
//       .map((er) => ({ ...er, score: scores[er.id] ?? 0 }))
//       .sort((a, b) => b.score - a.score);
//   }

export async function listPrioritizedErs() {
  throw new Error("Real ERs adapter not implemented yet — set ERS_ADAPTER=mock");
}
