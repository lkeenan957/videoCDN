var db = require('../models');
//bringing in the bcrypt npm module
var bcrypt = require('bcrypt');
const userCtrl = require('../controllers/userCtrl');
const sessionCtrl = require('../controllers/sessionCtrl');
const stripeCtrl = require('../controllers/stripeCtrl');
var path = require('path');

module.exports = function (app) {

	///////HTML routes
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, '../public/index.html' ));
	})
	app.get("/plans", function (req, res) {
		res.sendFile(path.join(__dirname, '../public/plans.html'));
	})
	app.get("/signup", function (req, res) {
		res.sendFile(path.join(__dirname, '../public/signUp.html'));
	})
	app.get("/login", function (req, res) {
		res.sendFile(path.join(__dirname, '../public/loginIn.html'));
	})
	/////////////// User enpoints
	//login endpoint
	app.post("/api/login", userCtrl.login)

	// signin enpoint logic
	app.post("/api/signUp", userCtrl.signUp);

	app.get("/api/logout", userCtrl.logOut);

	//get user info endpoint via query params
	app.get('/api/profile/:username', userCtrl.getOneUser);
	//update profile route
	app.put('/api/update/:username', userCtrl.updateLoggedInUser);


	////////////// Below is endpoints for express session

	//endpoint for grabbing session user object to be used accrossed entire app.
	app.get("/api/session", sessionCtrl.getSession);

	/////video endpoints


	/////JWT enpoints


	////stripe / cart routes
	app.post("/api/stripeCharge", stripeCtrl.charge)


	////JWPlayer routes



	///////HTML routes

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	})

}