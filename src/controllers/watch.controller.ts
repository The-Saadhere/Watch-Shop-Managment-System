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

export const addProducts = async (req: Request, res: Response) => {

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
}