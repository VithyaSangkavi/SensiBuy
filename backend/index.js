import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import productRoutes from "./routes/ProductRoutes.js";
import userRoutes from './routes/User.route.js';
import ticketRoutes from './routes/tickets.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Server Started Running on Port", PORT);
  connectDatabase();
});

app.get("/", (req, res) => {
  res.json("Server Started");
});
