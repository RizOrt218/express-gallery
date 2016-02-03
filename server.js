var express = require( 'express' );
var app = express();
var db = require( './models' );
var methodOverride = require('method-override');
var bodyParser = require( 'body-parser' );
var methodOverride = require('method-override');

var passport = require( 'passport' );
var session = require( 'express-session' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var CONFIG = require( './config/config' );


app.use( bodyParser.urlencoded ( { extended : true } ) );

app.use( session( CONFIG.SESSION ) );

app.use( passport.initialize() );

app.use( passport.session() );

passport.serializeUser( function ( user, done ) {
  return done( null, user );
});

passport.deserializeUser( function ( user, done ) {
  return done( null, user );
});

var isAuthenticated = false;

passport.use( new LocalStrategy(
  function ( username, password, done ) {
    db.User.findOne({
      where : {
        username : username
      }
  })
    .then(function ( user, err ) {
      if( err ) {
        throw err;
      }
      else if( user ) {
        return done( null, user);
      }
      else {
        return done( null, false );
      }
    });
  }
));

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
// app.use( '/', userRoute );

app.set('view engine', 'jade');
app.set('views', './templates');

app.listen( 7766, function () {
  db.sequelize.sync();
});