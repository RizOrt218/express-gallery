var express = require( 'express' );
var router = express.Router();

var db = require( './../models' );
var Gallery = db.Gallery;

var bodyParser = require( 'body-parser' );


router.use( bodyParser.urlencoded ( { extended : true } ) );

router.route('/')
  .get( function ( req, res ) {
    Gallery.findAll()
      .then( function ( gallery ) {
        res.render( 'landing_page.jade' );
      });
  })
  .post( function (req, res ) {
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

router.route('/:id')
  .get( function ( req, res ) {
    Gallery.findAll({
      where: {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.json( gallery );
    });
  })
  .put( function ( req, res ) {
    Gallery.update({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }, {
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.json( gallery );
    });
  })
  .delete( function ( req, res ) {
    Gallery.destroy({
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.json( gallery );
    });
  });

router.route('/new')
  .get( function ( req, res ) {

});

router.route('/:id/edit')
  .get( function ( req, res ) {

});


module.exports = router;