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
