const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");

app.use(express.json());
app.use(cookieParser());

//Using Routers
app.use("/", authRouter);
app.use("/", profileRouter);

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
