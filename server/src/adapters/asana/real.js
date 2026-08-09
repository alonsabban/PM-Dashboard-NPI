// Real Asana adapter — implement this to go live, then set ASANA_ADAPTER=real.
// API docs: https://developers.asana.com/reference/rest-api-reference
// Auth: `Authorization: Bearer <Personal Access Token>` — read the token from
// ../../config/settings-store.js (getSettings().asanaToken), set once via the
// Settings view and never hardcoded here.
//
// Sketch:
//   export async function listNpiTasks() {
//     const { asanaToken } = getSettings();
//     const res = await fetch(
//       `https://app.asana.com/api/1.0/projects/${NPI_PROJECT_GID}/tasks?opt_fields=name,assignee.name,due_on,notes,memberships.section.name`,
//       { headers: { Authorization: `Bearer ${asanaToken}` } }
//     );
//     const { data } = await res.json();
//     return data.map(mapAsanaTaskToDashboardTask);
//   }
//
//   export async function updateTask(id, fields) {
//     const { asanaToken } = getSettings();
//     const res = await fetch(`https://app.asana.com/api/1.0/tasks/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${asanaToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: mapDashboardFieldsToAsana(fields) }),
//     });
//     const { data } = await res.json();
//     return mapAsanaTaskToDashboardTask(data);
//   }

export async function listNpiTasks() {
  throw new Error("Real Asana adapter not implemented yet — set ASANA_ADAPTER=mock");
}

export async function updateTask() {
  throw new Error("Real Asana adapter not implemented yet — set ASANA_ADAPTER=mock");
}
