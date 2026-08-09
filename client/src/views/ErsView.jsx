import { useEffect, useState } from "react";
import { getJSON } from "../api/client.js";
import EditableText from "../components/EditableText.jsx";

const ER_STATUSES = ["Posted", "Analyzing", "Clarification", "Planned", "Rejected", "Delivered"];

export default function ErsView() {
  const [ers, setErs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDir, setSortDir] = useState("desc");

  function handleStatusChange(id, status) {
    setErs((prev) => prev.map((er) => er.id === id ? { ...er, status } : er));
  }

  useEffect(() => {
    getJSON("/ers").then((data) => {
      setErs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="empty-state">Loading prioritized ERs…</p>;

  const sorted = [...ers].sort((a, b) =>
    sortDir === "desc" ? b.score - a.score : a.score - b.score
  );

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
          <EditableText id="ers-banner-label" defaultText="Live Demo" style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4da3f5", marginBottom: "2px" }} />
          <EditableText id="ers-banner-message" defaultText="The info is collected from Aha and/or the Prioritization score in Snowflake" style={{ fontWeight: 500, fontSize: "15px", color: "#deeaf6" }} />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flexShrink: 0 }}>
          <EditableText id="ers-pill-1" defaultText="Aha" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", background: "rgba(77, 163, 245, 0.18)", border: "1px solid rgba(77, 163, 245, 0.35)", color: "#4da3f5", whiteSpace: "nowrap" }} />
          <EditableText id="ers-pill-2" defaultText="Snowflake" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", background: "rgba(77, 163, 245, 0.18)", border: "1px solid rgba(77, 163, 245, 0.35)", color: "#4da3f5", whiteSpace: "nowrap" }} />
        </div>
      </div>

      <div className="view-header">
        <EditableText id="ers-title" defaultText="Prioritized ERs" tag="h2" />
        <EditableText id="ers-subtitle" defaultText="Enhancement requests from Aha Portfolio, scored by the Snowflake prioritization model." tag="p" />
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <EditableText id="ers-th-ref" defaultText="Ref" tag="th" />
              <EditableText id="ers-th-request" defaultText="Request" tag="th" />
              <EditableText id="ers-th-product" defaultText="Product" tag="th" />
              <EditableText id="ers-th-subcategory" defaultText="Sub category" tag="th" />
              <EditableText id="ers-th-requestedby" defaultText="Requested by" tag="th" />
              <EditableText id="ers-th-status" defaultText="Status" tag="th" />
              <th
                className="num"
                style={{ cursor: "pointer" }}
                onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
                title="Click to sort"
              >
                Score {sortDir === "desc" ? "↓" : "↑"}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((er) => (
              <tr key={er.id}>
                <td style={{ whiteSpace: "nowrap" }}>
                  <a href="#" style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textDecoration: "none", letterSpacing: "0.02em" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  >{er.ref}</a>
                </td>
                <EditableText id={`ers-${er.id}-title`} defaultText={er.title} tag="td" className="wrap" />
                <EditableText id={`ers-${er.id}-product`} defaultText={er.product} tag="td" />
                <EditableText id={`ers-${er.id}-subcategory`} defaultText={er.subCategory || "—"} tag="td" />
                <EditableText id={`ers-${er.id}-requestedby`} defaultText={er.requestedBy} tag="td" />
                <td>
                  <select
                    value={er.status}
                    onChange={(e) => handleStatusChange(er.id, e.target.value)}
                  >
                    {ER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="num">{er.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
