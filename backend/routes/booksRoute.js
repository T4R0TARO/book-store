import express from "express";
const router = express.Router();

import {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getBook).delete(deleteBook).put(updateBook);

export default router;
