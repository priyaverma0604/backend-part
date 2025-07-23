const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { createProduct } = require('../controllers/productController');

router.post('/add-product', auth, role('seller'), createProduct);

module.exports = router;
