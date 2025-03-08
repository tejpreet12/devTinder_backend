const express = require("express");
const { authUser } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const Users = require("../models/user");

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
      if (loggedInUser._id.toString() === data.fromUserId._id.toString()) {
        return data.toUserId;
      }
      return data.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
});

userRouter.get("/feed", authUser, async (req, res) => {
  const loggedInUser = req.user;

  const pageNumber = parseInt(req.query.pageNo) || 1;
  let limit = parseInt(req.query.limit) || 2;
  limit = limit > 50 ? 2 : limit;
  const skip = (pageNumber-1) * limit;


  const ConnectionRequests = await ConnectionRequest.find({
    $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
  })
    .select("fromUserId toUserId")
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

  const hideUsersFromFeed = new Set();

  ConnectionRequests.forEach((req) => {
    hideUsersFromFeed.add(req.fromUserId._id.toString());
    hideUsersFromFeed.add(req.toUserId._id.toString());
  });
  
  const users = await Users.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      // { _id: { $ne: loggedInUser._id } },
    ],
  }).skip(skip).limit(limit);

  res.json({ UsersData: users });
});

module.exports = { userRouter };
