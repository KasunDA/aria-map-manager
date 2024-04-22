const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
    // Render the landing page with the map (we'll add the map logic later)
    res.render('landing', { areas: [] }); // Pass an empty array for now
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
