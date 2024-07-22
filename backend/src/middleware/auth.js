const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authheader",authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SERECT || "majdjsajdh");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const isAuthenticated = (req,res,next) => {
  if(req.isAuthenticated()){
    const {googleId} = req.user;
    return googleId;
  }
  next();
}

module.exports = isAuthenticated;
