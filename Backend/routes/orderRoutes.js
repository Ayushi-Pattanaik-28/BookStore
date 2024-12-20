const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const 
        }
    }
})

module.exports = router;