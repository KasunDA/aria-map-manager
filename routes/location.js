const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Location = require('../models/Location');


// Route to render the addPolygon view
router.get('/add', (req, res) => {
    res.render('addPolygon');
});
// Add this line to parse JSON bodies
router.use(express.json());
// Route to handle form submission and save polygon data
router.post('/save', async (req, res) => {
    try {
        // Access JSON data from req.body
        const { name, description, squareFeet, coordinates } = req.body;

        // Save data to MongoDB or perform other operations
        // Example:
        const newLocation = new Location({
            name,
            description,
            squareFeet,
            coordinates
        });
        await newLocation.save();

        res.status(200).json({ message: 'Location saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving location' });
    }
});

// Endpoint to get all locations
router.get('/all', async (req, res) => {
    try {
        const locations = await Location.getAll();
        res.json(locations);
    } catch (err) {
        console.error("Failed to retrieve locations:", err);
        res.status(500).send("Failed to retrieve locations.");
    }
});

module.exports = router;
