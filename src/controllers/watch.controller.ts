import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";

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
    if(!name || !modelNumber || !purchasePrice || !sellingPrice || !stock) {
      return res.status(400).json({ error: "All fields are required" });
    }
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

export const getWatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const watch = await prisma.products.findUnique({
      where: { id: parseInt(id) }
    });
    if (!watch) {
      return res.status(404).json({ message: "Watch not found" });
    }
    return res.json(watch);
  } catch (error) {
    console.error("Error fetching watch:", error);
    return res.status(500).json({ error: "Failed to fetch watch" });
  }
};

export const likeProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);

    if (Number.isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return res.status(200).json({
      message: "Product liked successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error liking product:", error);
    return res.status(500).json({ error: "Failed to like product" });
  }
};