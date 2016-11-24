(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {

  show: function(element) {
    element.removeClass("hidden").html('<h1>...loading...</h1>');
  },

  hide: function(element) {
    element.addClass("hidden");
  },

  createAllBuoysHtml: function(links, buoys) {
    let htmlBuoys = '<h1>Buoys within 100 miles of NYC</h1>';
    if (buoys.length === 0) {
      return htmlBuoys += '<h2>...there are no buoys in this search radius...</h2>';
    } else {
      htmlBuoys += '<div class="wrapper">';
      buoys.forEach((buoy) => {
        if (buoy.title[0].toUpperCase() === "SHIP") {
          htmlBuoys += "";
        } else if (links[buoy.link[0]]) {
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
      buoys.forEach((buoy) => {
        htmlBuoys += `<div class="buoy">
                        <button class="favtoggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        <span>${buoy.title}</span>
                        <button class="data-toggle closed" data-link='${buoy.link}'>+</button>
                      </div>`;
      });
      return htmlBuoys += '</div>';
    }
  },

  appendDataAfterFavoriteBuoy: function(button, data) {
    const element = $(button);
    element.text("-");
    element.parent().next().remove(".buoyData");
    element.parent().after('<div class="buoyData">'+data[0]+'</div>');
  },

  removeDataFromFavoriteBuoy: function(button){
    const element = $(button);
    element.text("+");
    element.parent().next().remove(".buoyData");
  },
};

},{}],2:[function(require,module,exports){
const Engine = require('./engine');
const Build = require('./build');

module.exports = {

  showAllBuoys: function() {
    Build.show($("#allBuoys"));
    Build.hide($("#favBuoys"));

    let links = {};
    Engine.getFavBuoys().done((data) => {
      data.forEach((buoy) => {
        links[buoy.link] = true;
      });
    });

    Engine.getAllBuoys().done((data) => {
      const buoys = data.rss.channel[0].item;
      const htmlBuoys = Build.createAllBuoysHtml(links, buoys);
      $("#allBuoys").html(htmlBuoys);
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

},{"./build":1,"./engine":3}],3:[function(require,module,exports){
module.exports = {

  getAllBuoys: function () {
    return $.get({
      url: "/api/allBuoys",
    });
  },

  getFavBuoys: function () {
    return $.ajax({
      url: "/api/favBuoys",
    });
  },

  createFavBuoy: function (button) {
    $.ajax({
      url: "/api/favBuoys/",
      method: 'POST',
      data: {'link': button.dataset.link, 'title': button.dataset.title},
    });
  },

  deleteFavBuoy: function (button) {
    $.ajax({
      method: 'DELETE',
      data: {'link': button.dataset.link},
      url: "/api/favBuoys/",
    });
  },

  getBuoyData: function (button) {
    return $.ajax({
      url: "/api/buoyStats/",
      data: {'link': button.dataset.link},
    });
  },

};

},{}],4:[function(require,module,exports){
const Client = require('./client');

$(document).ready( () => {
  Client.showAllBuoys();

  $("#showAll").click( () =>  {
    Client.showAllBuoys();
  });

  $("#showFavs").click( () =>  {
    Client.showFavBuoys();
  });

  $("#allBuoys").on("click", ".favtoggle", () =>  {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".favtoggle", () =>  {
    Client.toggleFavorite();
  });

  $("#favBuoys").on("click", ".data-toggle", () =>  {
    Client.toggleBuoyData();
  });

});

},{"./client":2}]},{},[4]);
