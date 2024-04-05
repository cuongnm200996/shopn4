const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

// Controller: Đánh giá và viết nhận xét về sản phẩm
exports.addReview = async (req, res) => {
    const { userId, rating, comment } = req.body;
    const productId = req.params.productId;

    try {
        // Tìm sản phẩm dựa trên ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Tạo một nhận xét mới
        const review = new Review({
            userId,
            productId,
            rating,
            comment
        });

        // Lưu nhận xét vào cơ sở dữ liệu
        await review.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Xem tất cả các đánh giá của sản phẩm
exports.getAllReviews = async (req, res) => {
    const productId = req.params.productId;

    try {
        // Tìm tất cả các đánh giá của sản phẩm dựa trên ID sản phẩm
        const reviews = await Review.find({ productId });

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};