const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");
const User = require("./routes/userRoutes");
const Books = require("./routes/bookRoutes");
const Favourites = require("./routes/favouritesRoutes");

app.use(express.json());

//routes
app.use("/api", User);
app.use("/api", Books);
app.use("/api", Favourites);

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});


