$( document ).ready(function() {

  //var address = encodeURIComponent($("#location").val());

  $.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=Austin,TX&sensor=false&key=AIzaSyDije1gHJ-JpNUMGPBbZl8Fq8c9tsu3COk",
    dataType: "json",
    success: processJSON
  });

  function processJSON(json) {
    console.log(json);
  }
});