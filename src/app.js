const express = require("express");

const app = express();

// This will only handle get call for /user
app.get("/user", (req,res) => {
    res.send({
        firstName:'Akshay',
        lastName:"Saini",
    })
})

app.post("/user", (req,res) => {
    console.log("Data Saved to DB");
    res.send("Data Saved Successfully");
})

app.delete("/user", (req,res)=> {
    console.log("Deleting the user");
    res.send("User Deleted");
})

app.patch("/user", (req,res) =>{
    console.log("Data Updated Successfully");
    res.send("Data Updated")
})


// this will match all the Http method api calls to /test
app.use("/test", (req, res) => {
    res.send("Test Page Important");
})

app.listen(7777, () => {
    console.log("Server is running successfully on Port 7777");
});

