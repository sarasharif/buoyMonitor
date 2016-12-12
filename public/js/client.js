const Engine = require('./engine');
const Build = require('./build');

module.exports = {

  showAllBuoys: function() {
    const distance = ($("#distance").val() || 100);
    const location = ($("#location").val() || "40N73W");
    Build.show($("#allBuoys"));
    Build.hide($("#favBuoys"));

    let favorites = {};
    Engine.getFavBuoys().done((data) => {
      for (let buoy of data) {
        favorites[buoy.link] = true;
      }
    });

    Engine.getAllBuoys(distance, location).done((data) => {
      const buoys = data.rss.channel[0].item;
      const searchBar = Build.searchBar(distance, location);
      const htmlBuoys = Build.allBuoys(favorites, buoys);
      $("#allBuoys").html(searchBar + htmlBuoys);
      $("#location").val(location);
    });

  },

  showFavBuoys: function() {
    Build.show($("#favBuoys"));
    Build.hide($("#allBuoys"));

    Engine.getFavBuoys().done((data) => {
      const htmlBuoys = Build.favBuoys(data);
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

  toggleBuoyData: function(e) {
    const button = event.target;
    if (button.classList.contains("closed")) {
      $(button).removeClass("closed");
      Engine.getBuoyData(button).done((data) => {
        const readings = data.rss.channel[0].item[0].description;
        Build.showReadings(button, readings);
      });
    } else {
      $(button).addClass("closed");
      Build.hideReadings(button);
    }
  },

};
