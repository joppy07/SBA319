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

// Get Book by ID
app.get("/api/books/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const data = await Books.findById(bookId);
  
      if (!data) {
        throw new Error("An error occured while fetching books.");
      }
  
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occured while fetching book..." });
    }
  });
  
  // Create A Book
  app.post("/api/books", async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const data = await Books.create({ title, description });
  
      if (!data) {
        throw new Error("An error occured while creating a book.");
      }
  
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occured while creating a book..." });
    }
  });
  
  // Update A Book
  app.put("/api/books/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const { title, description } = req.body;
  
      const data = await Books.findByIdAndUpdate(bookId, { title, description });
  
      if (!data) {
        throw new Error("An error occured while updating a book.");
      }
  
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occured while updating a book..." });
    }
  });
  
  // Delete A Book by ID
  app.delete("/api/books/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const data = await Books.findByIdAndDelete(bookId);
  
      if (!data) {
        throw new Error("An error occured while deleting a book.");
      }
  
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occured while deleting a book..." });
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
  