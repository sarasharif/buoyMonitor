const Client = require('./client');

$(document).ready( () => {
  Client.showAllBuoys();

  $("#showAll").click( () =>  {
    Client.showAllBuoys();
  });

  $("#showFavs").click( () =>  {
    Client.showFavBuoys();
  });

  $("#allBuoys").on("click", ".favtoggle", () =>  {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".favtoggle", () =>  {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".data-toggle", () =>  {
    Client.toggleBuoyData();
  });

});
