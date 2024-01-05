// const express = require("express");
import express from "express";
const app = express();

// connect to DB
// routes
// error handler

app.use(express.json());

const port = 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
