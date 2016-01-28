var express = require( 'express' );
var router = express.Router();

var db = require( './../models' );
var User = db.User;

var bodyParser = require( 'body-parser' );


router.use( bodyParser.urlencoded ( { extended : true } ) );

router.post( '/', function (req, res ) {
  User.create( { username: req.body.username } )
    .then( function ( user ) {
      res.json( user );
    });
});


router.get( '/', function ( req, res ) {
  User.findAll()
    .then( function ( users ) {
      res.json( users );
    });
});

module.exports = router;