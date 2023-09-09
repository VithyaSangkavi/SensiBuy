import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import productRoutes from "./routes/ProductRoutes.js";
import userRoutes from './routes/User.route.js';
import uploadImage from "./uploadImage.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Server Started Running on Port", PORT);
  connectDatabase();
});

app.get("/", (req, res) => {
  res.json("Server Started");
});

//User Management
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((imageUrl) => {
      res.send(imageUrl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
