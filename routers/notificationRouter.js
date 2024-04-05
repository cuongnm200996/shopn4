const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Route: Gửi thông báo cho người dùng
router.post('/admin', adminAuthMiddleware, notificationController.sendNotification);

// Route: Lấy thông báo
router.get('/', notificationController.getNotifications);

module.exports = router;