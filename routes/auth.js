// routes/auth.js
const express = require('express');
const passport = require('../config/passport'); // Import Passport configuration
const router = express.Router();

router.get('/login', (req, res) => {
    // Check if there is a flash message stored in the session
    const message = req.flash('error')[0]; // Assuming you're using connect-flash for flash messages

    res.render('login', { message }); // Pass the message variable to the login view
});

// Login post route (handle form submission)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to homepage if login is successful
    failureRedirect: '/auth/login', // Redirect back to login page if authentication fails
    failureFlash: true // Enable flash messages for error handling
}));

module.exports = router;
