const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to render the addPolygon view
router.get('/add', (req, res) => {
    res.render('addPolygon');
});

// Route to handle form submission and save polygon data
router.post('/save', async (req, res) => {
    const { name, description, polygonCoordinates, squareFeet } = req.body;

    // Save data to MongoDB using Mongoose
    try {
        const newPolygon = new User({
            name,
            description,
            polygonCoordinates: JSON.parse(polygonCoordinates),
            squareFeet: parseInt(squareFeet)
        });
        await newPolygon.save();
        res.send('Location saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving polygon.');
    }
});

module.exports = router;
