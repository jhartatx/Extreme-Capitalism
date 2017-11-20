

/*get request sent to api routes requesting */
$.get("/checkplayers").then(function(response){
  console.log(response);
  //do something
  });
$.get("/pullchance").then(function(response){
  console.log(response);
});
$.get("/pullcommunity").then(function(response){
  console.log(response);
});




/*AJAX UPDATE pases the move variable through and sends information to the api routes. triggering the database the upset targeting the current player with the "active" boolean set to true*/
//this variable should be set to the players new location via a function
var move = 2;
//this function will update the players new location
  function updateMove(move) {
    console.log(move);
    $.ajax({
      //type of request sent
      method: "PUT",
      //target of request in apiroutes
      url: "/playermove",
      //the move variable gets passed through here
      data: {move:move}
    }).done(console.log("finished"));
}
updateMove(move);
