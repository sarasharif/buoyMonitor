const Engine = require('./engine');
const Build = require('./build');

module.exports = {

  showAllBuoys: function() {
    Build.show($("#allBuoys"));
    Build.hide($("#favBuoys"));
    const links = Engine.getFavLinks();
    Engine.getAllBuoys(links, this.appendAllBuoys);
  },

  showFavBuoys: function() {
    Build.show($("#favBuoys"));
    Build.hide($("#allBuoys"));
    Engine.getFavBuoys(this.appendFavBuoys);
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
      Engine.getBuoyData(button, Build.appendDataAfterFavoriteBuoy);
    } else {
      $(button).addClass("closed");
      Build.removeDataFromFavoriteBuoy(button);
    }
  },

  appendAllBuoys: function(links, data) {
    const buoys = data.rss.channel[0].item;
    const htmlBuoys = Build.createAllBuoysHtml(links, buoys);
    $("#allBuoys").html(htmlBuoys);
  },

  appendFavBuoys: function(buoys) {
    const htmlBuoys = Build.createFavBuoysHtml(buoys);
    $("#favBuoys").html(htmlBuoys);
  },

};
