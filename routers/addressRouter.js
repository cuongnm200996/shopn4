const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Router: Xem tất cả địa chỉ giao hàng của người dùng
router.get('/:userId', addressController.getAllAddresses);

// Router: Thêm một địa chỉ giao hàng mới cho người dùng
router.post('/', addressController.addAddress);

// Router: Cập nhật một địa chỉ giao hàng của người dùng
router.put('/:addressId', addressController.updateAddress);

// Router: Xóa một địa chỉ giao hàng của người dùng
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;
