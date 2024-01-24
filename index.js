const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
console.log("Server Started on port", port);
let connectToDatabase = require("./connectDb")

const multer = require('multer');


// config dotenv
dotenv.config();
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(cors())



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         console.log("file name === ", req.file)
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

// router.post('/upload', upload.single('profileImg'), (req, res)=>{
//     console.log("File == ", req.file)
// })

// Serve uploaded images statically
// app.use('/uploads', express.static('uploads'));



let users = require("./src/routes/users");
let projects = require("./src/routes/projects")

app.use("/users",users);
app.use("/projects", projects);



mongoose.set("strictQuery", false);
connectToDatabase();

app.get('/', (req, res) => {
    res.send("Hello World....");
});


app.listen(port , ()=>{
    console.log("Server Started on port", port)
 })