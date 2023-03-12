let app = require("express").Router();


let userRoutes = require("./user/user.routers");
let blogRoutes = require("./blog/blogs.Router");

app.use(userRoutes);
app.use(blogRoutes); 


module.exports = app;