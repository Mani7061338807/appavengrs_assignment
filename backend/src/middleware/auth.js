const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
 
  console.log(req.headers);
  if (!token) {
    return res.status(401).send("Access token is missing or invalid");
  }

  // const token = authHeader.split(" ")[1];
  console.log('recieved token is',token, process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

const isAuthenticated = (req,res,next) => {
  if(req.isAuthenticated()){
    const {googleId} = req.user;
    return googleId;
  }
  next();
}

module.exports = verifyToken;
