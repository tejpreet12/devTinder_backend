const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Test Page Important");
})

app.use ("/hello",(req,res) => {
    res.send("Hello From Server.");
})

app.use ("/namaste",(req,res) => {
    res.send("Namaste From Server.");
})

app.use ("/",(req,res) => {
    res.send("Dashboard Page");
})


app.listen(7777, () => {
    console.log("Server is running successfully on Port 7777");
});

