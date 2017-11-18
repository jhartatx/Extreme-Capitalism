var Players = require("../models/players.js");
var Places = require("../models/places.js");
var Community = require("../models/community.js");
var Chance = require("../models/chance.js");

module.exports = function(app) {

  app.get("/checkplayers", function(req, res) {
    Players.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

  app.get("/checkplaces", function(req, res) {
    Places.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

  app.get("/checkchance", function(req, res) {
    Chance.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

  app.get("/checkcommunity", function(req, res) {
    Community.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

};
