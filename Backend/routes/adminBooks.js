const express = require("express");
const router = express.Router();
const Book = require("../models/Book"); // Assuming you have a Book model
const verifyToken = require("../middleware/auth");

// ✅ Add a book
router.post("/add-book-admin", verifyToken, async (req, res) => {
  try {
    const { url, title, author, price, description, language } = req.body;

    const newBook = new Book({ url, title, author, price, description, language });
    await newBook.save();

    res.status(201).json({ status: "Success", message: "Book added successfully!", data: newBook });
  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({ status: "Error", message: "Failed to add book." });
  }
});

// ✏️ Edit a book
router.put("/update-book", verifyToken, async (req, res) => {
  const bookId = req.headers.bookid;

  try {
    const updated = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.json({ status: "Success", message: "Book updated successfully!", data: updated });
  } catch (error) {
    console.error("Edit Book Error:", error);
    res.status(500).json({ message: "Failed to update book" });
  }
});

// ❌ Delete a book
router.delete("/delete-book/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.json({ status: "Success", message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

// 📘 Get book by ID (for Edit page)
router.get("/get-book-by-id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ status: "Success", data: book });
  } catch (error) {
    console.error("Get Book Error:", error);
    res.status(500).json({ message: "Error retrieving book" });
  }
});

module.exports = router;
