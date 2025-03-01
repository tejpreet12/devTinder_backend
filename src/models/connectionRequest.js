const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
        type: String,
        required:true,
        enums:{
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,

        }
    },
  },
  { timestamps: true }
);

//indexing for db optimization
connectionRequestSchema.index({fromUserId:1, toUserId:1});


//this function will be called bro saving a user into db
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send request to yourself ")
  }
  next();
})

const ConnectionRequestModel = new mongoose.model("Connection Request", connectionRequestSchema);

module.exports = ConnectionRequestModel;