var socket = io();
var activePlayer;
var previousPlayer;
var p1Info;
var p2Info;
var p3Info;
var p4Info;
/*get request sent to api routes requesting */
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
/*==============================================================================
-------------------------Move the Active Player---------------------------------
===============================================================================*/
//this function will update the players new location
  function updateMove(move) {
    // console.log(move);
    $.ajax({
      method: "PUT",
      url: "/playermove",
      data: {move:move}
    }).done(console.log("finished"));
}
//dice
var dbl = 0;
function rolldice() {
  $.get("/checkactiveplayer").then(function(response){
    currentLocation = response[0].pos_id;
    // console.log("current location: "+ currentLocation);
    var x = Math.floor(Math.random() * 6 + 1);
    var y = Math.floor(Math.random() * 6 + 1);
    // console.log("dice1: " + x);
    // console.log("dice2: " + y);
    var diceTotal = x + y;
    var newPosition = currentLocation + diceTotal;
    if(newPosition > 40){
      newPosition -= 40;
    }
    console.log("newPosition: "+newPosition);
    updateMove(newPosition);
    console.log("dice total: " + diceTotal);
    if (x == y) { //<----checking if there is a double
        dbl++; //<---increment double count
        alert("Doubles! Roll again. Double count: " + dbl);
        if(dbl%3==0){
          alert("Three doubles in a row, go to JAIL!");
          dbl = 0;
        }
    }
    //trying to get this to emit to everyone
    socket.emit("roll", newPosition, x, y);
});
// socket listener
}
//socket listener logic.
socket.on('roll', function(newPosition, x, y){
  console.log(newPosition);
  if(x == 1){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side1.jpg");
  }
  if(x == 2){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side2.jpg");
  }
  if(x == 3){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side3.jpg");
  }
  if(x == 4){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side4.jpg");
  }
  if(x == 5){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side5.jpg");
  }
  if(x == 6){
    $("#dice-1 img").attr('src', "./assets/images/dice-sides/side6.jpg");
  }
  if(y == 1){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side1.jpg");
  }
  if(y == 2){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side2.jpg");
  }
  if(y == 3){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side3.jpg");
  }
  if(y == 4){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side4.jpg");
  }
  if(y == 5){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side5.jpg");
  }
  if(y == 6){
    $("#dice-2 img").attr('src', "./assets/images/dice-sides/side6.jpg");
  }
});
/*==============================================================================
-------------------------Change the Active Player-------------------------------
===============================================================================*/
//Invoke this function when you want the next player to be "active"
function endTurn(){
  $.get("/checkactiveplayer").then(function(response){
    console.log(response);
    console.log(response[0]);
    previousPlayer = response[0].user_id;
    activePlayer = response[0].user_id + 1;
    if(activePlayer === 5){
      activePlayer = 1;
    }
  }).then(function (){
    console.log("turning current player off");
    activeOn(activePlayer);
    activeOff(previousPlayer);
  });
}
function activeOn(current) {
  console.log(current);
  $.ajax({
    method: "PUT",
    url: "/activeon",
    data: {current:current}
  });
}
function activeOff(previous) {
  console.log(previous);
  $.ajax({
    method: "PUT",
    url: "/activeoff",
    data: {previous:previous}
  });
}
/*==============================================================================
-------------------------Pull Players Information-------------------------------
===============================================================================*/
//this function sets each variable as an object equal to the players db info
function playersInfo(){
  $.get("/checkplayers").then(function(response){
    p1Info = response[0];
    p2Info = response[1];
    p3Info = response[2];
    p4Info = response[3];
  });
}
// DICE BUTTON ON CLICK FUNCTION ============================================
//dice button onclick
$(".dice-btn").click(function(){
  console.log("clicked");
  rolldice();
  endTurn();
});
// INFO BUTTON ON CLICK FUNCTION ============================================
// display and hide modal content for USER INSTRUCTIONS
$("#info-btn").click(function (){
  $("#info-modal").show(300);
});
// display and hide modal content for GAME RULES
$("#game-rules-btn").click(function (){
  $("#game-rules-modal").show(300);
});
// display and hide modal content for PROPERTY AUCTION HOUSE
$("#auction-house-btn").click(function (){
  $("#auction-house-modal").show(300);
});
$('#auction-house-btn').mouseover(function() {
$('.text').css("visibility","visible");
});
$('#auction-house-btn').mouseout(function() {
$('.text').css("visibility","hidden");
});
// display and hide modal content for EXIT GAME
$("#end-game-btn").click(function (){
  $("#end-game-modal").show(300);
});
// close my modal (for EXIT GAME ONLY)
$("#no-end-game").click(function (){
  $("#end-game-modal").hide(300);
});
// close my modal (universal)
$(".close").click (function(){
  $(".modal").hide(300);
});
// CHATBOX FUNCTIONALITY ====================================================
(function() {
    $('#live-chat header').on('click', function() {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
    });
    $('.chat-close').on('click', function(e) {
        e.preventDefault();
        $('#live-chat').fadeOut(300);
    });
}) ();
// USER BUTTON ON CLICK FUNCTION ============================================
// user info panel drop down
var userInfo = $(".user-btn");
var i;
for (i = 0; i < userInfo.length; i++) {
  userInfo[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };
}
