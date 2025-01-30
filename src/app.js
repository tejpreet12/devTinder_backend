const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
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

    await newUser.save();
    console.log("User Created Successfully");
    res.send("User Created Successfully");
  } catch (err) {
    console.log("Unable to create User");
    res.status(400).send(err.message + " Unable to create User");
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  try {
    const users = await User.find({ emailId: email });
    console.log("USers", users);
    if (users.length === 0) {
      res.status(404).send("No Data Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Some Error Occured");
  }
});

// Get all users for Feed - Feed Api`
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No Data Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Some Error Occured");
  }
});

//delete user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted");
  } catch (err) {
    res.status(400).send("Some Error Occured");
  }
});

//update user by Id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "about", "photoUrl", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      res.status(400).send("User can't update");
    }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Update Successfully");
  } catch (err) {
    res.status(400).send(err.message + "Some Error Occured");
  }
});

//update user by email
// app.patch("/user", async (req, res) => {
//   const email = req.body.emailId;
//   const data = req.body;
//   console.log(email, "EMAIL");
//   try {
//     await User.findOneAndUpdate({ emailId: email }, data);
//     res.send("User Update Successfully");
//   } catch (err) {
//     res.status(400).send("Some Error Occured");
//   }
// });

connectDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(7777, () => {
      console.log("Server is running successfully on Port 7777");
    });
  })
  .catch((err) => {
    console.log("Error : ", err);
  });
