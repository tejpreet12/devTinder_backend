const express = require("express");
const profileRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateEditPassword,
} = require("../utils/validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", authUser, async (req, res) => {
  res.send(`${req.user}`);
  // res.send("CONNECTED")

  // cookie approach
  // const cookie = req.cookies;
  // const { token } = cookie;
  // const verifyUser = jwt.verify(token, "Tejpreet@0429");

  // console.log(verifyUser._id, "USERs");
  // if (verifyUser) {
  //   try {
  //     const user = await User.findById({ _id: verifyUser._id });
  //     console.log(user);
  //     res.send(user);
  //   } catch (err) {
  //     console.log(err.message, "BIG ERROR");
  //   }
  // } else {
  //   throw new Error("Invaild JWT Token");
  // }
});

profileRouter.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) throw new Error("Invaild edit request");
    console.log("VALIDATED");

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(`ERR : " ${err.message}`);
  }
});

profileRouter.patch("/profile/updatepassword", authUser, async (req, res) => {
  try {
    
    await validateEditPassword(req);

    const currentUser = req.user;
    const passwordHash = await bcrypt.hash(req.body?.updatedPassword, 10);
    currentUser.password = passwordHash;
    
    await currentUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

module.exports = { profileRouter };
