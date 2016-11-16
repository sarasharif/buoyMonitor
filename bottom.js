const Engine = require('./engine');
const Appender = require('./appender');

module.exports = {

  toggleFavorite: function(button) {
    // if (button.classList.contains("favorite")) {
    //   unfavorite(button);
    // } else {
    //   favorite(button);
    // }
  },

  setupFavoriteToggle: function(buttons) {
    buttons.forEach(function(button) {
      button.onclick = function() {
        // toggleFavorite(button);
        if (button.classList.contains("favorite")) {
          // unfavorite(button);
          $(button).removeClass("favorite");
          Engine.deleteFavBuoy(button);
        } else {
          // favorite(button);
          $(button).addClass("favorite");
          Engine.createFavBuoy(button);
        }
      };
    });
  },


  setupDetailsToggle: function(buttons, callback) {
    buttons.forEach(function(button) {
      button.onclick = function() {
        callback(button);
      };
    });
  },

  favorite: function(button) {
    // $(button).addClass("favorite");
    // Engine.createFavBuoy(button);
  },

  unfavorite: function(button) {
    // $(button).removeClass("favorite");
    // Engine.deleteFavBuoy(button);
  },

  toggleBuoyData: function(button) {
    if (button.classList.contains("closed")) {
      $(button).removeClass("closed");
      Engine.getBuoyData(button, Appender.appendDataAfterFavoriteBuoy);
    } else {
      $(button).addClass("closed");
      Appender.removeDataFromFavoriteBuoy(button);
    }
  },
}
