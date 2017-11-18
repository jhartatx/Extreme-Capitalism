// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "player" model
var Chance = sequelize.define("chance_cards", {
cha_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
card_title: {
    type: Sequelize.STRING
  },
card_text:{
    type: Sequelize.TEXT
  },
card_value:{
    type: Sequelize.INTEGER
}
}, {
  timestamps: false
});

// Syncs with DB
Chance.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Chance;
