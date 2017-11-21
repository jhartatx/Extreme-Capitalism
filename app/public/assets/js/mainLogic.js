

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

    updateMove(newPosition);

//assign dice photo to dice role and display
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

    if (x == y) { //<----checking if there is a double
        dbl++; //<---increment double count
        alert("Doubles! Roll again. Double count: " + dbl);
        if(dbl%3==0){
          alert("Three doubles in a row, go to JAIL!");
          dbl = 0;
        };
    };
      });
};
//dice button onclick
$(".dice-btn").click(function(){
  rolldice();
});

// display and hide modal content for user instructions
$("#info-btn").click(function (){
  $("#myModal").show(300);
});

$(".close").click (function(){
  $("#myModal").hide(300);
});
