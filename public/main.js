$(document).ready(function(){
  showAllBuoys();

  $("button#showAll").click(function() {
    showAllBuoys();
  });

  $("button#showFavs").click(function() {
    showFavBuoys();
  });
});

function showAllBuoys() {
  $(".allBuoys").removeClass("hidden").html('<h1>....loading buoys within radius...</h1>');
  $(".favBuoys").addClass("hidden");
  getAllBuoys();
}

function showFavBuoys() {
  $(".favBuoys").removeClass("hidden").html('<h1>....loading your favorite buoys....</h1>');
  $(".allBuoys").addClass("hidden");
  getFavBuoys();
}

function getAllBuoys() {
  $.get("/api/allBuoys", function (data) {
    console.log(data);
  });
}

function getFavBuoys() {
  $.get("/api/favBuoys", function (data) {
    console.log(data);
  });
}
