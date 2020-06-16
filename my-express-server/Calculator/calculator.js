const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmi.html");
});

app.post("/bmicalculator", function (req, res) {
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let bmi = weight / height / height;
    res.send("Your BMI is: " + bmi);
});

app.post("/", function (req, res) {

    let result = parseInt(req.body.num1) + parseInt(req.body.num2);

    res.send("Thank you for sending your result is " + result);
});

app.listen(3000, function () {
    console.log("Server running at localhost 3000");
});

