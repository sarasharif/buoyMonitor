const Engine = require('./engine');
const Bottom = require('./bottom');
const Appender = require('./appender');

module.exports = {

  showAllBuoys: function() {
    $(".allBuoys").removeClass("hidden").html('<h1>....loading buoys within radius...</h1>');
    $(".favBuoys").addClass("hidden");
    const links = Engine.getFavLinks();
    Engine.getAllBuoys(links, this.setupAllBuoys);
  },

  showFavBuoys: function() {
    $(".favBuoys").removeClass("hidden").html('<h1>....loading your favorite buoys....</h1>');
    $(".allBuoys").addClass("hidden");
    Engine.getFavBuoys(this.setupFavBuoys);
  },

  setupAllBuoys: function(links, rssdata) {
    const buoys = rssdata.rss.channel[0].item;
    const htmlBuoys = Appender.createAllBuoysHtml(links, buoys);
    $(".allBuoys").html(htmlBuoys);
    const favorites = $(".favtoggle").toArray();
    Bottom.setupFavoriteToggle(favorites);
  },

  setupFavBuoys: function(buoys) {
    const htmlBuoys = Appender.createFavBuoysHtml(buoys);
    $(".favBuoys").html(htmlBuoys);
    const favorites = $(".favtoggle").toArray();
    Bottom.setupFavoriteToggle(favorites);
    const buttons = $(".data-toggle").toArray();
    Bottom.setupDetailsToggle(buttons, Bottom.toggleBuoyData);
  },

};
