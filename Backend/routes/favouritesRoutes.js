const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite" , authenticateToken, async(req,res) => {
    try{ 
     const { bookid, id } = req.headers;
     const userData = await User.findById(id);
     const isBookFavourite = userData.favourites.includes(bookid);
     if (isBookFavourite) {
        return res.status(200).json({ message: "Book is already in favourites" });
     }
     await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
     return res.status(200).json({ message: "Book added to favourites" });
    } catch(error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Remove book from favourites
router.delete("/remove-book-from-favourite" , authenticateToken, async(req,res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (!isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }

    return res.status(200).json({ message: "Book removed from favourites" });
}catch (error) {
    return res.status(500).json({ message: "Internal server error" });
}
});

module.exports = router;