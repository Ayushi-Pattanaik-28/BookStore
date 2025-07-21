const express = require("express");
const cors = require("cors");
const app = express();

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
require("./conn/conn");

// Import route files
const User = require("./routes/userRoutes");
const Books = require("./routes/bookRoutes");
const Favourites = require("./routes/favouritesRoutes");
const Cart = require("./routes/cartRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting
app.use("/api", User);
app.use("/api", Books);
app.use("/api", Favourites);
app.use("/api", Cart);

// ✅ ADD THIS: Start server using PORT from .env
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
