import express from "express";

import watchRoutes from "./routes/watch.route.js";
import authRoutes from "./routes/auth.route.js"

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Watch Management API Running");
});



app.use("/api/products", watchRoutes)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});