var express = require( 'express' );
var router = express.Router();

var bodyParser = require( 'body-parser' );

router.use( bodyParser.urlencoded ( { extended : true } ) );

router.route( '/')
  .get( function ( req, res ) {
    res.render( 'test_landing_page');
  });

module.exports = router;