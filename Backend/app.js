const express = require("express");
const app = express();

//get
app.get("/", (req,res) => {
    res.send("Hello");
})

//creating Port
app.listen(1000, () => {
    console.log("Server Started");
});