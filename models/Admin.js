// models/Admin.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define the Admin schema
const adminSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Hash the password before saving to the database
adminSchema.pre('save', async function (next) {
    const admin = this;
    const hash = await bcrypt.hash(admin.password, 10);
    admin.password = hash;
    next();
});

// Method to validate password
adminSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
