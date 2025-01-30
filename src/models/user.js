const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invaild email ");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a Strong Password ");
        }
      },
    },
    age: {
      type: Number,
      // min: 18,
      // max: 100,
    },
    gender: {
      type: String,
      // enum: ["male", "female", "others"],  found myself
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invaild gender data type");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.punjabkingsipl.in/static-assets/images/players/70500.png?v=6.01",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Not a valid Photo URL ");
      },
    },
    about: {
      type: String,
      default: "Default User Bio",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
