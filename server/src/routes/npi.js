import { Router } from "express";
import { listNpiTasks, updateTask } from "../adapters/asana/index.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await listNpiTasks());
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
