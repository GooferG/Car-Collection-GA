const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
    res.redirect('/cars');
});


// Google login
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));


// // Google call back route
// router.get('/oauth2callback', passport.authenticate(
//     'google',
//     {
//         successRedirect: '/',
//         failureRedirect: '/'
//     }
// ));

// Google OAuth callback route
router.get('/auth/google/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/cars',
      failureRedirect : '/cars'
    }
));

// Google logout
router.get('/logout', function (req, res) {
    
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/cars');
    })
});


module.exports = router;
