var express = require( 'express' );
var app = express();
var db = require( './models' );
var methodOverride = require('method-override');
var bodyParser = require( 'body-parser' );

app.use( bodyParser.urlencoded ( { extended : true } ) );

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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