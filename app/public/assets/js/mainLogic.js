
var move = 1;
$.get("/checkplayers").then(function(response){
  console.log(response);
  //do something
  });
  function updateMove(move) {
    console.log(move);
    $.ajax({
      method: "PUT",
      url: "/playermove",
      data: move
    }).done(console.log("finished"));
}
updateMove(move);
