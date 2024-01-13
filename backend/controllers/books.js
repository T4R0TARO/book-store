import { Book } from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

// Routes
// Create Book
const createBook = async (request, response) => {
  const newBook = {
    title: request.body.title,
    author: request.body.author,
    publishYear: request.body.publishYear,
  };
  const book = await Book.create(newBook);
  return response.status(StatusCodes.CREATED).send(book);
};
// Find Book By Id
const getBook = async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
// Get All Books
const getAllBooks = async (request, response) => {
  const books = await Book.find({});
  return response
    .status(StatusCodes.OK)
    .json({ count: books.length, data: books });
};
// Update Book by Id
const updateBook = async (request, response) => {
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
};
// Delete Book by Id
const deleteBook = async (request, response) => {
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
};

export { createBook, getBook, getAllBooks, updateBook, deleteBook };
