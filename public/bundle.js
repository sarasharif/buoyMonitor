(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {

  createAllBuoysHtml: function(links, buoys) {
    let htmlBuoys = '<h1>Buoys within 100 miles of NYC</h1>';
    if (buoys.length === 0) {
      return htmlBuoys += '<h2>...there are no buoys in this search radius...</h2>';
    } else {
      htmlBuoys += '<div class="wrapper">';
      buoys.forEach(function(buoy) {
        if (buoy.title[0].toUpperCase() === "SHIP") {
          htmlBuoys += "";
        } else if (links.includes(buoy.link[0])) {
          htmlBuoys += `<div class="buoy">
                          <span>${buoy.title}</span>
                          <button class="favtoggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        </div>`;
        } else {
          htmlBuoys += `<div class="buoy">
                          <span>${buoy.title}</span>
                          <button class="favtoggle" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        </div>`;
        }
      });
      return htmlBuoys += '</div>';
    }
  },

  createFavBuoysHtml: function(buoys) {
    let htmlBuoys = '<h1>Favorite Buoys</h1>';
    if (buoys.length === 0) {
      return htmlBuoys += '<h2>... you don\'t have any favorite buoys ...</h2>';
    } else {
      htmlBuoys += '<div class="wrapper">';
      buoys.forEach( function(buoy) {
        htmlBuoys += `<div class="buoy">
                        <button class="favtoggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        <span>${buoy.title}</span>
                        <button class="data-toggle closed" data-link='${buoy.link}'>+</button>
                      </div>`;
      });
      return htmlBuoys += '</div>'
    }
  },

  appendDataAfterFavoriteBuoy: function(button, data) {
    $(button).parent().after('<div>'+data[0]+'</div>');
  },

  removeDataFromFavoriteBuoy: function(button){
    $(button).parent().next().remove();
  },
};

},{}],2:[function(require,module,exports){
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

},{"./appender":1,"./engine":4}],3:[function(require,module,exports){
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

},{"./appender":1,"./bottom":2,"./engine":4}],4:[function(require,module,exports){
module.exports = {

  deleteFavBuoy: function (button) {
    $.ajax({
      method: 'DELETE',
      data: {'link': button.dataset.link},
      url: "/api/favBuoys/",
    });
  },

  getBuoyData: function (button, callback) {
    $.get({
      url: "/api/buoyStats/",
      data: {'link': button.dataset.link},
      success: function (data) {
        const details = data.rss.channel[0].item[0].description;
        callback(button, details);
      }
    });
  },

  createFavBuoy: function (button) {
    $.ajax({
      url: "/api/favBuoys/",
      method: 'POST',
      data: {'link': button.dataset.link, 'title': button.dataset.title},
    });
  },

  getAllBuoys: function (links, callback) {
    $.get({
      url: "/api/allBuoys",
      success: function(data) {
        callback(links, data);
      },
    });
  },

  getFavBuoys: function (callback) {
    $.get({
      url: "/api/favBuoys",
      success: function (data) {
       callback(data);
      }
    });
  },

  getFavLinks: function () {
    links = [];
    $.get("/api/favBuoys", function( buoys ) {
      buoys.forEach(function ( buoy ) {
        links.push(buoy.link);
      });
    });
    return links;
  }
};

},{}],5:[function(require,module,exports){
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

},{"../client":3}]},{},[5]);
