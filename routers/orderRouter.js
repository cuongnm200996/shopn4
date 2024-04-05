const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Router: Lấy lịch sử các đơn hàng mà người dùng đã đặt trước đó
router.get('/:userId', orderController.getOrderHistory);

// Router: Trả về thông tin trạng thái của đơn hàng theo mã đơn hàng
router.get('/:orderId/track', orderController.trackOrder);

module.exports = router;
