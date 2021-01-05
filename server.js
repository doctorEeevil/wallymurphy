// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.render('pages/index', {sectionName: 'home'});
});

/* old words page
app.get('/words', function(req, res) {
  res.render('pages/words');
});
*/

// words, contact, and statement pages
app.get('/:sectionName', function(req, res) { 
  var pathToTemplate = 'pages/' + req.params.sectionName;
  res.render(pathToTemplate, req.params);
});

// cards, and sketches pages
app.get('/sketches/:sketchId', function(req, res) {
  var pathToTemplate = 'pages/sketch';
  res.render(pathToTemplate, req.params);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`${PORT} is the magic port`);
