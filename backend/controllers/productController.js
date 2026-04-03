const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Helper to generate slug
const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Database Retrieval Failed' });
    }
};

const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.product);
        const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

        const newProduct = new Product({
            ...productData,
            slug: generateSlug(productData.name),
            image: images[0] || '',
            images: images,
            stock: parseInt(productData.stock) || 0,
            price: parseFloat(productData.price) || 0,
            originalPrice: parseFloat(productData.originalPrice) || 0
        });

        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error('CRITICAL: Error adding product to MongoDB:', error);
        res.status(500).json({ error: 'Initialization Failed', message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = JSON.parse(req.body.product);
        const newImages = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

        const currentProduct = await Product.findById(id);
        if (!currentProduct) return res.status(404).json({ error: 'Infrastructure Node Not Found' });

        const mergedImages = newImages.length > 0 ? newImages : currentProduct.images;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...productData,
                image: mergedImages[0] || currentProduct.image,
                images: mergedImages,
                stock: parseInt(productData.stock) || 0,
                price: parseFloat(productData.price) || 0,
                originalPrice: parseFloat(productData.originalPrice) || 0
            },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product in MongoDB:', error);
        res.status(500).json({ error: 'Re-deployment Failed', message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: 'Resource Not Found' });

        res.json({ message: 'Success: Logic Core Deleted', id });
    } catch (error) {
        console.error('Error deleting product from MongoDB:', error);
        res.status(500).json({ error: 'Decommissioning Failed' });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
