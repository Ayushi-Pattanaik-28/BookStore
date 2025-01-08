const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();

require("dotenv").config();
require("./conn/conn");
const User = require("./routes/userRoutes");
const Books = require("./routes/bookRoutes");
const Favourites = require("./routes/favouritesRoutes");
const Cart = require("./routes/cartRoutes");

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

//routes
app.use("/api", User);
app.use("/api", Books);
app.use("/api", Favourites);
app.use("/api", Cart);

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});
