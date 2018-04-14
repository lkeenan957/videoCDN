var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
const session = require("express-session");
var path = require('path');

// Require all models
var db = require("./models");



var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSIONSECRET || "cat",
  resave: false,
  saveUninitialized: true
}));

function userSetup(req, res, next) {
  if (!req.session.user) {
    req.session.user = {
      id: null,
      name: '',
      username: '',
      email: '',
      profilePic: null,
      loggedIn: false,
      isAdmin: false
    }
  }
  next()
}

// Configure middleware
app.use(userSetup)
// Use morgan logger for logging requests

// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Use express.static to serve the public folder as a static directory

// Routes

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/videoStream';

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



require('./routes/apiRoutes')(app)
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});