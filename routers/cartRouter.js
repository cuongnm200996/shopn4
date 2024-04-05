const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Router: Thêm một sản phẩm vào giỏ hàng của người dùng
router.post('/add', cartController.addToCart);

// Router: Xem giỏ hàng của người dùng
router.get('/:userId', cartController.viewCart);

// Router: Cập nhật số lượng của một sản phẩm trong giỏ hàng của người dùng
router.put('/update/:userId/:productId', cartController.updateCartItemQuantity);

// Router: Xóa một sản phẩm khỏi giỏ hàng của người dùng
router.delete('/remove/:userId/:productId', cartController.removeFromCart);

module.exports = router;
