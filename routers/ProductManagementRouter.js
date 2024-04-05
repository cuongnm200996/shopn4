const express = require('express');
const router = express.Router();
const ProductManagementController = require('../controllers/ProductManagementController');
// const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// // Middleware xác thực tài khoản admin
// router.use(adminAuthMiddleware);

// Thêm một sản phẩm mới vào cửa hàng
router.post('/', ProductManagementController.addProduct);

// Chỉnh sửa thông tin của một sản phẩm
router.put('/:productId', ProductManagementController.updateProduct);

// Xóa một sản phẩm khỏi cửa hàng
router.delete('/:productId', ProductManagementController.deleteProduct);

module.exports = router;