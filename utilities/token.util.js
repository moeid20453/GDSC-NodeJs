const jwt = require("jsonwebtoken");

exports.generateToken = async (payload) => {
  return  jwt.sign(payload , process.env.TOKEN_SECRET, { algorithm: 'HS256' });
}

exports.verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  
  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET , function(err, decoded) {
      if(err) res.status(403).json({message: "forbidden"});
      next();
    });

  }else res.status(401).json({message: "unauthorized"})
}