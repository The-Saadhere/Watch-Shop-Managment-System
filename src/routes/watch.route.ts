import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
dotenv.config();
const router = Router();
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

router.get("/", async (req, res)=>{
  try {
    const watches = await prisma.products.findMany();
    if(watches.length === 0){
      res.status(404).json({ message: "No watches found" });
    }
    res.json(watches);
  } catch (error) {
    console.error("Error fetching watches:", error);
    res.status(500).json({ error: "Failed to fetch watches" });
  }
})

export default router;