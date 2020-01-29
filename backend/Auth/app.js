var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
//var methodOverride=require('method-override');
//var moment=require('moment');

//const loginRouter = require('index.js');

//DB connection
mongoose.connect("mongodb://localhost/sih");

//Models
var User = require('./models/user.js');

//Configuration
app.use(bodyParser.urlencoded({extended:true}));

// app.use(function(req, res, next){
//     res.locals.scurrentUser=req.user;
//     next();
// });

// To run locally
app.listen(3000,function(){
	console.log("Welcome to Clean And Green!");
});