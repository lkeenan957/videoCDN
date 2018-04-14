var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PlansSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    viewers: {
      type: Number,
      required: true
    }
  });

  //there are no assosiations yet so i commented this out

  // Users.associate = function (models) {
  //   // We're saying that a Users should belong to an Author
  //   // A Users can't be created without an Author due to the foreign key constraint
  //   Users.belongsTo(models.<YOUR MODEL NAME>, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  var Plans = mongoose.model("Plans", PlansSchema);

  module.exports = Plans;