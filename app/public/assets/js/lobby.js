console.log("connected to lobby.js");
  var user ;
$(document).ready(function(){

  $.get("/api/user_data").then(function(data) {
    console.log("get request 1");
    user = data.username;
      $(".member-email").text(data.email);
      $(".member-username").text(data.username);
    })
    .then(function(){
      console.log("ajax put request 2");
    // console.log(move);
    $.ajax({
      method: "PUT",
      url: "/addplayer",
      data: {user:user}
    }).done();
    });
  });
