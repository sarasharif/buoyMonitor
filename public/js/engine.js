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
