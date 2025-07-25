// routes/favouriteRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add a book to favourites
router.put("/add-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favourites.includes(bookid)) {
      return res.status(200).json({ message: "Book already in favourites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    console.error("Add to favourites error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Remove a book from favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    console.error("Remove from favourites error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get favourite books
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favourites");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ data: user.favourites });
  } catch (error) {
    console.error("Get favourites error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
