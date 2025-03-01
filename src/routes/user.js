const express = require("express");
const { authUser } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("user/requests/received", authUser, async (req, res) => {
    
  const areRequestsThere = await ConnectionRequest.find({
    status:"interested",
    toUserId: user._id
  });
});
