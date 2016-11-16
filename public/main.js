$(document).ready(function(){
  showAllBuoys();

  $("button#showAll").click(function() {
    showAllBuoys();
  });

  $("button#showFavs").click(function() {
    showFavBuoys();
  });
});

function showAllBuoys() {
  $(".allBuoys").removeClass("hidden").html('<h1>....loading buoys within radius...</h1>');
  $(".favBuoys").addClass("hidden");
  const links = getFavLinks();
  getAllBuoys(links);
}

function showFavBuoys() {
  $(".favBuoys").removeClass("hidden").html('<h1>....loading your favorite buoys....</h1>');
  $(".allBuoys").addClass("hidden");
  getFavBuoys();
}

function getAllBuoys(links) {
  $.get("/api/allBuoys", function (data) {
    setupAllBuoys(links, data.rss.channel[0].item);
  });
}

function getFavBuoys() {
  $.get("/api/favBuoys", function (data) {
    setupFavBuoys(data);
  });
}

function getFavLinks() {
  links = [];
  $.get("/api/favBuoys", function( buoys ) {
    buoys.forEach(function ( buoy ) {
      links.push(buoy.link);
    });
  });
  return links;
}

function setupAllBuoys(links, buoys) {
  const htmlBuoys = createAllBuoysHtml(links, buoys);
  $(".allBuoys").html(htmlBuoys);
  setupFavoriteToggle($(".favtoggle").toArray());
}

function createAllBuoysHtml(links, buoys) {
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
    return htmlBuoys += '</div>'
  }
}

function setupFavBuoys(buoys) {
  const htmlBuoys = createFavBuoysHtml(buoys);
  $(".favBuoys").html(htmlBuoys);
  setupFavoriteToggle($(".favtoggle").toArray());  
  setupDetailsToggle($(".data-toggle").toArray());
}

function createFavBuoysHtml(buoys) {
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
}

function setupFavoriteToggle(buttons) {
  buttons.forEach(function(button) {
    button.onclick = function() {
      toggleFavorite(button);
    };
  });
}

function toggleFavorite(button) {
  if (button.classList.contains("favorite")) {
    unfavorite(button);
  } else {
    favorite(button);
  }
}
function favorite(button) {
  $(button).addClass("favorite");
  createFavBuoy(button);
}

function unfavorite(button) {
  $(button).removeClass("favorite");
  deleteFavBuoy(button);
}

function setupDetailsToggle(buttons) {
  buttons.forEach(function(button) {
    button.onclick = function() {
      toggleBuoyData(button);
    };
  });
}

function toggleBuoyData(button) {
  if (button.classList.contains("closed")) {
    $(button).removeClass("closed");
    getBuoyData(button);
  } else {
    $(button).addClass("closed");
    removeDataFromFavoriteBuoy(button);
  }
}

function appendDataAfterFavoriteBuoy(button, data) {
  $(button).parent().after('<div>'+data[0]+'</div>');
}

function removeDataFromFavoriteBuoy(button){
  $(button).parent().next().remove();
}

function createFavBuoy(button) {
  $.ajax({
    url: "/api/favBuoys/",
    method: 'POST',
    data: {'link': button.dataset.link, 'title': button.dataset.title},
  });
}

function deleteFavBuoy(button) {
  $.ajax({
    method: 'DELETE',
    data: {'link': button.dataset.link},
    url: "/api/favBuoys/",
  });
}

function getBuoyData(button) {
  $.get({
    url: "/api/buoyStats/",
    data: {'link': button.dataset.link},
    success: function (data) {
      const details = data.rss.channel[0].item[0].description;
      appendDataAfterFavoriteBuoy(button, details);
    }
  });
}
