import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import npiRouter from "./routes/npi.js";
import backlogsRouter from "./routes/backlogs.js";
import ersRouter from "./routes/ers.js";
import pmatchmakerRouter from "./routes/pmatchmaker.js";
import settingsRouter from "./routes/settings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/demo", express.static(join(__dirname, "../../../NPI/NPI starter/demo")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/npi", npiRouter);
app.use("/api/backlogs", backlogsRouter);
app.use("/api/ers", ersRouter);
app.use("/api/pmatchmaker", pmatchmakerRouter);
app.use("/api/settings", settingsRouter);

app.listen(PORT, () => {
  console.log(`PM Dashboard server listening on http://localhost:${PORT}`);
});
