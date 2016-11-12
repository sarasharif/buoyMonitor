const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');
const parseString = require('xml2js').parseString;

app.use(express.static(__dirname + '/public'));

const buoyUrl = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100';

router.get('/allBuoys', (req, res) => {
  request(buoyUrl, function(err, response, xml) {
    parseString(xml, function (err, buoys) {
      res.json(buoys);
    });
  });
});

router.get('/favBuoys', (req, res) => {
  res.send("datum!");
});

app.use('/api', router);
app.listen(process.env.PORT||8000);