const express = require('express');
const router = express.Router();
const OrderManagementController = require('../controllers/OrderManagementController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Middleware xác thực tài khoản admin
router.use(adminAuthMiddleware);

// Route: Xem danh sách tất cả các đơn hàng
router.get('/', OrderManagementController.getOrders);

// Route: Tìm kiếm đơn hàng theo mã đơn hàng
router.get('/search', OrderManagementController.searchOrdersByOrderId);

// Route: Cập nhật trạng thái đơn hàng
router.put('/:orderId/status', OrderManagementController.updateOrderStatus);

// Route: Xác nhận đơn hàng
router.put('/:orderId/confirm', OrderManagementController.confirmOrder);

// Route: Hủy đơn hàng
router.put('/:orderId/cancel', OrderManagementController.cancelOrder);

module.exports = router;
