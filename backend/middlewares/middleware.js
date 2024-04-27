require("dotenv").config();

const jwt = require("jsonwebtoken");

const SecretKey = process.env.SECRET_KEY;

//creating JWT token
const createToken = (user) => {
  const payload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, SecretKey, { expiresIn: "1h" });
};

//middleware for knowing whether user is authenticated or not
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  //checking if token is provided or not
  if (!token) {
    return res.status(401).json({ message: "No token Provided" });
  }

  // Extracting token from the header
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }
  const authToken = tokenParts[1];
  //console.log(authToken);
  //verifying token
  jwt.verify(authToken, SecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded.userID;
    req.role = decoded.role;
    // console.log(req.user);
    // console.log(decoded.role);
    // console.log("completed");
    next();
  });
};

//middleware for authorization of routes based on roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.role === role) {
      next();
    }
    //console.log(req.role);
    else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};

module.exports = {
  createToken,
  verifyToken,
  authorizeRole,
};
