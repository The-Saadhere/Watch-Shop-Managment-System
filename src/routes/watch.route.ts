import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { getWatches } from "../controllers/watch.controller.js";
dotenv.config();
const router = Router();
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

router.get("/", getWatches)

router.post("/add", async (req, res)=>{

  try {
    const {name, modelNumber, purchasePrice,sellingPrice,stock} = req.body
    const product = await prisma.products.create({
      data: {
        name,
        modelNumber,
        purchasePrice,
        sellingPrice,
        stock
      }
    })
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating watch:", error);
    res.status(500).json({ error: "Failed to create watch" });
  }
})
export default router;