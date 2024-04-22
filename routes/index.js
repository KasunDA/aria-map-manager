// routes/index.js
const express = require('express');
const router = express.Router();

// Landing page route
router.get('/', (req, res) => {
    res.render('landing'); // Render the landing page
});

module.exports = router;
