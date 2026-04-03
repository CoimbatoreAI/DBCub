const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dbcub_quantum_secure_secret_2026';

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    // Special check for hardcoded super admin
    if (email === "admin@dbcub.com" && password === "maari@481") {
        const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
        return res.json({ success: true, token, user: { email, role: 'admin' } });
    }

    // Check database for other admins if applicable
    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
            return res.json({ success: true, token, user: { email, role: 'admin', name: user.name } });
        }
    } catch (err) {
        console.error(err);
    }

    res.status(401).json({ success: false, message: "Invalid admin credentials" });
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({ success: true, token, user: { id: user._id, email: user.email, name: user.name, role: 'user' } });
        }

        res.status(401).json({ success: false, message: "Invalid email or password" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: "Network error during authentication" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        res.json({ success: true, user: { id: newUser._id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: "Internal server error during registration" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Database Retrieval Failed' });
    }
};

module.exports = { adminLogin, userLogin, registerUser, getAllUsers };
