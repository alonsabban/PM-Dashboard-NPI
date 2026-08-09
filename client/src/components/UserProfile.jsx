import { useState, useRef, useEffect } from "react";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const githubUser = localStorage.getItem("user_config_github_user") || "My Profile";

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", marginTop: "10px", borderTop: "1px dashed var(--gridline)", paddingTop: "10px" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="nav-link-button nav-link"
        style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700, color: "#fff",
        }}>
          {githubUser.charAt(0).toUpperCase()}
        </div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {githubUser}
          </div>
          <div style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>My Profile</div>
        </div>
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0, right: 0,
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          zIndex: 200,
          overflow: "hidden",
          minWidth: "200px",
          padding: "14px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #1a6fc4, #0d4a8a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 700, color: "#fff",
            }}>
              {githubUser.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{githubUser}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Program Manager</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--gridline)", paddingTop: "10px", fontSize: "12px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "5px" }}>
            {localStorage.getItem("user_config_aha") && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Aha!</span>
                <span style={{ color: "var(--status-good)", fontWeight: 600 }}>Connected</span>
              </div>
            )}
            {localStorage.getItem("user_config_pat") && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>GitHub NG</span>
                <span style={{ color: "var(--status-good)", fontWeight: 600 }}>Connected</span>
              </div>
            )}
            {!localStorage.getItem("user_config_aha") && !localStorage.getItem("user_config_pat") && (
              <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>No integrations configured. Go to Settings.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
