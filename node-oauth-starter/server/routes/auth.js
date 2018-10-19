module.exports = function(passport) {
  
    var express = require('express');
    var router = express.Router();
  
    router.get('/login', function(req, res) {
      res.render('login', {
        user: req.user
      });
    });    

    router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });    

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    router.get('/auth/google',
      passport.authenticate('google', { scope: ['openid email profile'] })
    );

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    router.get('/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/login'
      }),
      function(req, res) {
        // Authenticated successfully
        res.redirect('/');
    });    
  
    return router;
  };
  