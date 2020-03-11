const express = require("express");
const app = express();
const cors = require('cors');

require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

module.exports = app;


/* 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors')
//var methodOverride=require('method-override');
//var moment=require('moment');
require("dotenv").config();

const loginRouter = require('./index');

//DB connection
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, (err) => {
	if (err) console.log('err :', err);
	else console.log('Connected');
});

//Models
var User = require('./models/user');


//Configuration
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use('/api', loginRouter);

// app.use(function(req, res, next){
//     res.locals.scurrentUser=req.user;
//     next();
// });

// To run locally
app.listen(process.env.PORT, function () {
	console.log("Welcome to Stubber!");
});

*/