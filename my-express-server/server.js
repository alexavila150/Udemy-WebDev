const express = require("express");
const app = express();



app.get("/", function (request, response) {
    response.send("<h1>Hello World</h1>");
});

app.get("/contact", function (request, response) {
    response.send("Contact me at:");
});

app.get("/about", function (req, res) {
    res.send("My name is Alex a Computer Science Student");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});