const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const  {validateSignUpData} = require("../utils/validator")

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log(isPasswordValid, "IS PASSWORD VALID");

    if (isPasswordValid) {
      // create jwt token
      // we have use user b/c user is also an instance of the User Model and we need _id of this user only
      const token = await user.getJWT();

      // add jwt token into the cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(`${token} Logged In Successfully `);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSignUpData(req);

    //Encrypt the password
    const { firstName, lastName, password, emailId } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("password hash", passwordHash);

    //Creating new instance of user model
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    console.log("User Created Successfully");
    // res.send("User Created Successfully");
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    console.log("Unable to create User");
    res.status(400).send(err.message + " Unable to create User");
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("User Logged Out Successfully");
});

module.exports = { authRouter };
