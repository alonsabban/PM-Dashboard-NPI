import { Router } from "express";
import { search } from "../adapters/pmatchmaker/mock.js";

const router = Router();

router.get("/search", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  res.json(await search(q));
});

export default router;
