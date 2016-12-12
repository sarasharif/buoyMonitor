module.exports = {

  cities: function() {
    return [
      {
        label: "New York City",
        coords: "40N73W"
      },
      {
        label: "Miami",
        coords: "26N80W"
      },
      {
        label: "Houston",
        coords: "30N95W"
      },
      {
        label: "Los Angeles",
        coords: "34N118W"
      },
    ];
  },

  show: function(element) {
    element.removeClass("hidden").html('<h1>...loading...</h1>');
  },

  hide: function(element) {
    element.addClass("hidden");
  },

  searchBar: function(distance, location) {
    const distanceInput = `<input id="distance" type="number" min="10" max="300" value="${distance}"></input>`;
    const cityOptions = this.cities().map((city) => `<option value="${city.coords}">${city.label}</option>`);
    const cityInput = `<select id="location">${cityOptions.join()}</select>`;
    return `<h1>Buoys within ${distanceInput} miles of ${cityInput}<button id="search">🔎</button></h1>`;
  },

  allBuoysHtml: function(links, buoys) {
    let htmlBuoys = '';
    if (buoys === undefined) {
      return htmlBuoys += '<h2>...there are no buoys in this search radius...</h2>';
    } else {
      htmlBuoys += '<div class="wrapper">';
      buoys.forEach((buoy) => {
        if (buoy.title[0].toUpperCase() === "SHIP") {
          htmlBuoys += "";
        } else if (links[buoy.link[0]]) {
          htmlBuoys += `<div class="buoy">
                          <span>${buoy.title}</span>
                          <button class="fav-toggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        </div>`;
        } else {
          htmlBuoys += `<div class="buoy">
                          <span>${buoy.title}</span>
                          <button class="fav-toggle" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
                        </div>`;
        }
      });
      return htmlBuoys += '</div>';
    }
  },

  favBuoysHtml: function(buoys) {
    let htmlBuoys = '<h1>Favorite Buoys</h1>';
    if (buoys.length === 0) {
      return htmlBuoys += '<h2>... you don\'t have any favorite buoys ...</h2>';
    } else {
      htmlBuoys += '<div class="wrapper">';
      buoys.forEach((buoy) => {
        htmlBuoys += `<div class="buoy">
                        <button class="fav-toggle favorite" data-link='${buoy.link}' data-title='${buoy.title}'>♥</button>
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
    element.parent().after(`<div class="buoyData">${data[0]}</div>`);
  },

  removeDataFromFavoriteBuoy: function(button){
    const element = $(button);
    element.text("+");
    element.parent().next().remove(".buoyData");
  },
};
