import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "data", "jira-features.json");

function readFeatures() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeFeatures(features) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(features, null, 2));
}

// Features created here live only in Jira in real life — the dashboard tracks
// them locally so "My Backlogs" reflects what you created, same as Aha's list.
export async function listCreatedFeatures() {
  return readFeatures();
}

export async function createFeature(fields) {
  const features = readFeatures();
  const feature = {
    id: `mf-${Date.now()}`,
    name: fields.name,
    product: fields.product,
    pi: fields.pi,
    status: "Planned",
    effort: fields.effort || "M",
    role: "Owner",
    source: "Jira",
  };
  features.push(feature);
  writeFeatures(features);
  return feature;
}
