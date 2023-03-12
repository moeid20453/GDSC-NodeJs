let User = require("../modules/user/user.model")
let bcrypt = require("bcrypt");
let {  generateToken } = require("../utilities/token.util")
let { sendMail } = require("../utilities/emailer.util");
const jwt = require("jsonwebtoken");
const day = 3600000 *24

let getAllUsers = async (req, res) => {
    let {page} = req.query;
    let numOfItems = 5 ;
    let skippedItems = (page - 1) * numOfItems ;
    let allUsers = await User.find({}).limit(numOfItems).skip(skippedItems)
    res.status(200).json({message: "success", allUsers , code: 200})
   
}
let getDataID = async (req, res) =>{
    let userid = req.params.id;
    let user = await User.findById({_id: userid}).select("-password");
    res.status(200).json({message: "success", user})

}
let getUserBlogs =  async (req, res) =>{
    let userid = req.params.id;
    let user = await User.findById({_id: userid}).select("userBlogs").populate("userBlogs")
    res.status(200).json({message: "success", user , code: 200})
}
let updateUser = async (req, res) =>{
    let userid = req.params.id;
    let {firstName, lastName, email, password} = req.body
    let user = await User.findByIdAndUpdate({_id: userid}, {firstName, lastName, email, password})
    res.status(200).json({message: "successfully Updated :D new data is ", user})
}
let Register = async (req, res) => {
  const user = new User(req.body);
  let userActivationToken = await generateToken(user.id)
  await user.save();
  let activationLink = `http://localhost:3000/activateUser/${userActivationToken}`
  let receiver = req.body.email
  let subject = "Email Activation :D"
  let text = "You have created, Please click this link to activate your account"
  let html = `<a> ${activationLink} </a>`
  await sendMail( receiver, subject, text, html );
  res.status(200).json({message: "success"})
}
let activateUser = async (req,res) =>{
  let token = req.params.token;
  jwt.verify(token , process.env.TOKEN_SECRET,async function(err,decoded){
    if(err){
      res.status(400).json({message : "Incorrect Token"});
    }else{
      await User.findByIdAndUpdate(decoded, {isActive: true})
      res.status(200).json({message: "successfully Activated your Account", code: 200})
    }
  });
}
let Login = async (req, res) =>{
    const {email, password} = req.body;
    let user = await User.findOne({email});
    if (user){
      var match = await bcrypt.compare(password, user.password)
    } 
    if(user.isActive == false) return res.status(403).json({message: "check your email for activation link"})
    if(match){
        req.session.cookie.expires = new Date(Date.now() + day);
        req.session.cookie.maxAge = day
        req.session.user = user;
        await req.session.save();
        const token = await  generateToken({user})
        res.status(200).json({message: "success", token, code: 200 })
    }else{
        res.status(400).json({message: "Incorrect password"})
    }
}
let generateRecoveryCode = async (req, res) =>{
  let randomRecoveryCode = Math.random() * 100000;
  req.session.randomRecoveryCode = randomRecoveryCode
  await req.session.save()
  let receiver = req.body.email
  let subject = "Reset Your Password."
  let text = "here is your Recovery Code."
  let html = `<h1> ${randomRecoveryCode} </h1>`
  await sendMail( receiver, subject, text, html );
  res.status(200).json({message: "success"})
}
let checkRecoveryCode = async (req, res) =>{
  recoveryCode = req.params.code
  if(recoveryCode == req.session.randomRecoveryCode) res.status(200).json({message : "Success"})
  else return res.status(400).json({message: "Incorrect Code!"})
}
let deleteUser = async (req,res) => {   
    let userid = req.params.id;
    await User.findByIdAndDelete({_id: userid})
    res.status(201).json({message: "success"})
}

module.exports = {
    Register,
    getAllUsers,
    getUserBlogs,
    deleteUser,
    getDataID,
    updateUser,
    Login,
    activateUser,
    generateRecoveryCode,
    checkRecoveryCode
}