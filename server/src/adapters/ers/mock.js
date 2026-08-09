import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "data", "ers.json");

export async function listPrioritizedErs() {
  const ers = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  return [...ers].sort((a, b) => b.score - a.score);
}
