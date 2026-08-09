import { useEffect, useState } from "react";
import { getJSON } from "../api/client.js";
import { IconTrendingUp } from "../components/icons.jsx";
import EditableText from "../components/EditableText.jsx";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Worst-first severity so a project's tile lights to its most urgent task.
// NPI task status is one of: On Track, At Risk, Blocked, Done.
const SEVERITY = { Blocked: 2, "At Risk": 1, "On Track": 0, Done: 0 };
const TONE_BY_SEVERITY = { 2: "critical", 1: "warning", 0: "good" };

function groupByProject(tasks) {
  const groups = new Map();
  for (const task of tasks) {
    if (!groups.has(task.project)) groups.set(task.project, []);
    groups.get(task.project).push(task);
  }
  return groups;
}

export default function Overview() {
  const [tasks, setTasks] = useState([]);
  const [ers, setErs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getJSON("/npi"), getJSON("/ers")]).then(([npiData, ersData]) => {
      setTasks(npiData);
      setErs(ersData);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="empty-state">Loading overview…</p>;

  const needsAttention = tasks.filter((t) => t.status === "At Risk" || t.status === "Blocked");
  const highPriorityErs = [...ers].sort((a, b) => b.score - a.score).slice(0, 3);
  const projectTiles = [...groupByProject(tasks).entries()].map(([project, projectTasks]) => {
    const worst = Math.max(...projectTasks.map((t) => SEVERITY[t.status] ?? 1));
    const flagged = projectTasks
      .filter((t) => t.status === "At Risk" || t.status === "Blocked")
      .sort((a, b) => SEVERITY[b.status] - SEVERITY[a.status]);
    return { project, tone: TONE_BY_SEVERITY[worst], flagged, total: projectTasks.length };
  });
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <>
      <div className="view-header">
        <h2>{getGreeting()}</h2>
        <EditableText id="overview-subtitle" defaultText={`${today} — here's the line status across your projects.`} tag="p" />
      </div>

      <div className="readout-strip">
        <div className={"readout" + (needsAttention.length === 0 ? " is-clear" : " is-alert")}>
          <span className="readout-digits">{String(needsAttention.length).padStart(2, "0")}</span>
          <span className="readout-label">
            Task{needsAttention.length === 1 ? "" : "s"}
            <br />
            <EditableText id="overview-readout-attention" defaultText="need attention" />
          </span>
        </div>
        <div className="readout">
          <span className="readout-digits">{String(projectTiles.length).padStart(2, "0")}</span>
          <span className="readout-label">
            <EditableText id="overview-readout-projects-label" defaultText="Projects" />
            <br />
            <EditableText id="overview-readout-projects-sub" defaultText="on the board" />
          </span>
        </div>
      </div>

      <div className="tile-wall">
        {projectTiles.map((tile) => (
          <div className="tile" key={tile.project} style={{ "--tile-tone": `var(--status-${tile.tone})` }}>
            <div className="tile-head">
              <span className="tile-project">{tile.project}</span>
              <span className="tile-lamp status-lamp" />
            </div>
            <div className="tile-count">
              {tile.flagged.length === 0 ? "All clear" : `${tile.flagged.length} of ${tile.total} flagged`}
            </div>
            {tile.flagged.length > 0 && (
              <ul className="tile-items">
                {tile.flagged.slice(0, 3).map((t) => (
                  <li key={t.id}>
                    <span>{t.name}</span>
                    <span>{t.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">
          <IconTrendingUp size={16} style={{ color: "var(--accent)" }} />
          <EditableText id="overview-card-title" defaultText="Top prioritized ERs" />
        </div>
        <table>
          <tbody>
            {highPriorityErs.map((er) => (
              <tr key={er.id}>
                <td className="wrap">{er.title}</td>
                <td>{er.product}</td>
                <td className="num">{er.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
