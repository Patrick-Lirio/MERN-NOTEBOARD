// const express = require("express"); //for normal js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// console.log(process.env.MONGO_URI);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// simple custom middleware
// app.use(({ req, res, next }) => {
//   console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//   next();
// });

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on Port: ", PORT);
  });
});
