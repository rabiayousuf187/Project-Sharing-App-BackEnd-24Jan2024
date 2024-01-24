const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    devName: {
        type: String,
        required: true,
    },
    role: "String",
    userId: {
        // to Access User ID for BLog
        type : mongoose.Schema.Types.ObjectId,
        // ref: refer. of which Obj
        ref: "User",
        required : true
    },
// for created at and updated at
} , {timestamps : true});


module.exports = projectInfo = mongoose.model("Projects", ProjectSchema);