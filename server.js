//import express, { response } from "express"; // a node.js web application framework
//import fetch from "node-fetch";
//import * from "./database_functionality.js";

const express = require('express');
//const mysql = require('mysql');
//import mysql from "mysql";
//import * as path from 'path';



// import Weather from 'weather-js';

//const router = express.Rout
const app = express();

app.use(express.static("public")); // needed for style.css to work
// app.use(express.json)
app.use(express.urlencoded({extended: true}))
app.set("views", "./views");
app.set("view engine", "pug"); // use pug to generate html pages
global.access_token;


var weather = require('weather-js');
let tomorrow_high = null;
let global_res = null;


// render '/' page (index page)
app.get("/", function (req, res) {
 
  // Options:
  // search:     location name or zipcode
  // degreeType: F or C
   
  weather.find({search: 'Brussels', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
    let location = JSON.stringify(result[0].location.name, null, 2);
    let current_fahrenheit = JSON.stringify(result[0].current, null, 2);
    let forecast_string = JSON.stringify(result[0].forecast, null, 2);
    let forecast = result[0].forecast;
    // console.log('dit:',typeof forecast);
    // console.log('hier: ', forecast[1])
    let days = []
    for (i in [0,1,2,3,4]) {
      days.push(forecast[i])
    }
    for (var day of days) {
        console.log('day: ', day);
        console.log('day.date: ', day.date);
        console.log('day.high: ', day.high);
    }
    console.log(location, current_fahrenheit);
    tomorrow_high = days[2].high
    tomorrow_high = (tomorrow_high - 32)*5/9
    console.log('tomorrow HIGH: ', tomorrow_high)
    // console.log('forecast: ', forecast);
    global_res = res
    setTimeout(verder,1000);

  });
});

function verder() {
  let weather_discount = 1
  if (tomorrow_high <= 17 && tomorrow_high > 10) {
    weather_discount = 1.1
  }
  else if (tomorrow_high <= 24 && tomorrow_high > 24) {
    weather_discount = 1.12
  }
  else if (tomorrow_high >= 24) {
    weather_discount = 1.2
  }

	console.log('rendering index...');
	global_res.render("index", {tomorrow_high: tomorrow_high, weather_discount: weather_discount});
};


app.get("/info", function (req, res) { 
  res.render("info");
});    

  
app.post('/', async(req,res) => {
  let leeftijd = req.body.leeftijd;
  console.log('leeftijd: ' + leeftijd);
  let weer = req.body.leeftijd;
  console.log('weer' + req.body.weer)
  res.redirect("/info")
})

app.post('/info', async(req,res) => {
res.redirect("/authorize")
})
 
app.get('/hier', (req, res) => {
	db_func.printdb(req,res)
});

let listener = app.listen(4000, function () {
	console.log(
	  "The app is listening on http://localhost:" + listener.address().port
	);
  });
