let Blog = require("../model/blog.model")
let User = require("../model/user.model")



let getAllBlogs = async (req, res) => {
    let {page} = req.query;
    let numOfItems = 5 ;
    let skippedItems = (page - 1) * numOfItems ;
    let allBlogs = await Blog.find({}).limit(numOfItems).skip(skippedItems)
    res.status(200).json({message: "success", allBlogs})
}

let getBlogsByTitle = async (req,res) =>{
    const blogtitle = req.params.title
    let blog = await Blog.find({title: blogtitle})
    if(blog){
        res.status(200).json({message: "success", blog})
    } 
    else {
        res.status(404).json({message: "not found"})
    }
}

let addNewBlog = async (req, res) => {
    const blog = await new Blog(req.body);
    await blog.save();
    await User.findByIdAndUpdate({_id: req.params.userId}, { $push: {userBlogs: blog._id}})
    res.status(200).json({message: "success", blog})

}

let updateBlog = async (req, res) =>{
    const targetblog = req.body.blogId;
    let { title ,content } = req.body;
    await Blog.findByIdAndUpdate({_id: targetblog}, {title, content})
    res.status(200).json({message: "success", user})
}

let deleteBlog = async (req,res) => {   
    const targetblogId = req.params.blogId
    const targetuserId = req.params.userId

    await Blog.findByIdAndDelete({_id: targetblogId})
    await User.findByIdAndUpdate({_id: targetuserId}, {$pull: {userBlogs: targetblogId}})
    res.status(201).json({message: "success"})
}


module.exports = {
    getAllBlogs,
    addNewBlog,
    updateBlog,
    deleteBlog,
    getBlogsByTitle
}