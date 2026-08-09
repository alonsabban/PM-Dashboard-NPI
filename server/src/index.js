import express from "express";
import cors from "cors";
import { join } from "path";
import npiRouter from "./routes/npi.js";
import backlogsRouter from "./routes/backlogs.js";
import ersRouter from "./routes/ers.js";
import pmatchmakerRouter from "./routes/pmatchmaker.js";
import settingsRouter from "./routes/settings.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/npi", npiRouter);
app.use("/api/backlogs", backlogsRouter);
app.use("/api/ers", ersRouter);
app.use("/api/pmatchmaker", pmatchmakerRouter);
app.use("/api/settings", settingsRouter);

if (process.env.NODE_ENV === "production") {
  const clientDist = join(process.cwd(), "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => res.sendFile(join(clientDist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`PM Dashboard server listening on http://localhost:${PORT}`);
});
