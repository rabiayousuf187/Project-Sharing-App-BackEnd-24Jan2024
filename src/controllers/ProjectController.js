const blogModel = require('../models/projects');

const createProject = async (req, res) => {

      // rxing req.userId fro Auth Middleware to Controller
    console.log("after Auth in Create Blog ==", req.userId)
    const {title , details, devName, url, userId} = req.body;

    const newProject = new blogModel({
            title: title,
            details: details,
            devName: devName,
            url: url,
            userId: userId
    });
    try {
        await newProject.save();
        console.log("New Blog Created Successfully!");
        res.status(201).json({data: newProject, message: "New Project Sumitted Successfully!"})
    } catch (error) {
        console.log("error in Blog Create === ",error);
        res.status(500).json({ message: "Something went wrong while Submitting Blog" })
    }
  
}
// localhost:5000/blogs/658547a896cd0639fba5da5f
// {
//     "title": "Second Post title",
//     "post": "updated 1 * Second Post Blog"
// }
const updateBlog = async (req, res) => {
    console.log("Blog updateBlog Route Successfully Accessed");

    const id = req.params.id;
    console.log("Update Fun, Blog Id to be updated:", id);

    const { title, post } = req.body;

    const newBlog = {
        title: title,
        post: post,
        userId: req.userId
    };

    try {
        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: id },
            newBlog,
            { new: true }
        );

        console.log("Update Blog Status === ", updatedBlog);

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log("Updated Blog Successfully");
        res.status(200).json({data: updatedBlog, message: "Updated Blog Successfully"});

    } catch (error) {
        console.log("Error in Blog Update === ", error);
        res.status(500).json({ message: "Something went wrong while updating Blog" });
    }
};


const deleteBlog = async (req, res) => {

    console.log("Blog deleteBlog Route Successfully Accessed")
    
    const id = req.params.id;
    console.log("Delete Fun, Blog Id tobe delete");

    try {
        const blog = await blogModel.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        
        console.log("Deleted Blog Successfully");
        res.status(202).json(blog)

    } catch (error) {
        console.log("error in Blog Delete === ",error);
        res.status(500).json({ message: "Something went wrong while Deleting Blog" })
    }
    
}

const getAllProjetcs = async (req, res) => {

    console.log("Blog getSpecificUserAllBlogs Route Successfully Accessed")
    try {
        // console.log("User ID --===", req.userId);
        const projects = await blogModel.find({})

        console.log("Get getSpecificUserAllBlogs All Blogs Successfully!");
        res.status(200).json({data: projects})
    } catch (error) {
        console.log("error in Getting All User Projects Get === ",error);
        res.status(500).json({ message: "Something went wrong while Getting Blog" })
    }

}

const getUserAllBlogs = async (req, res) => {

    console.log("Blog getAllBlogs Route Successfully Accessed")
    try {
        const projects = await blogModel.find({userId: req.body.userId})
        console.log("Get All Blogs by ID Successfully!");
        res.status(200).json({data: projects})
    } catch (error) {
        console.log("error in Blog Get === ",error);
        res.status(500).json({ message: "Something went wrong while Getting Blog" })
    }

}


module.exports = { createProject, getAllProjetcs, deleteBlog, getUserAllBlogs }

