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
  getAllBuoys();
}

function showFavBuoys() {
  $(".favBuoys").removeClass("hidden").html('<h1>....loading your favorite buoys....</h1>');
  $(".allBuoys").addClass("hidden");
  getFavBuoys();
}

function getAllBuoys() {
  $.get("/api/allBuoys", function (data) {
    setupAllBuoys(data.rss.channel[0].item);
  });
}

function getFavBuoys() {
  $.get("/api/favBuoys", function (data) {
    console.log(data);
  });
}

function setupAllBuoys(buoys) {
  const htmlBuoys = createAllBuoysHtml(buoys);
  $(".allBuoys").html(htmlBuoys);
}

function createAllBuoysHtml(buoys) {
  let htmlBuoys = '<h1>Buoys within 100 miles of NYC</h1>';
  if (buoys.length === 0) {
    return htmlBuoys += '<h2>...there are no buoys in this search radius...</h2>';
  } else {
    htmlBuoys += '<div class="wrapper">';
    buoys.forEach(function(buoy) {
      if (buoy.title[0].toUpperCase() === "SHIP") {
        return;
      } else {
        htmlBuoys += `<div class="buoy">
                        <span>${buoy.title}</span>
                      </div>`;
      }
    });
    return htmlBuoys += '</div>'
  }
}
