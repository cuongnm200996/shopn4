const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackManagementController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Middleware xác thực tài khoản admin
router.use(adminAuthMiddleware);

// Route: Xem phản hồi từ khách hàng
router.get('/', feedbackController.getFeedbacks);

// Route: Cap nhat trang thai phan hoi

router.put('/:feedbackId/updateFeedback', feedbackController.updateFeedbackStatus);

module.exports = router;
