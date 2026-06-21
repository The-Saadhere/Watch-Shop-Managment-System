import express from "express";

import watchRoutes from "./routes/watch.route.js";

const app = express();
const PORT = 5000;


app.get("/", (req, res) => {
  res.send("Watch Management API Running");
});



app.use("/api/watches", watchRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});