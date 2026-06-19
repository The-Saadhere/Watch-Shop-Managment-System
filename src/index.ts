import express from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import watchRoutes from "./routes/watch.route.js";

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

app.use("/api/watches", watchRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});