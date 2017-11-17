module.exports = function(app) {

  app.get("/checkplayers", function(req, res) {
    Players.findAll({}).then(function(results) {
      res.json(results);
      console.log(res.json(results));
    });
  });

};
