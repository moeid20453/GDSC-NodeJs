let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let saltrounds = 5;

let userSchema = mongoose.Schema({
    firstName:String,
    lastName: String,
    userName: String,
    email: String,
    password:String,
    age: Number,
    isActive: {
        type: Boolean , 
        default: false },
    favTeams: [String],
    userBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    }],
    role: {
      type :String,
      enum: ["superAdmin","admin","user","premiumUser"],
      default: "user"
    }
})

userSchema.methods.display = ()=> {
    console.log("I am a user");
}

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, saltrounds)
    next();  
})

userSchema.post("save", async function(){
    console.log(this._id);
})


let userModel = mongoose.model("users", userSchema)

module.exports = userModel;