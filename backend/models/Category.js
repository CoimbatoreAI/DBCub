const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String }, // Primary image for main category
    subcategories: [{
        name: { type: String, required: true },
        subcategories: [String] // This represents the sub-subcategories (3rd tier)
    }]
});

module.exports = mongoose.model('Category', categorySchema);
