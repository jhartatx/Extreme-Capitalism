// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Players = sequelize.define("players", {
user_id: {
    type: Sequelize.INTEGER
  },
  user_name: {
    type: Sequelize.STRING
  },
  user_money: {
    type: Sequelize.INTEGER
  },
  is_turn: {
    type: Sequelize.BOOLEAN
  },
  pos_id:{
    type: Sequelize.INTEGER
  },
  in_jail:{
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

// Syncs with DB
Player.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Players;
