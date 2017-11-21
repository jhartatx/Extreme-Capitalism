
var socket = io();
console.log("connected");
/*get request sent to api routes requesting */
$.get("/checkplayers").then(function(response){
  console.log(response);
  //do something
  });
$.get("/pullchance").then(function(response){
  var randomNumber = Math.floor(Math.random() * (response.length)+1);
  var randomChance = response[randomNumber-1];
  console.log(randomChance);
});
$.get("/pullcommunity").then(function(response){
  var randomNumber = Math.floor(Math.random() * (response.length)+1);
  var randomCommunity = response[randomNumber-1];
  console.log(randomCommunity);
});

//this function will update the players new location
  function updateMove(move) {
    console.log(move);
    $.ajax({
      method: "PUT",
      url: "/playermove",
      data: {move:move}
    }).done(console.log("finished"));
}

//dice
var dbl = 0;
function rolldice() {
  console.log("rolled");
  $.get("/checkactiveplayer").then(function(response){
    currentLocation = response[0].pos_id;
    console.log("current location: "+ currentLocation);

    var x = Math.floor(Math.random() * 6 + 1);
    var y = Math.floor(Math.random() * 6 + 1);

    console.log("dice1: " + x);
    console.log("dice2: " + y);

    var diceTotal = x + y;
    var newPos = currentLoc + diceTotal;
    if(newPos > 40){
      newPos -= 40;
    }
    console.log("newPos"+newPos);
    updateMove(newPos);
    console.log("dice total: " + diceTotal);
    $('.dice1').attr('id', "dice" + x);
    $('.dice2').attr('id', "dice" + y);
    if (x == y) { //<----checking if there is a double

    if (x == y) { //<----checking if there is a double
        dbl++; //<---increment double count
        alert("Doubles! Roll again. Double count: " + dbl);
        if(dbl%3==0){
          alert("Three doubles in a row, go to JAIL!");
          dbl = 0;
        }
        //Now reroll the dice, but if you hit 3 doubles in a row, you get message go to jail.

    }
    //trying to get this to emit to everyone
    socket.emit("roll", newPos);
      });
}

// socket listener


socket.on('roll', function(newPos){
  console.log(newPos);
});


//dice button onclick
$(".dice-btn").click(function(){
  console.log("clicked");
  rolldice();
});

// display and hide modal content for user instructions
$("#info-btn").click(function (){
  $("#myModal").show(300);
});

$(".close").click (function(){
  $("#myModal").hide(300);
});
