const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route: Gửi phản hồi hoặc báo cáo sự cố
router.post('/', feedbackController.sendFeedback);

module.exports = router;