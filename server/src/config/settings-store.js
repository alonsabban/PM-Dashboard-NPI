import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETTINGS_PATH = path.join(__dirname, "..", "data", "settings.json");

const DEFAULTS = {
  asanaToken: "",
  ahaToken: "",
  giniDeckFormUrl: "",
};

function readSettings() {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function writeSettings(next) {
  const merged = { ...readSettings(), ...next };
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(merged, null, 2));
  return merged;
}

export function getSettings() {
  return readSettings();
}

// Returns tokens masked (last 4 chars only) plus connected flags — safe to send to the client.
export function getMaskedSettings() {
  const settings = readSettings();
  const mask = (value) =>
    value ? `${"*".repeat(Math.max(value.length - 4, 0))}${value.slice(-4)}` : "";
  return {
    asanaTokenMasked: mask(settings.asanaToken),
    ahaTokenMasked: mask(settings.ahaToken),
    asanaConnected: Boolean(settings.asanaToken),
    ahaConnected: Boolean(settings.ahaToken),
    giniDeckFormUrl: settings.giniDeckFormUrl,
  };
}

export function saveSettings(update) {
  return writeSettings(update);
}
