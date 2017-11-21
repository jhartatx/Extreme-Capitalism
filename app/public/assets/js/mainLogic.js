
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
    var newPos = currentLocation + diceTotal;
    if(newPos > 40){
      newPos -= 40;
    }
    console.log("newPos"+newPos);
    updateMove(newPos);
    console.log("dice total: " + diceTotal);
    $('.dice1').attr('id', "dice" + x);
    $('.dice2').attr('id', "dice" + y);



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
    socket.emit("roll", newPos, x, y);
});
// socket listener
}


//socket listener logic.
socket.on('roll', function(newPos, x, y){
  console.log(newPos);
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


function updateActivePlayer(active) {
  console.log(active);
  $.ajax({
    method: "PUT",
    url: "/changeactive",
    data: {newActive:active}
  }).done(console.log("finished"));
}
//TURN THE CURRENT ACTIVE PLAYER
function endTurn(){
  var activePlayer;
  $.get("/checkactiveplayer").then(function(response){
    activePlayer = response[0].user_id + 1;
    console.log(activePlayer);
    //do something
  }).then(function (){
    updateActivePlayer(activePlayer);
  });
}
endTurn();

};

// DICE BUTTON ON CLICK FUNCTION ============================================
//dice button onclick
// $(".dice-btn").click(function(){
//   console.log("clicked");
//   rolldice();
// });


// INFO BUTTON ON CLICK FUNCTION ============================================
// display and hide modal content for user instructions
$("#info-btn").click(function (){
  $("#myModal").show(300);
});

$(".close").click (function(){
  $("#myModal").hide(300);
});


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
  }
}

