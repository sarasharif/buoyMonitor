module.exports = {

  getAllBuoys: function (distance, location) {
    return $.get({
      url: "/api/allBuoys",
      data: { distance: distance, location: location },
    });
  },

  getFavBuoys: function () {
    return $.get({
      url: "/api/favBuoys",
    });
  },

  createFavBuoy: function (button) {
    $.ajax({
      url: "/api/favBuoys/",
      method: 'POST',
      data: {
              'link': button.dataset.link,
              'title': button.dataset.title
            },
    });
  },

  deleteFavBuoy: function (button) {
    $.ajax({
      method: 'DELETE',
      url: "/api/favBuoys/",
      data: { 'link': button.dataset.link },
    });
  },

  getBuoyData: function (button) {
    return $.ajax({
      url: "/api/buoyStats/",
      data: { 'link': button.dataset.link },
    });
  },

};
