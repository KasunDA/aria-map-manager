const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') }); // Pass the 'error' flash message
});

router.post('/signup', async (req, res) => {
    const { username,email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/auth/signup');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email is already registered');
            return res.redirect('/auth/signup');
        }
        const newUser = new User({ username,email, password });
        await newUser.save();
        req.flash('success', 'Account created successfully');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        res.redirect('/auth/signup');
    }
});

// Login route
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') }); // Pass the 'error' flash message
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
