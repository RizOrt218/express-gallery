var express = require( 'express' );
var app = express();
var db = require( './models' );
var methodOverride = require('method-override');
var bodyParser = require( 'body-parser' );
var methodOverride = require('method-override');


app.use( bodyParser.urlencoded ( { extended : true } ) );

app.use(methodOverride(function(req,res){
  var method = req.body._method;
  delete req.body._method;
  return method;
}));

var userRoute = require( './routes/user_routes' );
var galleryRoute = require( './routes/gallery_routes.js' );
var landingPage = require( './routes/landing_page.js' );

app.use(express.static('public'));
app.use( '/users', userRoute );
app.use( '/gallery', galleryRoute );
app.use( '/home', landingPage );

app.set('view engine', 'jade');
app.set('views', './templates');

app.listen( 7766, function () {
  db.sequelize.sync();
});