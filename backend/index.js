// require("dotenv").config();
import { config } from "dotenv";
config({ path: "../.env" });
import express from "express"; // REFACTORED because of ` 'type':'module' `
import connectDB from "./db/connect.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
// parse JSON files
app.use(express.json());

app.get("/", (request, response) => {
  // console.log(request);
  return response.status(200).send("Wah Wah Wah");
});

app.use("/books", booksRoute);

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
