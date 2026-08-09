import * as mock from "./mock.js";
import * as real from "./real.js";

// Flip with an env var once the real Jira integration (real.js) is filled in —
// no route or UI changes needed on either side of this switch.
const adapter = process.env.JIRA_ADAPTER === "real" ? real : mock;

export const createFeature = adapter.createFeature;
export const listCreatedFeatures = adapter.listCreatedFeatures;
