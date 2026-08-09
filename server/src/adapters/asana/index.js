import * as mock from "./mock.js";
import * as real from "./real.js";

// Flip with an env var once the real Asana integration (real.js) is filled in —
// no route or UI changes needed on either side of this switch.
const adapter = process.env.ASANA_ADAPTER === "real" ? real : mock;

export const listNpiTasks = adapter.listNpiTasks;
export const updateTask = adapter.updateTask;
