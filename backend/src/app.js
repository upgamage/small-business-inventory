import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Small Business Inventory API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API is healthy",
  });
});

app.use("/api/products", productRoutes);

export default app;