require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Books = require("./models/Books");

connectDB();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get All Books
app.get("/api/books", async (req, res) => {
    try {
      const data = await Books.find({});
  
      if (!data) {
        throw new Error("An error occured while fetching books.");
      }
  
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occured while fetching books..." });
    }
  });



app.get("/", (req, res) => {
    res.json("SBA319");
  });
  
  app.get("*", (req, res) => {
    res.sendStatus("404");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
  