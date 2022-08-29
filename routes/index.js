const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
    res.redirect('/movies');
});


// Google login
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));


// Google call back route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/movies',
        failureRedirect: '/movies'
    }
));


// Google logout
router.get('/logout', function (req, res) {
    
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/movies');
    })
});


module.exports = router;
