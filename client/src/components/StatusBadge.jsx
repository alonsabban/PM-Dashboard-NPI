// Status colors are reserved (good/warning/serious/critical) and always
// paired with an icon + text label — a status is never carried by color alone.
const TONE_VAR = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
  neutral: "var(--text-muted)",
};

export default function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span className="status-badge">
      <span className="status-lamp" style={{ "--lamp-color": TONE_VAR[tone] }} />
      {label}
    </span>
  );
}
