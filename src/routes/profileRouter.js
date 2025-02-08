const express = require("express");
const profileRouter = express.Router();
const {authUser} = require("../middlewares/auth");

profileRouter.get("/profile", authUser ,async (req, res) => {

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

module.exports = { profileRouter };
