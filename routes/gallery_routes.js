var express   = require( 'express' );
var router    = express.Router();
var db        = require( './../models' );
var Gallery   = db.Gallery;
var bodyParser= require( 'body-parser' );

router.use( bodyParser.urlencoded ( { extended : true } ) );

//will only render the form page to add values into
//the gallery.
//users/new-form
router.route('/new')
  .get( isAuthenticated, function (req, res) {
    Gallery.findAll()
    .then( function ( gallery ) {
      res.render('gallery/new-form');
    });
  })
  .post( function (req, res ) {
    Gallery.create(
      {
        author: req.body.author,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description
      }
    )
    .then( function ( ) {
      res.redirect( '/gallery' );
    });
  });

router.route('/')
  .get( function ( req, res ) {

    Gallery.findAll()
      .then( function ( allPhotos ) {
        res.render( 'gallery/allPhotos', {
          'gallery' : allPhotos,
        });
      });
  })
  .post( function (req, res ) {

    Gallery.create(
      {
        author: req.body.author,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        UserId : req.user.id
      }
    )
    .then( function ( gallery ) {
      res.redirect( '/gallery' );
    });
});

router.route('/test')
  .get( function (req, res ) {
    console.log("REQUEST", req);
    console.log("RESPOND", res);
    res.render( 'test_landing_page' );
  }
);

router.route('/:id')
  .get( function (req, res) {
    Gallery.findAll()
    .then( function (allPhotos) {
      var thumbs = allPhotos;
      Gallery.findById(req.params.id)
        .then(function (featuredPhoto) {
          res.render( 'gallery/singleImg', {
            user : req.user,
            gallery : featuredPhoto,
            thumbs : thumbs
          });
      });
    });
  })
  .put( function ( req, res ) {
    Gallery.update({
      author: req.body.author,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description
    }, {
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.redirect( '/gallery/' + req.params.id );
    });
  })

  .delete( isAuthenticated, function ( req, res ) {
    Gallery.destroy({
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.redirect( '/gallery' );
    });
  });

router.route('/:id/edit')
  .get( isAuthenticated, function ( req, res ) {
    Gallery.findAll({
      where: {
        id : req.params.id
      }
    })
    .then( function ( data ) {
      res.render( 'gallery/edit', {
        'gallery' : data[0]
      });
    });
});

function isAuthenticated ( req, res, next ) {
  if( !req.isAuthenticated() ) {
    return res.redirect( '/users/login' );
  }
  return next();
}


module.exports = router;