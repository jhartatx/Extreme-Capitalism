

/*get request sent to api routes requesting */
$.get("/checkplayers").then(function(response){
  console.log(response);
  //do something
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

//dice
var dbl = 0;
function rolldice() {
    var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    var y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);

    console.log("dice1: " + x);
    console.log("dice2: " + y);
    var diceTotal = x + y;
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
};

// DICE BUTTON ON CLICK FUNCTION ============================================
//dice button onclick
$(".dice-btn").click(function(){
  rolldice();
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
