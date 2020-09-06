const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

let items = ['Buy Food', 'Cook Food', 'Eat Food']
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){

    let today = new Date();
    let day = "";

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    } 

    day = today.toLocaleDateString("en-US", options)

    console.log("items: " + items)
    res.render('list', {day: day, items: items});
})

app.post("/", function(req, res){
    items.push(req.body.todoItem)
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
})