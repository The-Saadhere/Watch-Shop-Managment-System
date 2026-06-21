import { Router, Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
dotenv.config();
const router = Router();


export const getWatches = async (req: Request, res: Response) => {
  try {
    const watches = await prisma.products.findMany();
    if (watches.length === 0) {
      return res.status(404).json({ message: "No watches found" });
    }
    return res.json(watches);
  } catch (error) {
    console.error("Error fetching watches:", error);
    return res.status(500).json({ error: "Failed to fetch watches" });
  }
}