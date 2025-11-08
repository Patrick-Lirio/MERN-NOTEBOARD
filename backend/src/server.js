// const express = require("express"); //for normal js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

// console.log(process.env.MONGO_URI);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
// if it is running in the development run this code
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5174",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// simple custom middleware
// app.use(({ req, res, next }) => {
//   console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//   next();
// });

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// if it is running in the production run this code
if (process.env.NODE_ENV === "production") {
  // to connect the backend to the frontend and make a single domain. basically backend URL will be the main URL
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // any route other than api/notes it will return
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on Port: ", PORT);
  });
});
