const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user"); // Import User model

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // User ID from headers
        const { order } = req.body; // Array of order items from the request body

        if (!id || !order || !Array.isArray(order)) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const orderIds = []; // To store IDs of newly created orders

        for (const orderData of order) {
            // Save the order to the Order model
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();
            orderIds.push(orderDataFromDb._id);
        }

        // Update the user document with the new orders
        await User.findByIdAndUpdate(
            id,
            {
                $push: { order: { $each: orderIds } },
                $pull: { cart: { $in: order.map((item) => item._id) } },
            },
            { new: true }
        );

        return res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Get order history
router.get("/order-history", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers; 
        const userData = await User.findById(id).populate({
            path: 'order',
            populate: { path: "book" },
        });

        const orderData = userData.orders.reverse();
        return res.json({ status: "Success", data: orderData });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Get all orders -- admin
router.get("/get-all-orders", authenticateToken, async ( res, res) => {
    try{
        const userData = await Order.find() .populate({ path: "book"}).populate({path: "user"}).sort({ createdAt: -1 });
        return res.json({ status: "Success", data: userData });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update order status -- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try{
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({ status: "Success", message: "Order status updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
