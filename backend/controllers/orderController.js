const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } = require('../utils/email');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Database Retrieval Failed' });
    }
};

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = new Order({
            ...orderData,
            status: "Processing"
        });

        await newOrder.save();

        // Async trigger emails without blocking response
        Promise.all([
            sendOrderConfirmationToCustomer(newOrder.customer.email, newOrder),
            sendOrderNotificationToAdmin(newOrder)
        ]).catch(console.error);

        res.json(newOrder);
    } catch (error) {
        console.error('Error creating order in MongoDB:', error);
        res.status(500).json({ error: 'Order Initialization Failed', message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, trackingId } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, trackingId },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ error: 'Transaction Record Not Found' });

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating status in MongoDB:', error);
        res.status(500).json({ error: 'Status Modification Failed' });
    }
};

const getStats = async (req, res) => {
    try {
        const [products, orders] = await Promise.all([
            Product.find(),
            Order.find()
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const lowStockCount = products.filter(p => p.stock <= 5).length;

        res.json({
            totalOrders: orders.length,
            revenue: totalRevenue,
            totalProducts: products.length,
            lowStockCount: lowStockCount,
            recentOrders: orders.slice(-5).reverse()
        });
    } catch (error) {
        console.error('Stats aggregation failed:', error);
        res.status(500).json({ error: 'Intelligence Feed Interrupted' });
    }
};

const trackOrder = async (req, res) => {
    try {
        const { trackingId } = req.params;
        const apiToken = process.env.DELIVERY_API_TOKEN;

        // Fetching tracking info from Delhivery
        const response = await fetch(`https://track.delhivery.com/api/v1/packages/json/?waybill=${trackingId}`, {
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Delhivery Tracking Error:', error);
        res.status(500).json({ error: 'Tracking Link Severed' });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    updateOrderStatus,
    getStats,
    trackOrder
};
