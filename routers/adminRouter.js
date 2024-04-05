const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Đăng nhập vào tài khoản admin
router.get('/login', adminController.login);

// Thêm một tài khoản admin mới
router.post('/accounts', adminController.createAdmin);

// Chỉnh sửa thông tin của một tài khoản admin
router.put('/accounts/:adminId', adminController.updateAdmin);

// Xóa một tài khoản admin
router.delete('/accounts/:adminId', adminController.deleteAdmin);

module.exports = router;
