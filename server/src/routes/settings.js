import { Router } from "express";
import { getMaskedSettings, saveSettings } from "../config/settings-store.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(getMaskedSettings());
});

router.post("/", (req, res) => {
  const { asanaToken, ahaToken, giniDeckFormUrl } = req.body ?? {};
  const update = {};
  if (typeof asanaToken === "string" && asanaToken.length > 0) update.asanaToken = asanaToken;
  if (typeof ahaToken === "string" && ahaToken.length > 0) update.ahaToken = ahaToken;
  if (typeof giniDeckFormUrl === "string") update.giniDeckFormUrl = giniDeckFormUrl;
  saveSettings(update);
  res.json(getMaskedSettings());
});

export default router;
