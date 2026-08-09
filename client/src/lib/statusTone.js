const TONE_BY_STATUS = {
  "Not Started": "neutral",
  "In Progress": "good",
  Done: "good",
  "On Hold": "warning",
  "At Risk": "warning",
  Prioritized: "good",
  "On Track": "good",
  "Under Review": "neutral",
  Planned: "neutral",
  Blocked: "critical",
  Rejected: "critical",
};

export function toneForStatus(status) {
  return TONE_BY_STATUS[status] || "neutral";
}
