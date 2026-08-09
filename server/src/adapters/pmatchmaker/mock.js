// pMatchmaker is an existing separate application (determines which
// participant products are assigned to which PMs). This demo only wires up
// the search box — the real integration (calling pMatchmaker's own API/MCP
// server) is a later step.
export async function search(query) {
  return {
    query,
    results: [],
    message:
      "pMatchmaker integration coming soon — this will call the existing pMatchmaker app's search API.",
  };
}
