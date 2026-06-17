import express from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;

dotenv.config();
app.use(express.json());
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});
app.get("/", (req, res) => {
  res.send("Watch Management API Running");
});

app.post("/api/watches", async (req, res)=>{

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

app.get("/api/watches", async (req, res)=>{
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});