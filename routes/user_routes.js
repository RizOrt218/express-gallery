var express = require( 'express' );
var router = express.Router();

var db = require( './../models' );
var User = db.User;

var bodyParser = require( 'body-parser' );

var passport = require( 'passport' );


router.use( bodyParser.urlencoded ( { extended : true } ) );

router.route('/')
  .get(function ( req, res ) {
    User.findAll()
      .then( function ( users ) {
        res.json( users );
      });
  })
  .post(function (req, res ) {
    User.create( {
      username: req.body.username,
      password: req.body.password
    })
      .then( function ( user ) {
        res.json( user );
      });
  });

router.route( '/login' )
  .get( function ( req, res ) {
    res.render( './login/login' );
  })

  .post(
    passport.authenticate('local', {
      successRedirect : '/gallery',
      failureRedirect : '/login'
    })
  );


module.exports = router;