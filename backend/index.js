import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Server Started");
  connectDatabase();
});

app.get("/", (req, res) => {
  res.json("Server Started");
});
