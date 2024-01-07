// require("dotenv").config();
import { config } from "dotenv";
config({ path: "../.env" });
import express from "express"; // REFACTORED because of ` 'type':'module' `
import connectDB from "./db/connect.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
