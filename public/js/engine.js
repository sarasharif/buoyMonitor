module.exports = {

  getAllBuoys: function (links, callback) {
    $.get({
      url: "/api/allBuoys",
      success: function(data) {
        callback(links, data);
      },
    });
  },

  getFavBuoys: function (callback) {
    $.ajax({
      url: "/api/favBuoys",
      success: function (data) {
        callback(data);
      }
    });
  },

  getFavLinks: function () {
    let links = {};
    $.ajax({
      url: "/api/favBuoys",
      success: function(buoys) {
        buoys.forEach(function (buoy) {
          links[buoy.link] = true;
        });
      }
    });
    return links;
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

  getBuoyData: function (button, callback) {
    $.ajax({
      url: "/api/buoyStats/",
      data: {'link': button.dataset.link},
      success: function (data) {
        const details = data.rss.channel[0].item[0].description;
        callback(button, details);
      }
    });
  },

};
