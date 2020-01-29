var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
//var methodOverride=require('method-override');
//var moment=require('moment');
require("dotenv").config();

const loginRouter = require('./index');

//DB connection
mongoose.connect("mongodb://localhost:27017/sih",(err) => {
	if(err) console.log('err :', err);
	else console.log('Connected');
});

//Models
var User = require('./models/user');


//Configuration
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', loginRouter);

// app.use(function(req, res, next){
//     res.locals.scurrentUser=req.user;
//     next();
// });

// To run locally
app.listen(3000,function(){
	console.log("Welcome to Stubber!");
});