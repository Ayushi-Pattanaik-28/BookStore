const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");
const User = require("./routes/userRoutes");
const Books = require("./routes/bookRoutes")

app.use(express.json());

//routes
app.use("/api", User);
app.use("/api", Books);

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});


