// load the things we need
var express = require('express');
var app = express();

function redir(fromPath, toURL, status=307) {
  app.use(fromPath,
          (req, res) => {res.redirect(status, toURL)});
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// We put the redirects first so they get handled before typical processing
redir('/cards',
      "https://www.etsy.com/shop/WallyMurphyArt?section_id=33884753");
redir('/contact',
      "https://www.etsy.com/messages/new?with_id=441040200&referring_id=27746557&referring_type=shop&recipient_id=441040200");

// serve all urls like /WHAT/EVER from file paths like public/WHAT/EVER
app.use(express.static('public'));

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {sectionName: 'home'});
});

// cards and sketches list objects
var pcList = "PC1 PC2 PC3 PC4 PC5 PC6".split(" ");
var tcList = "TC1 TC2 TC3 TC4 TC5 TC6".split(" ");
var sketchList = ("a16b a17a a17b a18a a19a a2b a3a " +
		  "a6b a7a b10a b10b b11a b11b b12a b12b " +
		  "b13a b13b b14a b14b b15a b15b b16a " +
		  "b16b b17a b17b b18b b19a b19b b1b b20a " +
		  "b20b b21a b23a b2b b3a b3b b4a b4b b4c b5a " +
		  "b5c b6a b6b b7b b9a b9b").split(" ");

// card detail page
app.get('/cards/:cardId', function(req, res) {
  var pathToTemplate = 'pages/card';
  console.log(req.params);
  var params = {pcList, tcList};
  params.sectionName = 'cards';
  params.cardId = req.params.cardId;
  res.render(pathToTemplate, params);
});

// sketch details page
app.get('/sketches/:sketchId', function(req, res) {
  var pathToTemplate = 'pages/sketch';
  var params = req.params;
  params.sectionName = 'sketches';
  params.sketchId = req.params.sketchId;
  res.render(pathToTemplate, params);
});

// words, contact, cards, sketches and statement pages
app.get('/:sectionName', function(req, res) {
  var pathToTemplate = 'pages/' + req.params.sectionName;
  var params = {pcList, tcList, sketchList};
  params.sectionName = req.params.sectionName;
  res.render(pathToTemplate, params);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`${PORT} is the magic port`);
