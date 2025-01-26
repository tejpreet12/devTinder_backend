const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: String,
  emailId:String,
  password:String,
  age:Number,
  gender:String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
