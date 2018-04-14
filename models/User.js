var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UsersSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var Users = mongoose.model("Users", UsersSchema);

// Export the Article model
module.exports = Users;
