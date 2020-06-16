const express = require("express");
const bodyParse = require("body-parser");

const app = express();
app.use(bodyParse.urlencoded({extended: true}));

function bmi(weight, height) {
    Number(weight);
    Number(height);
    return weight / height / height;
}