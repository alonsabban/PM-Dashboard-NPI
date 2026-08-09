// Real Aha! adapter — implement this to go live, then set AHA_ADAPTER=real.
// API docs: https://www.aha.io/api
// Auth: `Authorization: Bearer <Personal Access Token>` — read the token from
// ../../config/settings-store.js (getSettings().ahaToken), set once via the
// Settings view and never hardcoded here.
//
// Sketch:
//   export async function listMasterFeatures() {
//     const { ahaToken } = getSettings();
//     const res = await fetch(`https://<account>.aha.io/api/v1/features?fields=name,release,workflow_status,owner`, {
//       headers: { Authorization: `Bearer ${ahaToken}` },
//     });
//     const { features } = await res.json();
//     return features.map(mapAhaFeatureToMasterFeature); // role = owner.id === me ? "Owner" : "Collaborator"
//   }
//
//   export async function createFeature(fields) {
//     const { ahaToken } = getSettings();
//     const res = await fetch(`https://<account>.aha.io/api/v1/products/<product_id>/features`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${ahaToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ feature: { name: fields.name, release: fields.pi } }),
//     });
//     const { feature } = await res.json();
//     return mapAhaFeatureToMasterFeature(feature);
//   }

export async function listMasterFeatures() {
  throw new Error("Real Aha adapter not implemented yet — set AHA_ADAPTER=mock");
}

export async function createFeature() {
  throw new Error("Real Aha adapter not implemented yet — set AHA_ADAPTER=mock");
}
