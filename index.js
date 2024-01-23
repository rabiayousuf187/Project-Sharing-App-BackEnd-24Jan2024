const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
console.log("Server Started on port", port);
let connectToDatabase = require("./connectDb")

// config dotenv
dotenv.config();
app.use(express.json())
app.use(cors())

let users = require("./src/routes/users");
let atten = require("./src/routes/atten")

app.use("/users", users);
app.use("/attendance", atten);

mongoose.set("strictQuery", false);
connectToDatabase();

app.get('/', (req, res) => {
    res.send("Hello World....");
});


app.listen(port , ()=>{
    console.log("Server Started on port", port)
 })