var express = require( 'express' );
var app = express();
var db = require( './models' );
var bodyParser = require( 'body-parser' );

app.use( bodyParser.urlencoded ( { extended : true } ) );

var userRoute = require( './routes/user_routes' );
var galleryRoute = require( './routes/gallery_routes.js' );

app.use(express.static('public'));
app.use( '/users', userRoute );
app.use( '/gallery', galleryRoute );

app.set('view engine', 'jade');
app.set('views', './templates');

app.listen( 7766, function () {
  db.sequelize.sync();
});