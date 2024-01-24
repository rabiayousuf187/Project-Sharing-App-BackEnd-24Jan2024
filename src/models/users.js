const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: String,
},
 {timestamps : true});
module.exports = userInfo = mongoose.model("Users", userInfoSchema);