const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageManagementController');

// Router: Xem tất cả tin nhắn từ khách hàng
router.get('/customer-messages', messageController.getAllCustomerMessages);

// Router: Trả lời tin nhắn từ khách hàng
router.post('/reply', messageController.replyToCustomerMessage);

module.exports = router;