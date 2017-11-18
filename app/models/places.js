// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "player" model
var Places = sequelize.define("places", {
pos_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_grp: {
    type: Sequelize.INTEGER
  },
  c_owner: {
    type: Sequelize.STRING
  },
  rent_lvl: {
    type: Sequelize.INTEGER
  },
  name:{
    type: Sequelize.STRING
  },
  rent:{
    type: Sequelize.INTEGER
  },
  active:{
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

// Syncs with DB
Places.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Places;
