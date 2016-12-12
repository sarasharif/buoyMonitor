const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var exports = module.exports = {};

const mongodbUri = 'mongodb://sara:buoys@jello.modulusmongo.net:27017/Exosi6so'
const mongodbOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };

// handle timeout errors
mongoose.connect(mongodbUri, mongodbOptions);
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

const Buoy = mongoose.model('Buoy', {
  link : String,
  title : String,
});

app.use(express.static(__dirname + '/public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/allBuoys', (req, res) => {
  const dist = req.query.distance;
  const lat = req.query.location.slice(0,3);
  const lon = req.query.location.slice(3);
  const buoyUrl = `http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=${lat}&lon=${lon}&radius=${dist}`;
  request(buoyUrl, function(err, response, xml) {
    parseString(xml, function (err, buoys) {
      if (err) { res.next(err); }
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
      if (err) { res.next(err); }
      res.json(buoys);
    });
  });
});

router.get('/favBuoys', (req, res) => {
  Buoy.find(function(err, buoys) {
    if (err) { res.next(err); }
    res.json(buoys);
  });
});

router.delete('/favbuoys', (req, res) => {
  Buoy.remove({
    link : req.body.link.toString()
  }, function(err, buoy) {
    Buoy.find(function(err, buoys) {
      if (err) { res.next(err); }
      res.json(buoys);
    });
  });
});

router.get('/buoyStats', (req, res) => {
  const station_id = req.query.link.slice(-5);
  const url = `http://www.ndbc.noaa.gov/data/latest_obs/${station_id}.rss`
  request(url, function(err, response, xml) {
    parseString(xml, function (err, buoy) {
      if (err) { res.next(err); }
      res.json(buoy);
    });
  });
});

app.use('/api', router);
var server = app.listen(process.env.PORT||8000, function() {
  console.log("point browser to localhost:8000");
});

exports.closeServer = function(){
  server.close();
};
