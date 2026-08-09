import { useEffect, useState } from "react";
import { getJSON, patchJSON } from "../api/client.js";
import StatusBadge from "../components/StatusBadge.jsx";
import { toneForStatus } from "../lib/statusTone.js";
import EditableText from "../components/EditableText.jsx";
import GiniDeckModal from "../components/GiniDeckModal.jsx";

const STATUS_OPTIONS = ["Not Started", "In Progress", "Done", "On Hold", "At Risk"];
const DEMO_DECK_URL = "http://localhost:4000/demo/deck-filled.html";

const createBtnStyle = {
  background: "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
  color: "#fff",
  border: "none",
  padding: "5px 12px",
  borderRadius: "7px",
  fontWeight: 600,
  fontSize: "12px",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(10,20,35,0.3)",
  whiteSpace: "nowrap",
};

function groupByProject(tasks) {
  const groups = new Map();
  for (const task of tasks) {
    if (!groups.has(task.project)) groups.set(task.project, []);
    groups.get(task.project).push(task);
  }
  return groups;
}

function DeckPopup({ url, title, onClose }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
    >
      <div style={{ background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "12px", width: "900px", maxWidth: "100%", height: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "22px", cursor: "pointer", lineHeight: 1, padding: "4px", boxShadow: "none" }}>×</button>
        </div>
        <iframe src={url} title={title} style={{ flex: 1, border: "none", width: "100%" }} />
      </div>
    </div>
  );
}

export default function NpiView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [giniModalProject, setGiniModalProject] = useState(null);
  const [giniModalTaskId, setGiniModalTaskId] = useState(null);
  const [giniCreated, setGiniCreated] = useState({});   // { [project]: deckTitle }
  const [deckPopup, setDeckPopup] = useState(null);     // { url, title }

  useEffect(() => {
    getJSON("/npi").then((npiData) => {
      setTasks(npiData);
      setLoading(false);
    });
  }, []);

  async function handleUpdate(id, fields) {
    setSavingId(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...fields } : t)));
    try {
      await patchJSON(`/npi/${id}`, fields);
    } finally {
      setSavingId(null);
    }
  }

  function openModal(project, taskId = null) {
    setGiniModalProject(project);
    setGiniModalTaskId(taskId);
  }

  function handleCreated(project, title) {
    setGiniCreated((prev) => ({ ...prev, [project]: title }));
    // If opened from a specific task row, mark that task Done with deck link in notes
    if (giniModalTaskId) {
      handleUpdate(giniModalTaskId, {
        status: "Done",
        notes: `GINI Deck ready → ${DEMO_DECK_URL}`,
      });
    }
    setGiniModalProject(null);
    setGiniModalTaskId(null);
  }

  if (loading) return <p className="empty-state">Loading NPI tasks…</p>;

  const projectGroups = groupByProject(tasks);

  return (
    <>
      <div style={{
        display: "flex", alignItems: "center", gap: "14px", padding: "14px 20px",
        marginBottom: "20px", borderRadius: "10px",
        background: "linear-gradient(135deg, #1a6fc4 0%, #0d4a8a 60%, #0a2d5e 100%)",
        border: "1px solid rgba(77, 163, 245, 0.4)",
        boxShadow: "0 4px 16px rgba(10, 20, 35, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#deeaf6",
      }}>
        <span style={{ fontSize: "26px", lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>⚡</span>
        <div>
          <EditableText id="npi-banner-label" defaultText="Live Demo" style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4da3f5", marginBottom: "2px" }} />
          <EditableText id="npi-banner-message" defaultText="The info is updated from Asana NPI projects" style={{ fontWeight: 500, fontSize: "15px", color: "#deeaf6" }} />
        </div>
        <EditableText id="npi-banner-pill" defaultText="Asana Sync" style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", background: "rgba(77, 163, 245, 0.18)", border: "1px solid rgba(77, 163, 245, 0.35)", color: "#4da3f5", whiteSpace: "nowrap" }} />
      </div>

      <div className="view-header">
        <EditableText id="npi-title" defaultText="NPI Tasks" tag="h2" />
        <EditableText id="npi-subtitle" defaultText="Pulled from your NPI projects in Asana — one section per project. Edits here write straight back to Asana." tag="p" />
      </div>

      {[...projectGroups.entries()].map(([project, projectTasks]) => (
        <div className="card" key={project}>
          {/* Card title */}
          <div className="card-title">
            <EditableText id={`npi-project-${project}`} defaultText={project} />
          </div>

          {/* Source of truth */}
          <div style={{ padding: "8px 18px", borderBottom: "1px solid var(--gridline)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "11px", flexShrink: 0, color: "var(--text-muted)" }}>Source of truth</span>
            <input
              type="url"
              defaultValue={localStorage.getItem(`npi-source-url-${project}`) || ""}
              placeholder="https://"
              onBlur={(e) => localStorage.setItem(`npi-source-url-${project}`, e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px dashed var(--gridline)", borderRadius: 0, padding: "2px 4px", fontSize: "12.5px", color: "var(--accent)", outline: "none", boxShadow: "none" }}
            />
          </div>

          {/* Tasks table */}
          <table>
            <thead>
              <tr>
                <EditableText id="npi-th-task" defaultText="Task" tag="th" />
                <EditableText id="npi-th-status" defaultText="Status" tag="th" />
                <EditableText id="npi-th-duedate" defaultText="Due date" tag="th" />
                <EditableText id="npi-th-notes" defaultText="Notes" tag="th" />
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((task) => (
                <tr key={task.id}>
                  <EditableText id={`npi-${task.id}-name`} defaultText={task.name} tag="td" className="wrap" />
                  <td>
                    <select
                      value={task.status}
                      disabled={savingId === task.id}
                      onChange={(e) => handleUpdate(task.id, { status: e.target.value })}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={task.dueDate}
                      disabled={savingId === task.id}
                      onChange={(e) => handleUpdate(task.id, { dueDate: e.target.value })}
                    />
                  </td>
                  <td className="wrap">
                    {task.notes && task.notes.includes("http") ? (
                      <button type="button" onClick={() => setDeckPopup({ url: task.notes.split("→ ")[1]?.trim() || task.notes, title: "GINI Deck" })}
                        style={{ background: "none", border: "none", boxShadow: "none", padding: 0, color: "var(--accent)", fontSize: "12.5px", cursor: "pointer", textDecoration: "underline" }}>
                        {task.notes.split("→")[0].trim()}
                      </button>
                    ) : (
                      <EditableText id={`npi-${task.id}-notes`} defaultText={task.notes || "—"} tag="span" />
                    )}
                  </td>
                  <td>
                    <button type="button" onClick={() => openModal(project, task.id)} style={createBtnStyle}>
                      + Create
                    </button>
                  </td>
                </tr>
              ))}

              {/* GINI Deck row */}
              <tr>
                <td className="wrap">
                  GINI Deck{giniCreated[project] ? ` — ${giniCreated[project]}` : ""}
                </td>
                <td>
                  <select
                    value={giniCreated[project] ? "Done" : "Not Started"}
                    disabled
                    onChange={() => {}}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td><input type="date" value="" disabled onChange={() => {}} /></td>
                <td className="wrap">
                  {giniCreated[project] ? (
                    <button type="button" onClick={() => setDeckPopup({ url: DEMO_DECK_URL, title: giniCreated[project] })}
                      style={{ background: "none", border: "none", boxShadow: "none", padding: 0, color: "var(--accent)", fontSize: "12.5px", cursor: "pointer", textDecoration: "underline" }}>
                      View deck
                    </button>
                  ) : "—"}
                </td>
                <td>
                  {!giniCreated[project] && (
                    <button type="button" onClick={() => openModal(project, null)} style={createBtnStyle}>
                      + Create
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {giniModalProject && (
        <GiniDeckModal
          project={giniModalProject}
          onClose={() => { setGiniModalProject(null); setGiniModalTaskId(null); }}
          onCreated={handleCreated}
        />
      )}

      {deckPopup && (
        <DeckPopup url={deckPopup.url} title={deckPopup.title} onClose={() => setDeckPopup(null)} />
      )}
    </>
  );
}
