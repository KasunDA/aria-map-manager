
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const mapRoutes = require('./routes/map');
const User = require('./models/Admin'); // Assuming you have a User model

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mapSatelliteApp';

const app = express();



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// Use connect-flash middleware
app.use(flash());
// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Passport configuration
require('./config/passport');

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/map', mapRoutes);

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
