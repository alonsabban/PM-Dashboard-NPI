import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Overview from "./views/Overview.jsx";
import NpiView from "./views/NpiView.jsx";
import BacklogsView from "./views/BacklogsView.jsx";
import ErsView from "./views/ErsView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { IconGrid, IconTasks, IconStar, IconLayers, IconSliders } from "./components/icons.jsx";
import { EditProvider, useEditMode } from "./context/EditContext.jsx";

const GINI_TEMPLATE_URL = "http://localhost:4000/demo/deck-template.html";
const GINI_FILLED_URL   = "http://localhost:4000/demo/deck-filled.html";

const TEMPLATES = [
  { label: "GINI Deck",                    url: GINI_TEMPLATE_URL, filledUrl: GINI_FILLED_URL },
  { label: "Deep Dive Deck",               url: null },
  { label: "High Level Enablement Deck",   url: null },
];

function TemplateModal({ template, onClose }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
    >
      <div style={{ background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "12px", width: "900px", maxWidth: "100%", height: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>{template.label}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Slide template preview</div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {template.filledUrl && (
              <a href={template.filledUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                View filled example ↗
              </a>
            )}
            <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "22px", cursor: "pointer", lineHeight: 1, padding: "4px", boxShadow: "none" }}>×</button>
          </div>
        </div>
        <iframe src={template.url} title={template.label} style={{ flex: 1, border: "none", width: "100%" }} />
      </div>
    </div>
  );
}

function TemplateLinks() {
  const [activeTemplate, setActiveTemplate] = useState(null);
  return (
    <>
      <div style={{ paddingLeft: "28px", display: "flex", flexDirection: "column", gap: "1px", marginTop: "1px" }}>
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            type="button"
            className="nav-link-button"
            onClick={() => t.url ? setActiveTemplate(t) : null}
            style={{
              width: "100%", textAlign: "left", padding: "5px 10px 5px 8px",
              borderRadius: "3px", fontSize: "12.5px", fontWeight: 500,
              color: t.url ? "var(--text-secondary)" : "var(--text-muted)",
              cursor: t.url ? "pointer" : "default",
              display: "flex", alignItems: "center", gap: "6px",
              opacity: t.url ? 1 : 0.55,
            }}
          >
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>↳</span>
            {t.label}
            {!t.url && <span style={{ fontSize: "10px", color: "var(--text-muted)", marginLeft: "auto" }}>soon</span>}
          </button>
        ))}
      </div>
      {activeTemplate && <TemplateModal template={activeTemplate} onClose={() => setActiveTemplate(null)} />}
    </>
  );
}

function navClass({ isActive }) {
  return "nav-link" + (isActive ? " active" : "");
}

function EditToggle() {
  const { isEditing, setIsEditing } = useEditMode();
  return (
    <button
      onClick={() => setIsEditing((v) => !v)}
      title={isEditing ? "Done editing" : "Edit page text"}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isEditing
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
        color: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        transition: "background 0.2s",
      }}
    >
      {isEditing ? "✅" : "✏️"}
    </button>
  );
}

function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PM</div>
          <h1>
            PM Dashboard
            <span className="brand-sub">Line status</span>
          </h1>
        </div>

        <NavLink to="/overview" className={navClass}>
          <IconGrid size={17} />
          Overview
        </NavLink>

        <NavLink to="/backlogs" className={navClass}>
          <IconLayers size={17} />
          My Backlogs
        </NavLink>
        <NavLink to="/ers" className={navClass}>
          <IconStar size={17} />
          Prioritized ERs
        </NavLink>
        <NavLink to="/npi" className={navClass}>
          <IconTasks size={17} />
          NPI Tasks
        </NavLink>
        <TemplateLinks />

        <div className="nav-spacer" />
        <NavLink to="/settings" className={navClass}>
          <IconSliders size={17} />
          Settings
        </NavLink>
        <UserProfile />
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<BacklogsView />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/npi" element={<NpiView />} />
          <Route path="/backlogs" element={<BacklogsView />} />
          <Route path="/ers" element={<ErsView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>
      <EditToggle />
    </div>
  );
}

export default function App() {
  return (
    <EditProvider>
      <AppShell />
    </EditProvider>
  );
}
