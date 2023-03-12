const app = require("express").Router()
let { checkSession } = require('../../utilities/checkAuth.util')
let blogController = require("../../controller/blogs.controller")
let endPoints = require("../../helpers/endPoints")
let checkRole = require("../../utilities/checkRole")
let { maxBlogs } = require("../../utilities/user.maxblog")

app.get("/getAllBlogs",[checkSession, checkRole(endPoints.GET_ALL_BLOGS)],blogController.getAllBlogs)
app.get("/getBlogsByTitle/:title",blogController.getBlogsByTitle)
app.post("/addNewBlog/:userId", maxBlogs,  blogController.addNewBlog)
app.post("/UpdateBlog",blogController.updateBlog)
app.delete("/deleteBlog/:userId/:blogId",[checkSession, checkRole(endPoints.DELETE_BLOG)],blogController.deleteBlog)

module.exports = app
