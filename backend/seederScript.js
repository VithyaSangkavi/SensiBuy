import dotenv from "dotenv";
import productsData from "./data/products.js"; // Assuming productsData is exported in ES6 format
import connectDB from "./configs/database.js"; // Assuming connectDB is exported in ES6 format
import Product from "./models/Product.js"; // Assuming Product is exported in ES6 format

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productsData);
    console.log("Data import success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
