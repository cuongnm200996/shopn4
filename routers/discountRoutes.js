const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

// Router: Áp dụng mã giảm giá cho đơn hàng của người dùng
router.post('/apply-discount', discountController.applyDiscount);

// Router: Xem tất cả mã giảm giá của người dùng
router.get('/apply-discount/view', discountController.viewDiscounts);
module.exports = router;
