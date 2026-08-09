async function request(path, options) {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const getJSON = (path) => request(path);
export const patchJSON = (path, body) =>
  request(path, { method: "PATCH", body: JSON.stringify(body) });
export const postJSON = (path, body) =>
  request(path, { method: "POST", body: JSON.stringify(body) });
