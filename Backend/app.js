const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");
const user = require("./routes/userRoutes");

app.use(express.json());

//routes
app.use("/api", user);

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});


