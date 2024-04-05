const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Router: Đánh giá và viết nhận xét về sản phẩm
router.post('/:productId/reviews', reviewController.addReview);

// Router: Xem tất cả các đánh giá của sản phẩm
router.get('/:productId/reviews', reviewController.getAllReviews);

module.exports = router;
