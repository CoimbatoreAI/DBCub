const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

module.exports = {
    ROOT_DIR,
    DATA_DIR,
    UPLOADS_DIR,
    PRODUCTS_FILE: path.join(DATA_DIR, 'products.json'),
    ORDERS_FILE: path.join(DATA_DIR, 'orders.json'),
    CATEGORIES_FILE: path.join(DATA_DIR, 'categories.json'),
    USERS_FILE: path.join(DATA_DIR, 'users.json')
};
