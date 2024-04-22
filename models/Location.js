// Import Mongoose
const mongoose = require('mongoose');

// Define the Polygon schema
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    squareFeet: {
        type: Number,
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    }
});

// Static method to fetch all locations
locationSchema.statics.getAll = function() {
    return this.find({});  // Fetch all documents in the Location collection
};

// Create the Polygon model based on the schema
const location = mongoose.model('Location', locationSchema);

// Export the Polygon model
module.exports = location;
