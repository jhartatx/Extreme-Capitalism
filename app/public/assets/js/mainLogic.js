
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
  $.get("/checkactiveplayer").then(function(response){
    currentLocation = response[0].pos_id;
    console.log("current location: "+ currentLocation);

    var x = Math.floor(Math.random() * 6 + 1);
    var y = Math.floor(Math.random() * 6 + 1);

    console.log("dice1: " + x);
    console.log("dice2: " + y);

    var diceTotal = x + y;
    var newPosition = currentLocation + diceTotal;
    if(newPosition > 40){
      newPosition -= 40;
    }
<<<<<<< HEAD
    console.log("newPos"+newPosition);
=======
    console.log("newPosition: "+newPosition);
>>>>>>> ffa6d31067652fba7450d6bc0d45bcb9c34c3910
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


function activeOff(current) {
  console.log('');
  $.ajax({
    method: "PUT",
    url: "/activeon",
    data: {current:current}
  }).done(console.log("finished"));
}

function activeOn(previous) {
  console.log('');
  $.ajax({
    method: "PUT",
    url: "/activeoff",
    data: {previous:previous}
  }).done(console.log("finished"));
}
//TURN THE CURRENT ACTIVE PLAYER
function endTurn(){
  var activePlayer;
  var previousPlayer;
  $.get("/checkactiveplayer").then(function(response){
    console.log(response);
    previousPlayer = response[0].user_id;
    activePlayer = response[0].user_id + 1;
    // var status = {
    //   activePlayer:activePlayer,
    //   previousPlayer:response[0].user_id
    // };
    //do something
  }).then(function (){
    activeOff(previousPlayer);
  }).then(function(){
    activeOn(activePlayer);
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

