// Real Jira adapter — implement this to go live, then set JIRA_ADAPTER=real.
// API docs: https://developer.atlassian.com/cloud/jira/platform/rest/v3/
// Auth: Jira Cloud uses `email + API token` (Basic auth), not a single bearer
// PAT like Asana/Aha — the Settings view will need a second field for the
// account email alongside the token. Read both from
// ../../config/settings-store.js once added.
//
// Sketch:
//   export async function createFeature(fields) {
//     const { jiraEmail, jiraToken, jiraBaseUrl } = getSettings();
//     const auth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString("base64");
//     const res = await fetch(`${jiraBaseUrl}/rest/api/3/issue`, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         fields: {
//           project: { key: mapProductToJiraProjectKey(fields.product) },
//           summary: fields.name,
//           issuetype: { name: "Epic" }, // Jira's closest equivalent to a Master Feature
//         },
//       }),
//     });
//     const issue = await res.json();
//     return mapJiraIssueToMasterFeature(issue, fields);
//   }

export async function createFeature() {
  throw new Error("Real Jira adapter not implemented yet — set JIRA_ADAPTER=mock");
}

export async function listCreatedFeatures() {
  throw new Error("Real Jira adapter not implemented yet — set JIRA_ADAPTER=mock");
}
