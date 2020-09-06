const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

let items = ['Buy Food', 'Cook Food', 'Eat Food']
let workItems = ['Homework']
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){

    //Get current day
    let today = new Date();
    let day = "";

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    } 

    day = today.toLocaleDateString("en-US", options)



    console.log("items: " + items)
    res.render('list', {listTitle: day, items: items});
})

app.post("/", function(req, res){
    
    let item = req.body.todoItem
    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", items: workItems})
})

app.get("/about", function(req, res){
    res.render("about")
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
})