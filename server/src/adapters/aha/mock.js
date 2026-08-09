import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "data", "master-features.json");

function readFeatures() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeFeatures(features) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(features, null, 2));
}

export async function listMasterFeatures() {
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
    source: "Aha",
  };
  features.push(feature);
  writeFeatures(features);
  return feature;
}
