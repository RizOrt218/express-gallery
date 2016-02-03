var express   = require( 'express' );
var router    = express.Router();

var db        = require( './../models' );
var User      = db.User;

var bodyParser= require( 'body-parser' );

var passport  = require( 'passport' );
var CONFIG    = require( '../config/config' );


router.use( bodyParser.urlencoded ( { extended : true } ) );

router.route('/register')
  .get(function ( req, res ) {
        res.render( 'register' );
    })
  .post(function (req, res ) {
    //do varification if username exist &&
    //passwerd matches
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then( function ( user ) {
      res.redirect( '/users/login' );
    })
    .error( function ( errors ) {
      res.render( 'register', errors );
    });
  });

router.route( '/login' )
  .get( function ( req, res ) {
    res.render( 'login/login' );
  })
  .post(
    passport.authenticate('local', {
      successRedirect : '/gallery',
      failureRedirect : '/users/login'
    })
  );

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/home');
  });

function isAuthenticated ( req, res, next ) {
  if( !req.isAuthenticated() ) {
    return res.redirect( 'login' );
  }
  return next();
}


module.exports = router;