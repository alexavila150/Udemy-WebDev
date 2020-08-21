const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    console.log("POST request received")
    const cityName = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=0697fcbd0157bf54c81316d4a75b4b83&q=" + 
        cityName + 
        "&units=metric";

    //GET from OpenWeather API
    https.get(url, function(response){
        response.on("data", function(data){
            let weatherData = JSON.parse(data)
            console.log("weatherData: " + weatherData)
            let description = weatherData.weather[0].description
            let temp = weatherData.main.temp
            message = "<h1>The temperature in " + cityName + " is " + temp + " degrees Celcius<h1>\n"
            message += "<h1>The weather is currently: " + description + "<h1>"
            let icon = weatherData.weather[0].icon
            message += "<img src=\"http://openweathermap.org/img/wn/" + icon + "@2x.png\"><img>"
            res.send(message)
        })
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})