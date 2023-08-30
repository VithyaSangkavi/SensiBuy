import express from "express";

const router = express.Router();

import {
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

//get all products
//GET /api/products
router.get("/", getAllProducts);

//get a product by the id
//GET /api/products/:id
router.get("/:id", getProductById);

export default router;
