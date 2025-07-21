const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// -----------------------------
// Place Order (User)
// -----------------------------
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id;
        const { order } = req.body;

        if (!userId || !order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        // Create new orders
        const createdOrders = await Promise.all(order.map(async (item) => {
            const newOrder = new Order({ user: userId, book: item._id });
            return await newOrder.save();
        }));

        const orderIds = createdOrders.map(order => order._id);
        const bookIds = order.map(item => item._id);

        // Update user's order list and remove books from cart
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { order: { $each: orderIds } },
                $pull: { cart: { $in: bookIds } },
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Order placed successfully",
            orders: orderIds
        });

    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// -----------------------------
// Get Order History (User)
// -----------------------------
router.get("/order-history", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers.id;

        const userData = await User.findById(userId).populate({
            path: "order",
            populate: { path: "book" }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderData = userData.order.reverse(); // Recent orders first
        return res.status(200).json({ status: "Success", data: orderData });

    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// -----------------------------
// Get All Orders (Admin)
// -----------------------------
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const allOrders = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });

        return res.status(200).json({ status: "Success", data: allOrders });

    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// -----------------------------
// Update Order Status (Admin)
// -----------------------------
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Missing status field" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            status: "Success",
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
