(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {

  CITIES: function() {
    return [
      { name: "New York City", coords: "40N73W" },
      { name: "Miami", coords: "26N80W" },
      { name: "Houston", coords: "30N95W" },
      { name: "Los Angeles", coords: "34N118W" },
      // add cities and their geographical coordinates below:
      // { name: "placeholder", coords: "placeholder" },
    ];
  },

  show: function(element) {
    element.removeClass("hidden").html('<h1>...loading...</h1>');
  },

  hide: function(element) {
    element.addClass("hidden");
  },

  searchBar: function(distance, location) {
    const distanceInput = `<input id="distance" type="number" min="10" max="300" value="${distance}">`;
    const cityOptions = this.CITIES().map(city => (
      `<option value="${city.coords}">${city.name}</option>`
    ));
    const cityInput = `<select id="location">${cityOptions.join()}</select>`;
    return `<form>
              Buoys within ${distanceInput} miles of ${cityInput}
              <input type="submit" value="🔎" id="search">
            </form>`;
  },

  allBuoys: function(favorites, buoys) {
    if (buoys === undefined) {
      return '<h2>...there are no buoys here...</h2>';
    }
    let html = '<div class="wrapper">';

    for (let buoy of buoys) {
      if (buoy.title[0].toUpperCase() === "SHIP") {
        continue;
      } else if (favorites[buoy.link[0]]) {
        html += `<div class="buoy">
                   <span>${buoy.title}</span>
                   <button class="fav-toggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                 </div>`;
      } else {
        html += `<div class="buoy">
                   <span>${buoy.title}</span>
                   <button class="fav-toggle" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                 </div>`;
      }
    }
    return html += '</div>';
  },

  favBuoys: function(buoys) {
    let html = '<h1>Favorite Buoys</h1>';
    if (buoys.length === 0) html += `<h2>...you have no favorite buoys...</h2>`;
    html += '<div class="wrapper">';
    for (let buoy of buoys) {
      html += `<div class="buoy">
                 <button class="fav-toggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                 <span>${buoy.title}</span>
                 <button class="data-toggle closed" data-link='${buoy.link}'>+</button>
               </div>`;
    }
    return html += '</div>';
  },

  showReadings: function(button, data) {
    const $element = $(button);
    $element.text("-");
    $element.parent().next().remove(".buoyData");
    $element.parent().after(`<div class="buoyData">${data[0]}</div>`);
  },

  hideReadings: function(button) {
    const $element = $(button);
    $element.text("+");
    $element.parent().next().remove(".buoyData");
  },
};

},{}],2:[function(require,module,exports){
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

  toggleBuoyData: function() {
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

},{"./build":1,"./engine":3}],3:[function(require,module,exports){
module.exports = {

  getAllBuoys: function (distance, location) {
    return $.get({
      url: "/api/allBuoys",
      data: { distance, location },
    });
  },

  getFavBuoys: function () {
    return $.get({
      url: "/api/favBuoys",
    });
  },

  createFavBuoy: function (button) {
    const link = button.dataset.link;
    const title = button.dataset.title;
    $.ajax({
      url: "/api/favBuoys/",
      method: 'POST',
      data: { link, title },
    });
  },

  deleteFavBuoy: function (button) {
    const link = button.dataset.link;
    $.ajax({
      method: 'DELETE',
      url: "/api/favBuoys/",
      data: { link },
    });
  },

  getBuoyData: function (button) {
    const link = button.dataset.link;
    return $.ajax({
      url: "/api/buoyStats/",
      data: { link },
    });
  },

};

},{}],4:[function(require,module,exports){
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

},{"./client":2}]},{},[4]);
