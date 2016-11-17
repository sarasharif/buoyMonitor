const Client = require('./client');

$(document).ready(function(){
  Client.showAllBuoys();

  $("#showAll").click(function() {
    Client.showAllBuoys();
  });

  $("#showFavs").click(function() {
    Client.showFavBuoys();
  });

  $("#allBuoys").on("click", ".favtoggle", function() {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".favtoggle", function() {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".data-toggle", function() {
    Client.toggleBuoyData();
  });

});
