const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

// Router: Gửi tin nhắn
router.post('/', authMiddleware, messageController.sendMessageToAdmins);

// Router: Xem tất cả tin nhắn
router.get('/', authMiddleware, messageController.getAllMessages);

module.exports = router;