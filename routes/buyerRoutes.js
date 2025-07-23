const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { getAllProducts } = require('../controllers/productController');

router.get('/products', auth, role('buyer'), getAllProducts);
router.post('/order', auth, role('buyer'), placeOrder);
router.get('/my-orders', auth, role('buyer'), getMyOrders);

module.exports = router;
