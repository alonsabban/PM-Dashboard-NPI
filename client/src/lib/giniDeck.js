export function buildGiniDeckUrl(baseUrl, projectName) {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("project", projectName);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
