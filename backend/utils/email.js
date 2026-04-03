const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmationToCustomer = async (customerEmail, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Order Confirmation - DB Cub #${orderDetails.id}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Thank you for your order!</h2>
                <p>Your order <strong>#${orderDetails.id}</strong> has been received and is currently being processed.</p>
                <h3>Order Summary:</h3>
                <ul>
                    ${orderDetails.items.map(item => `<li>${item.name} - ${item.size} x ${item.quantity} (₹${item.price})</li>`).join('')}
                </ul>
                <p><strong>Total Paid:</strong> ₹${orderDetails.total}</p>
                <br>
                <p>We will notify you once your order has been shipped!</p>
                <p>Best regards,<br>DB Cub Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Customer confirmation email sent');
    } catch (error) {
        console.error('Error sending customer email:', error);
    }
};

const sendOrderNotificationToAdmin = async (orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to admin themselves
        subject: `New Order Received - #${orderDetails.id}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>New Order Alert</h2>
                <p>A new order <strong>#${orderDetails.id}</strong> has been placed.</p>
                <h3>Customer Details:</h3>
                <p>Email: ${orderDetails.customerEmail}</p>
                <h3>Order Summary:</h3>
                <ul>
                    ${orderDetails.items.map(item => `<li>${item.name} - ${item.size} x ${item.quantity}</li>`).join('')}
                </ul>
                <p><strong>Total Value:</strong> ₹${orderDetails.total}</p>
                <br>
                <p>Please check the admin dashboard to process this order.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin notification email sent');
    } catch (error) {
        console.error('Error sending admin email:', error);
    }
};

module.exports = { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin };
