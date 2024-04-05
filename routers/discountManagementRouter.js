const express = require('express');
const router = express.Router();
const discountManagementController = require('../controllers/discountManagementRouter');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');


// Tạo mới mã giảm giá
router.post('/', adminAuthMiddleware, discountManagementController.createDiscount);

// Chỉnh sửa mã giảm giá
router.put('/:discountId', adminAuthMiddleware, discountManagementController.updateDiscount);

// Xóa mã giảm giá
router.delete('/:discountId', adminAuthMiddleware, discountManagementController.deleteDiscount);

module.exports = router;
