const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// ✅ Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.body;           // ✅ bookId comes from request body
        const { id } = req.headers;            // ✅ user ID from headers

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isAlreadyFavourite = user.favourites.some(
            (favBookId) => favBookId.toString() === bookId
        );

        if (isAlreadyFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.error("Error adding to favourites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Remove book from favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; // bookid and id sent in headers

        await User.findByIdAndUpdate(id, {
            $pull: { favourites: bookid },
        });

        return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        console.error("Error removing from favourites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get user's favourite books
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const user = await User.findById(id).populate("favourites");
        if (!user) return res.status(404).json({ message: "User not found" });

        const favourites = user.favourites.reverse();
        return res.json({ status: "Success", data: favourites });
    } catch (error) {
        console.error("Error getting favourites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
