let Client = require('./client');
// $(document).ready(() => {

(function(buoyFinder){
   buoyFinder(window.jQuery, window, document);
 }(($, window, document) => {
    $(() => {

    Client.showAllBuoys();

    $("#showAll").click(() => {
      Client.showAllBuoys();
    });

    $("#allBuoys").on("submit", "form", () => {
      event.preventDefault();
      Client.showAllBuoys();
    });

    $("#showFavs").click(() => {
      Client.showFavBuoys();
    });

    $("#allBuoys").on("click", ".fav-toggle", () => {
      Client.toggleFavorite();
    });

    $("#favBuoys").on("click", ".fav-toggle", () => {
      Client.toggleFavorite();
    });

    $("#favBuoys").on("click", ".data-toggle", () => {
      Client.toggleBuoyData();
    });

  });
}));
