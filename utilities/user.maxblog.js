let User = require("../modules/user/user.model")

exports.maxBlogs = async(req,res,next)=>{
  id = req.session.user._id
  console.log(id)
  let user = await User.findById(id);
  let userRole = user.role;
  let blogsLength = user.userBlogs.length
  if(userRole !== "user") {next()}
  if(blogsLength < 5){next()}
  else{
  return res.status(401).json({message: "you have reached maximum blogs number."})
  }
}