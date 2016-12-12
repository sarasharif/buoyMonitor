module.exports = {

  CITIES: function() {
    return [
      { name: "New York City", coords: "40N73W" },
      { name: "Miami", coords: "26N80W" },
      { name: "Houston", coords: "30N95W" },
      { name: "Los Angeles", coords: "34N118W" },
    ];
  },


  show: function(element) {
    element.removeClass("hidden").html('<h1>...loading...</h1>');
  },

  hide: function(element) {
    element.addClass("hidden");
  },

  searchBar: function(distance, location) {
    const distanceInput = `<input id="distance" type="number" min="10" max="300"
                                                  value="${distance}"></input>`;
    const cityOptions = this.CITIES().map((city) =>
                `<option value="${city.coords}">${city.name}</option>`);
    const cityInput = `<select id="location">${cityOptions.join()}</select>`;
    return `<h1> Buoys within ${distanceInput} miles of ${cityInput}
              <button id="search">🔎</button>
            </h1>`;
  },

  allBuoys: function(favorites, buoys) {
    if (buoys === undefined) '<h2>...there are no buoys here...</h2>';
    let html = '<div class="wrapper">';

    for (let buoy of buoys) {
      if (buoy.title[0].toUpperCase() === "SHIP") {
        continue;
      } else if (favorites[buoy.link[0]]) {
        html += `<div class="buoy">
                   <span>${buoy.title}</span>
                   <button class="fav-toggle favorite" data-link='${buoy.link}'
                                          data-title='${buoy.title}'>♥</button>
                 </div>`;
      } else {
        html += `<div class="buoy">
                   <span>${buoy.title}</span>
                   <button class="fav-toggle" data-link='${buoy.link}'
                                          data-title='${buoy.title}'>♥</button>
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
                 <button class="fav-toggle favorite" data-link='${buoy.link}'
                                          data-title='${buoy.title}'>♥</button>
                 <span>${buoy.title}</span>
                 <button class="data-toggle closed"
                                            data-link='${buoy.link}'>+</button>
               </div>`;
    }
    return html += '</div>';
  },

  showReadings: function(button, data) {
    const element = $(button);
    element.text("-");
    element.parent().next().remove(".buoyData");
    element.parent().after(`<div class="buoyData">${data[0]}</div>`);
  },

  hideReadings: function(button){
    const element = $(button);
    element.text("+");
    element.parent().next().remove(".buoyData");
  },
};
