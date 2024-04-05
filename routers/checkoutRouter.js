const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Router: Thực hiện thanh toán cho một số lượng sản phẩm trong giỏ hàng của người dùng
router.post('/', checkoutController.checkout);

module.exports = router;
