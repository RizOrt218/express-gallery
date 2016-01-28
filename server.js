var express = require( 'express' );
var app = express();
var db = require( './models' );
var bodyParser = require( 'body-parser' );

// var Gallery = db.Gallery;
app.use( bodyParser.urlencoded ( { extended : true } ) );

var userRoute = require( './routes/user_routes' );
// var galleryRoute = require( './routes/gallery_routes.js' );

app.use( '/users', userRoute );
// app.use( '/gallery', galleryRoute );

app.listen( 7766, function () {
  db.sequelize.sync();
});