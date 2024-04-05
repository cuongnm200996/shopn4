const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Router: Đăng nhập vào tài khoản của người dùng
router.post('/login', authController.login);

// Router: Đăng ký một tài khoản mới cho người dùng
router.post('/register', authController.register);

// Router: Gửi email để khôi phục mật khẩu cho người dùng
router.post('/forgot-password', authController.forgotPassword);

// Router: Gửi email để khôi phục mật khẩu cho người dùng
router.put('/reset-password', authController.resetPassword);

// Router: Đăng xuất khỏi tài khoản của người dùng
router.get('/logout', authController.logout);

module.exports = router;
