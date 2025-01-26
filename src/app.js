const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

// const {authMiddleware, userMiddleware}  = require("./middlewares/auth")

// This will only handle get call for /user
// app.get("/user", (req,res) => {
//     res.send({
//         firstName:'Akshay',
//         lastName:"Saini",
//     })
// })

// app.post("/user", (req,res) => {
//     console.log("Data Saved to DB");
//     res.send("Data Saved Successfully");
// })

// app.delete("/user", (req,res)=> {
//     console.log("Deleting the user");
//     res.send("User Deleted");
// })

// app.patch("/user", (req,res) =>{
//     console.log("Data Updated Successfully");
//     res.send("Data Updated")
// })

// // this will match all the Http method api calls to /test
// app.use("/test", (req, res) => {
//     res.send("Test Page Important");
// })

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("1 Response is printed");
//     next();
//     // res.send("Response 1")

//   },
// [  (req, res, next) => {
//     console.log("2 Response is printed");
//     // res.send("Response 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3 Response is printed");
//     // res.send("Response 3");
//     next();
//   }],
//   (req, res, next) => {
//     console.log("4 Response is printed");
//     res.send("Response 4");
//   }
// );

// app.use("/", (req, res, next) => {
//   console.log("Middleware 1");
//   next();
// });

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Middleware 2");
//     next();
//   },
//   (req, res) => {
//     res.send("Actually Response");
//   }
// );

// app.use('/admin', authMiddleware )

// app.use('/admin/getAllData', (req,res) => {
//   res.send("All Data from DB");
// })

// app.use('/admin/deleteUser', (req,res) => {
//   res.send("User Deleted from DB");
// })

// app.use("user/login", (req,res) => {
//   res.send("USER LOGGED IN");
// })

// app.use("/user/data", userMiddleware , (req,res) => {
//   res.send("FROM USER");
// })

// app.get("/user", (req,res) => {
//   try{
//     //DB FETCHING ERROR
//     throw new Error("Delhi");
//   }catch(err) {
//     res.status(500).send("HANDLED IN CATCH")
//   }

// })

// app.use("/" ,(err, req,res, next) => {
//   if(err){
//     res.status(500).send("Issue found");
//   }
// })

app.post("/signup", async (req, res) => {
  console.log("Called")
  const newUser = new User({
    firstName: "Tejpreet",
    lastName: "Singh",
    emailId: "tej@gmail.com",
    password: "Tej@12345",
    age: 23,
    gender: "Male",
  });

  try {
    await newUser.save();
    console.log("User Created Successfully");
    res.send("User Created Successfully");
  } catch (err) {
    console.log("Unable to create User");
    res.status(401).send("Unable to create User");
  }
});

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
