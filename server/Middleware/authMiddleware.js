const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const authUser = req.headers.authorization;

  if (!authUser) {
    return res.send({
      status: 401,
      message: "Unauthorized - No token provided",
    });
  }

  try {
    // Bearer token extract karna
    const token = authUser.startsWith("Bearer ")
      ? authUser.split(" ")[1]
      : authUser;

    // Token verify karna
    const decoded = jwt.verify(token, process.env.SECRET);

    // Decoded data ko request object mein store karna
    req.user = decoded;
    next();
  } catch (error) {
    res.send({
      status: 401,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports =  checkToken ;
