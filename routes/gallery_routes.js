var express = require( 'express' );
var router = express.Router();

var db = require( './../models' );
var Gallery = db.Gallery;

var bodyParser = require( 'body-parser' );


router.use( bodyParser.urlencoded ( { extended : true } ) );


router.get( '/', function ( req, res ) {
  Gallery.findAll()
    .then( function ( gallery ) {
      res.render( 'landing_page.jade' );
    });
});


router.get( '/:id', function ( req, res ) {

});


router.get( '/new', function ( req, res ) {

});


router.post( '/', function (req, res ) {
  Gallery.create(
    {
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }
  )
    .then( function ( gallery ) {
      res.json( gallery );
    });
});


router.get( '/:id/edit', function ( req, res ) {

});


router.put( '/:id', function ( req, res ) {

});


router.delete( '/:id', function ( req, res ) {

});


module.exports = router;