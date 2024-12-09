const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});


