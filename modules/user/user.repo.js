let User = require("./user.model")



exports.isExist = async (filter) =>{
  const user = await User.findOne(filter)
  if (user) {
    return{
      success: true,
      record: user,
      code: 200
    };
  }
  else {
    return{
      success: false,
      code: 404,
      error: "User Not Found"
    }
  }
}

exports.list = async (filter) =>{
  let records = await User.find(filter).select("-password");
  return{
    success: true,
    records: records,
    code: 200
  };
}

exports.get = async (id) =>{
    if (filter) {
      record = await User.find({_id: id}).select("-password")
      return {
        success: true,
        record,
        code: 200
      };
    }
    else{
      return{
         success: false,
         code: 404,
         error: "User Not Found"
      }
    }
}
exports.create = async (form) =>{
  let user = await this.isExist({email: form.email});
  if (!user.success){
    const newUser= new User(form)
    await newUser.save();
    return{
      success: true,
      record: newUser,
      code:201
    };
  }
  else{
    return{
      success: false,
      code: 404,
      error: "User already exists"
    }
  }
}