// const express = require("express"); //for normal js
import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

// console.log(process.env.MONGO_URI);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// middleware
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server is running on Port: ", PORT);
});
