import * as mock from "./mock.js";
import * as real from "./real.js";

// Flip with an env var once the real adapter (real.js) is filled in —
// no route or UI changes needed on either side of this switch.
const adapter = process.env.ERS_ADAPTER === "real" ? real : mock;

export const listPrioritizedErs = adapter.listPrioritizedErs;
