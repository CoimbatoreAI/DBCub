const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.adminLogin);
router.post('/user-login', authController.userLogin);
router.post('/user-register', authController.registerUser);
router.get('/users', authController.getAllUsers);

module.exports = router;
