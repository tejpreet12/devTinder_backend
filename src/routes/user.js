const express = require("express");
const { authUser } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", authUser, async (req, res) => {
  const loggedInUser = req.user;

  try {
    const areRequestsThere = await ConnectionRequest.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data Fetched",
      data: areRequestsThere,
    });
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
});

userRouter.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const ConnectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = ConnectionRequests.map((data) => {
      if(loggedInUser._id.toString() === data.fromUserId._id.toString()){
        return data.toUserId;
      } 
      return data.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
});

module.exports = { userRouter };
