import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide book title..."],
    },
    author: {
      type: String,
      required: [true, "Please provide author name..."],
    },
    publishYear: {
      type: Number,
      required: [true, "Please provide publish year number..."],
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", booksSchema);
