const Client = require('../client');

$(document).ready(function(){
  Client.showAllBuoys();

  $("button#showAll").click(function() {
    Client.showAllBuoys();
  });

  $("button#showFavs").click(function() {
    Client.showFavBuoys();
  });
});
