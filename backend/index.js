import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log("Server Started");
    connectDatabase();
})

app.get("/", (req, res) => {
    res.json("Server Started")
})