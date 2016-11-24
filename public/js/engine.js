module.exports = {

  getAllBuoys: function (distance) {
    return $.get({
      url: "/api/allBuoys",
      data: {distance: distance},
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
