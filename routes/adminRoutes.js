
const express = require('express');
const router = express.Router();
const passport = require('../config/passport'); // Admin Passport configuration
const Admin = require('../models/Admin');

// Admin login route
router.get('/login', (req, res) => {
    res.render('admin/login', { message: req.flash('error') });
});

// Admin login POST route (handle form submission)
router.post('/login', passport.authenticate('admin-local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

// Admin logout route
router.get('/logout', (req, res) => {
    req.logout(); // Passport.js method to logout
    res.redirect('/admin/login'); // Redirect to login page after logout
});

// Admin dashboard route (requires authentication)
router.get('/dashboard', isAuthenticated, (req, res) => {
    // Render the admin dashboard page
    res.render('admin/dashboard', { user: req.user });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login'); // Redirect to admin login page if not authenticated
}

module.exports = router;
