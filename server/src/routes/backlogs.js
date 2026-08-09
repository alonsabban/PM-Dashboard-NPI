import { Router } from "express";
import { listMasterFeatures, createFeature as createInAha } from "../adapters/aha/index.js";
import { listCreatedFeatures, createFeature as createInJira } from "../adapters/jira/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const [ahaFeatures, jiraFeatures] = await Promise.all([listMasterFeatures(), listCreatedFeatures()]);
  res.json([...ahaFeatures, ...jiraFeatures]);
});

router.post("/", async (req, res) => {
  const { name, product, pi, effort, destination } = req.body ?? {};
  if (!name || !product || !pi) {
    res.status(400).json({ error: "name, product, and pi are required" });
    return;
  }
  const fields = { name, product, pi, effort };
  const created = destination === "jira" ? await createInJira(fields) : await createInAha(fields);
  res.status(201).json(created);
});

export default router;
