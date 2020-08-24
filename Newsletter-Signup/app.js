const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
require("dotenv").config();

const { Http2ServerResponse } = require("http2")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    console.log("POST")
    const fisrtName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fisrtName,
                    LNAME: lastName
                }
            }
        ]
    }



    const jsonData = JSON.stringify(data)
    const url = "https://us17.api.mailchimp.com/3.0/lists/" + process.env.LIST_ID 
    const options = {
        method: "POST",
        auth: "Alex:" + process.env.API_KEY
    }
    const request = https.request(url, options, function(response){
        
        response.on("data", function(data){
            const json = JSON.parse(data)
            console.log(JSON.parse(data)) 
            console.log("Error count: " + json.error_count)
        })
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
})
