const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken} = require("./userAuth");


//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.body; // Get book ID from request body
        const { id } = req.headers; // User ID from headers

        const userData = await User.findById(id);
        const isBookinCart = userData.cart.some((cartBookId) => cartBookId.toString() === bookId);

        if (isBookinCart) {
            return res.status(200).json({ message: "Book is already in cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
        return res.status(200).json({ message: "Book added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


//remove book from cart
router.put("/remove-from-cart", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid }, });
        return res.status(200).json({ message: "Book removed from cart" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get  user cart
router.get("/get-user-cart", authenticateToken, async (req,res) => {
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({ status: "Success", data:cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;