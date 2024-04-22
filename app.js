// Import dependencies
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const mapRoutes = require('./routes/map');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mapSatelliteApp';
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the useCreateIndex option as it is not supported in MongoDB 4.2+
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
// Configure Passport.js
require('./config/passport')(passport);

// Create Express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', indexRoutes); // Main routes (landing page, etc.)
app.use('/auth', authRoutes); // Authentication routes
app.use('/map', mapRoutes); // Map-related routes

// Handle 404 - Not Found
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
