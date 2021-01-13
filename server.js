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

// cards list object
var pcList = "PC1 PC2 PC3 PC4 PC5 PC6".split(" ");
var tcList = "TC1 TC2 TC3 TC4 TC5 TC6".split(" ");

// card detail page
app.get('/cards/:cardId', function(req, res) {
  var pathToTemplate = 'pages/card';
  console.log(req.params);
  var params = {pcList, tcList};
  params.sectionName = 'cards';
  params.cardId = req.params.cardId;
  res.render(pathToTemplate, params);
});

// words, contact, cards, and statement pages
app.get('/:sectionName', function(req, res) { 
  var pathToTemplate = 'pages/' + req.params.sectionName;
  var params = {pcList, tcList};
  params.sectionName = req.params.sectionName;
  res.render(pathToTemplate, params);
});

// sketches pages
app.get('/sketches/:sketchId', function(req, res) {
  var pathToTemplate = 'pages/sketch';
  res.render(pathToTemplate, req.params);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`${PORT} is the magic port`);
