const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { getAllUsers } = require('../controllers/adminController');

router.get('/users', auth, role('admin'), getAllUsers);

module.exports = router;
