const Engine = require('./engine');
const Build = require('./build');

module.exports = {

  showAllBuoys: function() {
    const distance = ($("#distance").val() || 100);
    const location = ($("#location").val() || "40N73W");
    Build.show($("#allBuoys"));
    Build.hide($("#favBuoys"));

    let links = {};
    Engine.getFavBuoys().done((data) => {
      data.forEach((buoy) => {
        links[buoy.link] = true;
      });
    });

    Engine.getAllBuoys(distance, location).done((data) => {
      const buoys = data.rss.channel[0].item;
      const htmlBuoys = Build.createAllBuoysHtml(links, buoys, distance, location);
      $("#allBuoys").html(htmlBuoys);
      $("#location").val(location);
    });

  },

  showFavBuoys: function() {
    Build.show($("#favBuoys"));
    Build.hide($("#allBuoys"));

    Engine.getFavBuoys().done((data) => {
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
      Engine.getBuoyData(button).done((data) => {
        const details = data.rss.channel[0].item[0].description;
        Build.appendDataAfterFavoriteBuoy(button, details);
      });
    } else {
      $(button).addClass("closed");
      Build.removeDataFromFavoriteBuoy(button);
    }
  },

};
