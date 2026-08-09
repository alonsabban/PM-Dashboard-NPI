import { useEffect, useState } from "react";
import { getJSON, postJSON } from "../api/client.js";
import EditableText from "../components/EditableText.jsx";

function IntegrationCard({ icon, title, color, children }) {
  return (
    <div style={{
      background: "var(--surface-1)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "14px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 18px",
        background: `linear-gradient(135deg, ${color}18 0%, transparent 100%)`,
        borderBottom: "1px solid var(--border)",
        borderLeft: `3px solid ${color}`,
      }}>
        <span style={{ fontSize: "18px" }}>{icon}</span>
        <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)" }}>{title}</span>
      </div>
      <div style={{ padding: "18px" }}>
        {children}
      </div>
    </div>
  );
}

function TokenField({ label, storageKey, placeholder, hint, serverConnected, serverMasked, value, onChange }) {
  const localVal = storageKey ? localStorage.getItem(storageKey) : null;
  const isConnected = serverConnected || !!localVal;
  const masked = serverMasked || (localVal ? localVal.slice(-4) : null);

  return (
    <div style={{ marginBottom: "4px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
          {label}
        </label>
        {isConnected ? (
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--status-good)", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--status-good)", display: "inline-block" }} />
            Connected{masked ? ` · ••••${masked}` : ""}
          </span>
        ) : (
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)" }}>Not connected</span>
        )}
      </div>
      <input
        type="password"
        placeholder={isConnected ? "Enter new token to replace" : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => {
          const v = e.target.value.trim();
          if (v && storageKey) localStorage.setItem(storageKey, v);
        }}
      />
      {hint && <p style={{ margin: "5px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, hint }) {
  return (
    <div style={{ marginBottom: "4px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "6px" }}>
        {label}
      </label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {hint && <p style={{ margin: "5px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

export default function SettingsView() {
  const [settings, setSettings] = useState(null);
  const [asanaToken, setAsanaToken] = useState("");
  const [ahaToken, setAhaToken] = useState("");
  const [giniDeckFormUrl, setGiniDeckFormUrl] = useState("");
  const [githubUser, setGithubUser] = useState(() => localStorage.getItem("user_config_github_user") || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getJSON("/settings").then((data) => {
      setSettings(data);
      setGiniDeckFormUrl(data.giniDeckFormUrl || "");
    });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (githubUser.trim()) localStorage.setItem("user_config_github_user", githubUser.trim());
    const updated = await postJSON("/settings", { asanaToken, ahaToken, giniDeckFormUrl });
    setSettings(updated);
    setAsanaToken("");
    setAhaToken("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <div className="view-header">
        <EditableText id="settings-title" defaultText="Settings" tag="h2" />
        <EditableText id="settings-subtitle" defaultText="Configure your integrations and personal tokens once — the dashboard remembers them." tag="p" />
      </div>

      <form onSubmit={handleSave}>
        <IntegrationCard icon="👤" title="My Profile" color="#6366f1">
          <TextField
            label="GitHub username"
            value={githubUser}
            onChange={setGithubUser}
            placeholder="e.g. asabban"
            hint="Used as the owner on GINI Deck presentations."
          />
          <div style={{ marginTop: "14px" }}>
            <TokenField
              label="GitHub NG Personal Access Token"
              storageKey="user_config_pat"
              placeholder="github_pat_… or gho_…"
              value=""
              onChange={() => {}}
              hint="Needs contents: write on the hub repo."
            />
          </div>
        </IntegrationCard>

        <IntegrationCard icon="📋" title="Asana" color="#f97316">
          <TokenField
            label="Personal Access Token"
            storageKey={null}
            placeholder="Paste your Asana PAT"
            serverConnected={settings?.asanaConnected}
            serverMasked={settings?.asanaTokenMasked}
            value={asanaToken}
            onChange={setAsanaToken}
            hint="Read from your NPI projects. Generate at app.asana.com → My Profile → Apps."
          />
        </IntegrationCard>

        <IntegrationCard icon="💡" title="Aha!" color="#8b5cf6">
          <TokenField
            label="Personal Access Token"
            storageKey="user_config_aha"
            placeholder="Paste your Aha! PAT"
            serverConnected={settings?.ahaConnected}
            serverMasked={settings?.ahaTokenMasked}
            value={ahaToken}
            onChange={setAhaToken}
            hint="Used to pull backlog features and ERs. Generate at your-org.aha.io → Settings → API."
          />
        </IntegrationCard>

        <IntegrationCard icon="📊" title="GINI Deck" color="#0ea5e9">
          <TextField
            label="Form URL"
            value={giniDeckFormUrl}
            onChange={setGiniDeckFormUrl}
            placeholder="https://…"
            hint="Opened from each NPI project's Create GINI Deck action, with the project name pre-filled."
          />
        </IntegrationCard>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
          <button type="submit">Save settings</button>
          {saved && (
            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--status-good)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--status-good)", display: "inline-block" }} />
              Saved
            </span>
          )}
        </div>
      </form>

      <div style={{
        marginTop: "20px", padding: "12px 16px",
        background: "color-mix(in srgb, var(--accent) 6%, var(--surface-1))",
        border: "1px solid color-mix(in srgb, var(--accent) 20%, var(--border))",
        borderRadius: "6px",
        fontSize: "12.5px", color: "var(--text-muted)", lineHeight: 1.5,
      }}>
        This demo stores tokens locally and views are backed by sample data — integrations will read from these settings once they're switched on.
      </div>
    </>
  );
}
