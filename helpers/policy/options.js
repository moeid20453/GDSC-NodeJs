const roles = require("../roles");
const superAdminPolicy = require("./superAdmin.policy")
const adminPolicy = require("./admin.policy")
const premiumUserPolicy = require("./premiumUser.policy")
const userPolicy =require("./user.policy")

const opts = {
  [roles.SUPER_ADMIN ] : {can : superAdminPolicy},
  [roles.ADMIN]: {can : adminPolicy},
  [roles.PREMIUM_USER] : {can : premiumUserPolicy},
  [roles.USER] : {can : userPolicy}
}

module.exports = opts;