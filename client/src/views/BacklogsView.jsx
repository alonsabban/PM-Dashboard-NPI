import { useEffect, useState } from "react";
import { getJSON, postJSON } from "../api/client.js";
import StatusBadge from "../components/StatusBadge.jsx";
import { toneForStatus } from "../lib/statusTone.js";
import EditableText from "../components/EditableText.jsx";
import PMatchmakerDrawer from "../components/PMatchmakerDrawer.jsx";

const EMPTY_FORM = { name: "", product: "", pi: "2026 Q3", effort: "M", destination: "aha" };

function FeatureTable({ features }) {
  if (features.length === 0) {
    return <p className="empty-state">Nothing here yet.</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <EditableText id="backlogs-th-ref" defaultText="Ref" tag="th" />
          <EditableText id="backlogs-th-feature" defaultText="Master feature" tag="th" />
          <EditableText id="backlogs-th-product" defaultText="Product" tag="th" />
          <EditableText id="backlogs-th-pi" defaultText="PI" tag="th" />
          <EditableText id="backlogs-th-status" defaultText="Status" tag="th" />
          <EditableText id="backlogs-th-effort" defaultText="Effort" tag="th" />
          <EditableText id="backlogs-th-source" defaultText="Source" tag="th" />
        </tr>
      </thead>
      <tbody>
        {features.map((item) => (
          <tr key={item.id}>
            <td style={{ whiteSpace: "nowrap" }}>
                <a href="#" style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textDecoration: "none", letterSpacing: "0.02em" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >{item.ref}</a>
              </td>
            <EditableText id={`backlogs-${item.id}-name`} defaultText={item.name} tag="td" className="wrap" />
            <EditableText id={`backlogs-${item.id}-product`} defaultText={item.product} tag="td" />
            <EditableText id={`backlogs-${item.id}-pi`} defaultText={item.pi} tag="td" />
            <td>
              <StatusBadge label={item.status} tone={toneForStatus(item.status)} />
            </td>
            <EditableText id={`backlogs-${item.id}-effort`} defaultText={item.effort} tag="td" />
            <EditableText id={`backlogs-${item.id}-source`} defaultText={item.source} tag="td" />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BacklogsView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getJSON("/backlogs").then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const created = await postJSON("/backlogs", form);
      setItems((prev) => [...prev, created]);
      setForm(EMPTY_FORM);
      setShowForm(false);
    } finally {
      setCreating(false);
    }
  }

  if (loading) return <p className="empty-state">Loading backlogs…</p>;

  const owned = items.filter((i) => i.role === "Owner");
  const assisting = items.filter((i) => i.role !== "Owner");

  return (
    <>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 20px",
        marginBottom: "20px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #1a6fc4 0%, #0d4a8a 60%, #0a2d5e 100%)",
        border: "1px solid rgba(77, 163, 245, 0.4)",
        boxShadow: "0 4px 16px rgba(10, 20, 35, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#deeaf6",
      }}>
        <span style={{
          fontSize: "26px",
          lineHeight: 1,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
        }}>⚡</span>
        <div>
          <EditableText id="backlogs-banner-label" defaultText="Live Demo" style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4da3f5", marginBottom: "2px" }} />
          <EditableText id="backlogs-banner-message" defaultText="Backlog data is pulled from Aha — and features can be created directly into Aha or Jira from here" style={{ fontWeight: 500, fontSize: "15px", color: "#deeaf6" }} />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flexShrink: 0 }}>
          <EditableText id="backlogs-pill-1" defaultText="Aha" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", background: "rgba(77, 163, 245, 0.18)", border: "1px solid rgba(77, 163, 245, 0.35)", color: "#4da3f5", whiteSpace: "nowrap" }} />
          <EditableText id="backlogs-pill-2" defaultText="Jira" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", background: "rgba(77, 163, 245, 0.18)", border: "1px solid rgba(77, 163, 245, 0.35)", color: "#4da3f5", whiteSpace: "nowrap" }} />
        </div>
      </div>

      <div className="view-header">
        <EditableText id="backlogs-title" defaultText="My Backlogs" tag="h2" />
        <EditableText id="backlogs-subtitle" defaultText="Master Features for the coming PI — the ones you own, and the ones you're assisting on." tag="p" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            background: showForm ? "transparent" : "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
            color: showForm ? "var(--text-secondary)" : "#fff",
            border: showForm ? "1px solid var(--border)" : "none",
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: showForm ? "none" : "0 2px 8px rgba(10,20,35,0.3)",
            transition: "all 0.15s",
          }}
        >{showForm ? "✕ Cancel" : "+ Create feature"}</button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: 20 }}>
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <label>Feature name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="form-row">
              <label>Product</label>
              <input
                type="text"
                required
                placeholder="e.g. Aurora Sensor"
                value={form.product}
                onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              />
            </div>
            <div className="form-row">
              <label>PI</label>
              <input
                type="text"
                required
                value={form.pi}
                onChange={(e) => setForm((f) => ({ ...f, pi: e.target.value }))}
              />
            </div>
            <div className="form-row">
              <label>Effort</label>
              <select value={form.effort} onChange={(e) => setForm((f) => ({ ...f, effort: e.target.value }))}>
                {["S", "M", "L", "XL"].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>Create in</label>
              <select
                value={form.destination}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
              >
                <option value="aha">Aha!</option>
                <option value="jira">Jira</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={creating}
              style={{
                background: creating ? "var(--surface-2)" : "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
                color: creating ? "var(--text-muted)" : "#fff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.04em",
                cursor: creating ? "not-allowed" : "pointer",
                boxShadow: creating ? "none" : "0 2px 8px rgba(10,20,35,0.3)",
                transition: "all 0.15s",
              }}
            >{creating ? "Creating…" : "Create feature"}</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-title"><EditableText id="backlogs-card-owned" defaultText="Master Features you own" /></div>
        <FeatureTable features={owned} />
      </div>

      <div className="card">
        <div className="card-title"><EditableText id="backlogs-card-assisting" defaultText="Master Features you're assisting on" /></div>
        <FeatureTable features={assisting} />
      </div>
      <PMatchmakerDrawer />
    </>
  );
}
