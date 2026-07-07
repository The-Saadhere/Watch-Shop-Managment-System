import { Router } from "express";
import { addProducts, getWatches, getWatchById, likeProduct } from "../controllers/watch.controller.js";

const router = Router();

router.get("/", getWatches);
router.post("/add", addProducts);
router.post("/:id/like", likeProduct);
router.get("/:id", getWatchById);

export default router;