const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

router.get('/', productController.getAllProducts);
router.post('/', upload.array('images', 6), productController.addProduct);
router.put('/:id', upload.array('images', 6), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
