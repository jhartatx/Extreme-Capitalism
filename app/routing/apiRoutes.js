/*==============================================================================
------------------------------CONNECTIONS---------------------------------------
===============================================================================*/

var db = require("../models");
//var Players = require("../models/players.js");
// var Places = require("../models/places.js");
// var Community = require("../models/community.js");
// var Chance = require("../models/chance.js");

module.exports = function(app) {



/*==============================================================================
------------------------------PLAYERS DATABASE----------------------------------
===============================================================================*/



  //localhost:8081/checkplayers pulls up all player details
  app.get("/checkplayers", function(req, res) {
    console.log("CHECKING ALL PLAYERS");
    db.players.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });


  app.get("/checkactiveplayer", function(req, res) {

    db.players.findAll({
      where:{
          is_turn: 1
        }
    }).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

  //pulls information of the current player
  app.put("/playermove", function(req, res){
    console.log(req.body);
    db.players.update({
      pos_id: req.body.move
    },{where:{
        is_turn: 1
      }
    }).then(function(results){
      //property check function
      //function based on property check
    });
  });

  app.put("/activeon", function(req, res){
    console.log("====================================================");
    console.log(req.body.current);
    console.log("====================================================");
    db.players.update({
      is_turn: 1
    },{where:{
        user_id: req.body.current
      }
    }).then(function(){

    }).catch(function(err){
      console.error(err);
    });

  app.put("/activeoff",function(req, res){
    console.log("====================================================");
    console.log(req.body.previous);
    console.log("====================================================");
      db.players.update({
        is_turn: 0
      },{where:{
          user_id: req.body.previous
        }
    }).then(function(){

    }).catch(function(err){
      console.error(err);
    });
  });



  /*============================================================================
  ------------------------------PLACES DATABASE---------------------------------
  =============================================================================*/
  //runs the


  //localhost:8081/checkplaces pulls up locations on the board
  app.get("/checkplaces", function(req, res) {
    db.places.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });



  /*============================================================================
  ------------------------------CHANCE DATABASE---------------------------------
  =============================================================================*/



  //localhost:8081/checkchance pulls up the chance cards
  app.get("/checkchance", function(req, res) {
    db.chance.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });


  //sends message to db requesting a chance card based on the cha_id of the card
  app.get("/pullchance", function(req, res){
    db.chance.findAll({
      // where:{
      //   // MATH.RANDOM function should pass a variable where the "2" currently is to pull up a card based on the cards id.
      //   cha_id: 2
      // },
    }).then(function(results){
      //card functionality will then occur in here based on cha_id
      res.json(results);
      // res.json(results[0].card_text);
      // res.json(results[0].card_value);
    });
  });



  /*============================================================================
  ------------------------------CHANCE DATABASE---------------------------------
  =============================================================================*/



  //localhost:8081/checkcommunity pulls up the community cards
  app.get("/checkcommunity", function(req, res) {
    db.community.findAll({}).then(function(results) {
      res.json(results);
      // console.log(res.json(results));
    });
  });

//sends message to db requesting a chance card based on the cha_id of the card
  app.get("/pullcommunity", function(req, res){
    db.community.findAll({
      // where:{
      //   //MATH.RANDOM function should pass a variable where the "2" currently is to pull up a card based on the cards id.
      //   com_id: 2
      // },
    }).then(function(results){
      //card functionality will then occur in here based on cha_id
      res.json(results);
    });
  });

});
};
