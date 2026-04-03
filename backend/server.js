require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { UPLOADS_DIR } = require('./config/path');

// Route Imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`\x1b[35m%s\x1b[0m`, `-----------------------------------------`);
    console.log(`\x1b[35m%s\x1b[0m`, `  QUANTUM MONGODB PROTOCOL: CONNECTED    `);
    console.log(`\x1b[35m%s\x1b[0m`, `-----------------------------------------`);
}).catch(err => {
    console.error(`\x1b[31m%s\x1b[0m`, `DATABASE CONNECTION ERROR:`, err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', dashboardRoutes); // For /api/admin/stats
app.use('/api/categories', categoryRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
    console.log(`\x1b[36m%s\x1b[0m`, `  DB CUB API SERVER RUNNING ON PORT ${PORT}  `);
    console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
});
