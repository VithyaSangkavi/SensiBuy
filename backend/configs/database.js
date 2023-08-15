import mongoose from "mongoose";

import dotenv from "dotenv"; // Import the dotenv package

// Load environment variables from the .env file
dotenv.config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Error connecting to the database", err);
    });
};

export default connectDatabase;
