const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    subcategory: { type: String },
    subSubcategory: { type: String },
    image: { type: String }, // Primary image
    images: [String], // Array of gallery images
    description: { type: String },
    sizes: [String],
    colors: [{
        name: String,
        code: String
    }],
    tag: { type: String },
    stock: { type: Number, default: 0 },
    fabric: { type: String },
    fit: { type: String },
    sleeveType: { type: String },
    sportType: { type: String },
    badge: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
