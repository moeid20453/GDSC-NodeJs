const rbac = require("../helpers/rbac");

module.exports = (endPoint) => {
  return async (req, res, next) =>{
    const isAllowed  = await rbac.can(req.session.user.role, endPoint)
    isAllowed ? next() : res   .status(401).json({message: "unAuthorized"})
  }
}