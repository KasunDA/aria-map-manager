const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin'); // Admin model (similar to User model)

passport.use('admin-local', new LocalStrategy((username, password, done) => {
    Admin.findOne({ username: username }, (err, admin) => {
        if (err) { return done(err); }
        if (!admin) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!admin.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, admin);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    });
});

module.exports = passport;
