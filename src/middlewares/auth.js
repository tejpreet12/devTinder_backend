const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = "xyz";
  const validToken = token === "xyz";

  if (!validToken) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

const userMiddleware = (req, res, next) => {
  const token = "xfyz";
  const validToken = token === "xyz";

  if (!validToken) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

const authUser = async (req, res, next) => {
  try {
    // const { token } = req.headers;
    //using cookies token approach for this project 
    const { token } = req.cookies;

    if (!token) {
      throw new Error("No Token Present");
    }

    const decryptedToken = jwt.verify(token, "Tejpreet@0429");
    console.log(decryptedToken);

    if (!decryptedToken) {
      res.status(400).send("Invaild User");
    }

    const user = await User.findById(decryptedToken._id);

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  authMiddleware,
  userMiddleware,
  authUser,
};
