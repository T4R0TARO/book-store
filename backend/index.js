// require("dotenv").config();
import { config } from "dotenv";
config({ path: "../.env" });
import express from "express"; // REFACTORED because of ` 'type':'module' `
import connectDB from "./db/connect.js";
import { Book } from "./models/bookModel.js";

const app = express();
// parse JSON files
app.use(express.json());

app.get("/", (request, response) => {
  // console.log(request);
  return response.status(200).send("Wah Wah Wah");
});

// Routes
// Create Book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Find Book By Id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Get All Books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Update Book by Id
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found..." });
    }

    return response
      .status(200)
      .send({ message: "Book updated successfully..." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Delete Book by Id
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not found..." });
    }
    return response
      .status(200)
      .send({ message: "Book deleted successfully..." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

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
