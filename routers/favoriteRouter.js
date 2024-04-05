const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');


// Lấy danh sách sản phẩm yêu thích của người dùng
router.get('/:userId', authMiddleware, favoriteController.getFavorites);

// Thêm sản phẩm vào danh sách yêu thích của người dùng
router.post('/', authMiddleware, favoriteController.addToFavorites);

// Xóa sản phẩm khỏi danh sách yêu thích của người dùng
router.delete('/:productId', authMiddleware, favoriteController.removeFromFavorites);

module.exports = router;