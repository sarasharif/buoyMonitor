const express = require('express');
const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get('/allBuoys', (req, res) => {
  res.send("data!");
});

router.get('/favBuoys', (req, res) => {
  res.send("datum!");
});

app.use('/api', router);
app.listen(process.env.PORT||8000);