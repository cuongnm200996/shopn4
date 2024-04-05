const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportManagementController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Route để tạo và lưu báo cáo
router.post('/generate',adminAuthMiddleware, reportController.generateReport);

// Route: Xem báo cáo
router.get('/', adminAuthMiddleware, reportController.getReports);

// Route để xem chi tiết một báo cáo theo ID
router.get('/:reportId', adminAuthMiddleware, reportController.getReportById);

module.exports = router;
