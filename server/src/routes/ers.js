import { Router } from "express";
import { listPrioritizedErs } from "../adapters/ers/index.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await listPrioritizedErs());
});

export default router;
