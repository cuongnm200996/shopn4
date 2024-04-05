const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerManagementController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Middleware xác thực tài khoản admin
router.use(adminAuthMiddleware);

// Xem danh sách khách hàng
router.get('/', customerController.getCustomers);

// Xem thông tin khách hàng cụ thể
router.get('/:customerId', customerController.getCustomerById);

// Xóa tài khoản khách hàng
router.delete('/:customerId', customerController.deleteCustomer);

// Tìm kiếm khách hàng
router.get('/search', customerController.searchCustomers);

module.exports = router;
