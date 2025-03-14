const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", authUser, async (req, res) => {
  try {

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
        // return imp so that the code does not continue
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }
    
      // check if touserid and fromuserid are not same
      // if(toUserId === fromUserId){        
      // }
      
      const toUser = await User.findById(toUserId);
      if (!toUser) {
          return res.status(404).json({ message: "User not found!" });
        }
        
      //existingConnectionRequest check add that
      const isExistingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {fromUserId,toUserId},
          {fromUserId: toUserId, toUserId:fromUserId},
        ]
      })

      if(isExistingConnectionRequest){
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      })

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    
    

  } catch (err) {
    res.status(400).json({ Err: `${err.message}error received` });
  }
});

requestRouter.post("/request/review/:status/:requestId", authUser, async(req,res) => {

  try {
    const {requestId, status} = req.params;
    const currentUserId = req.user._id;
  
    const allowedStatus = ["accepted","rejected"];
  
    if(!allowedStatus.includes(status)){
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    const request = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: currentUserId,
      status:'interested',
    })

    if(!request){
      res.status(400).json({message:`No Request Found`})
    }

    request.status = status;

    const data = await request.save();

    res.json({ message: "Connection request " + status, data });

  }catch(err) {
    res.status(400).json({message:`ERROR: ${err.message}`})
  }

})

module.exports = { requestRouter };
