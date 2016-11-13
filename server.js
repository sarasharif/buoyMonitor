const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://Sara:buoys@jello.modulusmongo.net:27017/O3nuzahu');
const Buoy = mongoose.model('Buoy', {
  link : String,
  title : String,
});

app.use(express.static(__dirname + '/public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const buoyUrl = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100';

router.get('/allBuoys', (req, res) => {
  request(buoyUrl, function(err, response, xml) {
    parseString(xml, function (err, buoys) {
      res.json(buoys);
    });
  });
});

router.post('/favBuoys', (req, res) => {
  Buoy.create({
    link : req.body.link.toString(),
    title : req.body.title.toString()
  }, function(err, buoy) {
    Buoy.find(function(err, buoys) {
      if (err) { res.send(err); }
      res.json(buoys);
    });
  });
});

router.get('/favBuoys', (req, res) => {
  res.send("datum!");
});

app.use('/api', router);
app.listen(process.env.PORT||8000);