import { Router } from "express";
import { addProducts, getWatches } from "../controllers/watch.controller.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", getWatches)

router.post("/add", addProducts)
export default router;