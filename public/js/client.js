const Engine = require('./engine');
const Build = require('./build');

module.exports = {

  showAllBuoys: function() {
    Build.show($("#allBuoys"));
    Build.hide($("#favBuoys"));

    let links = {};
    Engine.getFavBuoys().done(function(data) {
      data.forEach(function(buoy) {
        links[buoy.link] = true;
      });
    });

    Engine.getAllBuoys().done(function(data) {
      const buoys = data.rss.channel[0].item;
      const htmlBuoys = Build.createAllBuoysHtml(links, buoys);
      $("#allBuoys").html(htmlBuoys);
    });
  },

  showFavBuoys: function() {
    Build.show($("#favBuoys"));
    Build.hide($("#allBuoys"));

    Engine.getFavBuoys().done(function(data) {
      const htmlBuoys = Build.createFavBuoysHtml(data);
      $("#favBuoys").html(htmlBuoys);
    });
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
      Engine.getBuoyData(button).done(function(data) {
        const details = data.rss.channel[0].item[0].description;
        Build.appendDataAfterFavoriteBuoy(button, details);
      });
    } else {
      $(button).addClass("closed");
      Build.removeDataFromFavoriteBuoy(button);
    }
  },

};
