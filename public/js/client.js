const Engine = require('./engine');
const Appender = require('./appender');

module.exports = {

  showAllBuoys: function() {
    Appender.showAndHide($("#allBuoys"),$("#favBuoys"));
    const links = Engine.getFavLinks();
    Engine.getAllBuoys(links, this.setupAllBuoys);
  },

  showFavBuoys: function() {
    Appender.showAndHide($("#favBuoys"),$("#allBuoys"));
    Engine.getFavBuoys(this.setupFavBuoys);
  },

  toggleFavorite: function() {
    const button = event.target;
    if (button.classList.contains("favorite")) {
      $(button).removeClass("favorite");
      Engine.deleteFavBuoy(button);
    } else {
      $(button).addClass("favorite");
      Engine.createFavBuoy(button);
    }
  },

  toggleBuoyData: function() {
    const button = event.target;
    if (button.classList.contains("closed")) {
      $(button).removeClass("closed");
      Engine.getBuoyData(button, Appender.appendDataAfterFavoriteBuoy);
    } else {
      $(button).addClass("closed");
      Appender.removeDataFromFavoriteBuoy(button);
    }
  },

  setupAllBuoys: function(links, data) {
    const buoys = data.rss.channel[0].item;
    const htmlBuoys = Appender.createAllBuoysHtml(links, buoys);
    $("#allBuoys").html(htmlBuoys);
  },

  setupFavBuoys: function(buoys) {
    const htmlBuoys = Appender.createFavBuoysHtml(buoys);
    $("#favBuoys").html(htmlBuoys);
  },

};
