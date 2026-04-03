const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Database Retrieval Failed' });
    }
};

const addCategory = async (req, res) => {
    try {
        const categoryData = { ...req.body };
        if (req.file) categoryData.image = `/uploads/${req.file.filename}`;

        // Handle multipart JSON parsing
        if (typeof categoryData.subcategories === 'string') {
            categoryData.subcategories = JSON.parse(categoryData.subcategories);
        }

        const newCategory = new Category(categoryData);
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Failed to initialize category node' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;

        if (typeof updateData.subcategories === 'string') {
            updateData.subcategories = JSON.parse(updateData.subcategories);
        }

        let category;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            category = await Category.findByIdAndUpdate(id, updateData, { new: true });
        } else {
            category = await Category.findOneAndUpdate({ name: id }, updateData, { new: true });
        }

        if (!category) return res.status(404).json({ error: "Category Tree Not Found" });
        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category logic' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let result;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            result = await Category.findByIdAndDelete(id);
        } else {
            result = await Category.findOneAndDelete({ name: id });
        }

        if (!result) return res.status(404).json({ error: 'Node Not Found' });
        res.json({ success: true, id });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Decommissioning Failed' });
    }
};

module.exports = { getAllCategories, addCategory, updateCategory, deleteCategory };
