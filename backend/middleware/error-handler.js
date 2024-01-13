// import CustomAPIError from "../errors/custom-api.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  // ! DO NOT USE
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later...",
  };

  // Missing Value Error
  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  // TODO: Duplicate Item Error
  // TODO: No Item with ID found Error (Invalid ID format)
  if (err.name === "CastError") {
    customError.msg = `No book with id: ${err.value}`;
    customError.statusCode = 404;
  }

  // ? For TESTING
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
