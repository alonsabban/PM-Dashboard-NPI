import { useState } from "react";
import PMatchmakerPanel from "./PMatchmakerPanel.jsx";

export default function PMatchmakerDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="pmatchmaker-launcher"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        pMatchmaker
      </button>

      <div className={"drawer-backdrop" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-header">
          <span>pMatchmaker (existing app)</span>
          <button type="button" className="secondary" onClick={() => setOpen(false)} aria-label="Collapse pMatchmaker">
            ✕
          </button>
        </div>
        <div className="drawer-body">
          <PMatchmakerPanel />
        </div>
      </aside>
    </>
  );
}
