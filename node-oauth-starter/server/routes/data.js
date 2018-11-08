module.exports = function(config,businessLogic) {
  
  var express = require('express');
  var router = express.Router();
    
  router.post('/data', ensureAuthenticated, function (req, res, next) {  
    
      businessLogic.addEntry ( 
        req.user.profile.id,     
        req.body.date, 
        req.body.title, 
        req.body.text )
      .then(function(id) {
          res.json({ "id" :  id });         
      })
      .catch(function(err) {
        res.render('error', { message: "Error", error : { status: "500" } } );                          
      });
  });
      
  router.get('/data', ensureAuthenticated, function ( req, res, next ) {

    businessLogic.getEntries(
      req.user.profile.id
    )
    .then(function( entries ) {
      res.json(entries);          
    })
    .catch(function(err) {
        res.render('error', { message: "Error", error : { status: "500" } } );                  
    });
  });

  // Simple route middleware to ensure user is authenticated.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    // render the error page
    res.status(403);
    res.render('error', { message: "Unauthorized access", error : { status: "403" } } );
  }  
        
  return router;
};
    