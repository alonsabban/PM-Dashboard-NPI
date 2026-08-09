import { useState, useEffect } from "react";

const PAT_KEY = "user_config_pat";
const GITHUB_USER_KEY = "user_config_github_user";

const TEMPLATES = [
  "GINI Deck",
  "Deep Dive Deck",
  "High Level Enablement Deck",
];

function deriveSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function GiniDeckModal({ project, onClose, onCreated }) {
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [owners, setOwners] = useState("");
  const storedPat = localStorage.getItem(PAT_KEY);
  const storedGithubUser = localStorage.getItem(GITHUB_USER_KEY);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleTitleChange(val) {
    setTitle(val);
    setSlug(deriveSlug(val));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onCreated(project, title || template);
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        width: "520px",
        maxWidth: "100%",
        maxHeight: "92vh",
        overflowY: "auto",
        padding: "32px",
        position: "relative",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", color: "var(--text-muted)",
            fontSize: "22px", cursor: "pointer", lineHeight: 1, padding: "4px",
          }}
        >×</button>

        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
          New Presentation
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
          A deck will be created and published to GitHub Pages automatically.
        </p>

        <form onSubmit={handleSubmit}>
            <Field label="Template">
              <select value={template} onChange={e => setTemplate(e.target.value)} style={inputStyle}>
                {TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Hint>Defines the slide structure and layout. More templates can be added by your admin.</Hint>
            </Field>

            <Field label="Title">
              <input type="text" value={title} placeholder="e.g. Inventory and Tagging — GINI Playbook"
                onChange={e => handleTitleChange(e.target.value)} style={inputStyle} />
            </Field>

            <Field label={<>Presentation URL path <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(auto-derived, editable)</span></>}>
              <input type="text" value={slug} placeholder="inventory-and-tagging"
                onChange={e => setSlug(e.target.value)} style={inputStyle} />
              <Hint>Live at: …github.io/hub/<span style={{ color: "var(--accent)" }}>{slug || "your-path"}</span>/</Hint>
            </Field>

            <Field label={<>Owners <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(GitHub NG usernames, comma-separated)</span></>}>
              <input type="text" value={owners} placeholder="asabban, jdoe, msmith"
                onChange={e => setOwners(e.target.value)} style={inputStyle} />
              <Hint>Owners can approve updates and are displayed on the hub. Must match GitHub NG usernames.</Hint>
            </Field>

            <Field label="GitHub NG credentials">
              {storedPat ? (
                <Hint style={{ color: "var(--success-text)" }}>
                  ✓ PAT configured{storedGithubUser ? ` · user: ${storedGithubUser}` : ""}. Edit in the config bar at the top of the page.
                </Hint>
              ) : (
                <Hint style={{ color: "var(--status-serious)" }}>
                  ⚠ No PAT found — set it in the config bar at the top of the page before creating.
                </Hint>
              )}
            </Field>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "28px" }}>
              <button type="button" onClick={onClose} style={secondaryBtn}>Cancel</button>
              <button type="submit" style={{
                ...secondaryBtn,
                background: "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(10,20,35,0.3)",
              }}>Create Presentation</button>
            </div>
          </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Hint({ children, style }) {
  return (
    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", ...style }}>
      {children}
    </p>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  background: "var(--surface-1)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const secondaryBtn = {
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  border: "1px solid var(--border)",
  background: "var(--surface-2)",
  color: "var(--text-primary)",
};
