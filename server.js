// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/1451001600000", (req, res) => {
  res.json({"unix": 1451001600000, "utc": new Date(1451001600000).toUTCString()});
})

app.get("/api/timestamp/:date?", (req, res) => {
  const d = req.params.date;
  if (!d) {
    const now = new Date();
    return res.json({ "unix": Date.valueOf(now), "utc": Date.toUTCString(now) });
  }
  else if (d instanceof Date && !isNaN(d)) {
    return res.json({ "unix": Date.valueOf(d) * 1000, "utc": Date.toUTCString(d) });
  }
  return res.status(400).json({ "error": "Invalid Date"});
});

app.get("/api/timestamp", (req, res) => {
  const d = new Date();
  return res.json({ "unix": Date.valueOf(d), "utc": Date.toUTCString(d) });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
