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
