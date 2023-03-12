const app = require("express").Router();
let userController = require("../controller/user.Controller")
let {addUserValidation,updateUserValidation} = require('../validation/user.validation')
let validator = require('../helpers/common.validate')
let { checkSession } = require('../utilities/checkAuth.util')
let { verifyToken } = require("../utilities/token.util")
let endPoints = require("../helpers/endPoints")
let checkRole = require("../utilities/checkRole")

app.post("/Register",validator(addUserValidation), userController.Register);
app.get("/activateUser/:token", userController.activateUser);



app.get("/GetAllUsers",[checkSession, checkRole(endPoints.GET_ALL_USERS)],verifyToken, userController.getAllUsers);
app.get("/getUserData/:id", checkSession, userController.getDataID);
app.get("/getUserBlogs/:id", userController.getUserBlogs);
app.post("/updateUser/:id",validator(updateUserValidation), userController.updateUser);



app.post("/generateRecoveryCode", userController.generateRecoveryCode)
app.get("/checkRecoveryCode/:code", userController.checkRecoveryCode);


app.post("/Login", userController.Login);


app.delete("/data/:id",[checkSession, checkRole(endPoints.DELETE_USER)], userController.deleteUser);

module.exports = app