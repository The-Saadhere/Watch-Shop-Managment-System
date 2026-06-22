import { Router } from "express";
import { addProducts, getWatches, getWatchById } from "../controllers/watch.controller.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", getWatches);

router.post("/add", addProducts);

router.get("/:id", getWatchById);
export default router;