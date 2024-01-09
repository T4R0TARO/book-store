// require("dotenv").config();
import { config } from "dotenv";
config({ path: "../.env" });
import express from "express"; // REFACTORED because of ` 'type':'module' `
import connectDB from "./db/connect.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// parse JSON files
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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
