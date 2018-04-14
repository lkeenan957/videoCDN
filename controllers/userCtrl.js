var db = require('../models');
var bcrypt = require('bcrypt');
module.exports = {
  login: function (req, res) {
    //will show our user data from front end
    console.log(req.body)
    //will see the currently formatted session object with user data
    console.log(req.session)
    //initalizing user data variable to an empty object. this will hold our user data on this endpoint
    var user = {};

    db.User.findOne({
      username: req.body.username
    })
      .then(function (UserData) {
        console.log(UserData, "this is user data");
        //if the database does not find a user with that username we will revice a null value from our database. null values are a little "special" in relation to JS.
        //this is how we would correctly do a check for a null value if recieved
        if (!UserData && typeof UserData === "object") {
          //this will send an error code to our front end for the user not existing
          res.status(404).send('ohhh no, there is a problem with the username or password!')
        } else {
          //here we bring in bcrypt. bcrypt's compair method asks for a few things. it asks for the first parameter you send in a plain text password. 
          //AKA: our users password coming in from the front end. the second parameter bcrypt wants us to pass in the hashed password that we stored in the User. lastly it wants a callback funtion
          //bcrypt will hash the pasword coming in from the front end and compaire it to the users hashed password from our database it will give us a boolean value to let us know if the 
          //passwords were the same
          bcrypt.compare(req.body.password, UserData.password, function (err, bcryptRes) {
            // bcryptRes == true or false

            //if the response is false send an error to the front end letting the user know that the passwords did not match.
            if (!bcryptRes) {
              res.status(404).send('ohhh no, there is a problem with the username or password!')
            } else {
              //if the response from bcrypt was true we know our users password matched and we can now format the user data coming from the database to be sent to the font end
              var userObj = {
                id: UserData.id,
                name: UserData.name,
                username: UserData.username,
                email: UserData.email,
                profilePic: UserData.profilePic,
                loggedIn: true
              }
              //we update the loggedIn key to have a true value. we can use this value on the fron end to see if the user is logged in or not.
              req.session.user.isAdmin = (UserData.isAdmin ? true : false)
              //here the session's user object is updated with the users data. we can hit our /session endpoing witha  get request from the front end and get our user object.
              req.session.user = userObj;

              console.log("this is session", req.session)
              res.status(200).send('Successful login')
            }
          })
        }
      }).catch(function (err) {
        console.log(err, " this is error");
        res.status(404).send('ohhh no, there is a user with the username')
      })
  },
  signUp: function (req, res, next) {
    console.log(req.body)
    //to store a hased password into the database we need to first salt our password. this will tell bcrypt how many time to pass through the users password to generate the hash
    bcrypt.genSalt(10, function (err, salt) {
      //the bcrypt hash method will then 
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        console.log(hash);
        // Store hash in your password User.
        req.body.password = hash;
        
        db.User.create(req.body).then(function (UserData) {
          console.log(UserData)
          var userObj = {
            id: UserData._id,
            name: UserData.name,
            username: UserData.username,
            email: UserData.email,
            profilePic: UserData.profilePic,
            loggedIn: true
          }
          req.session.user = userObj;
          //  console.log(UserData.isAdmin)
          req.session.user.isAdmin = (UserData.isAdmin ? true : false)
          // console.log(req.session.user.isAdmin)
          res.json(userObj);
        }).catch(function (err) {

          res.status(404).send('ohhh no, there is a user with the username')
        })
      });
    });
  },
  logOut: function (req, res, next) {
    req.session.user = {}
    req.session.user = {
      id: null,
      name: '',
      username: '',
      email: '',
      profilePic: null,
      loggedIn: false,
      isAdmin: false
    }
    res.json(req.session.user)
  },
  getOneUser: function (req, res, next) {
    console.log(req.param);
    db.User.findOne({
      username: req.params.username
    }).then(function (UserData) {
      console.log(UserData)
      var userObj = {
        id: UserData.id,
        name: UserData.name,
        username: UserData.username,
        email: UserData.email,
        profilePic: UserData.profilePic
      }
      req.session.user.loggedIn = true;
      req.session.user.currentUser = userObj;
      res.json(userObj)
    })
  },
  updateLoggedInUser: function (req, res, next) {
    req.session.user.currentUser = req.body
    var loggedUser = req.session.user.currentUser;
    if (true) {
      db.User.update({
        username: loggedUser.username,
        name: loggedUser.name,
        email: loggedUser.email,
        profilePic: loggedUser.profilePic
      }, {
          where: {
            username: req.params.username
          }
        }).then(function (UserData) {
          res.json(UserData)
        })
    } else {
      res.status(404).json("please log in to update profile")
    }
  }
}