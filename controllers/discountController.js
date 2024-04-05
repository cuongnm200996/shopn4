const Discount = require('../models/discountModel');

// Controller: Áp dụng mã giảm giá cho đơn hàng của người dùng
exports.applyDiscount = async (req, res) => {
    const { userId, discountCode } = req.body;

    try {
        // Tìm mã giảm giá trong cơ sở dữ liệu
        const discount = await Discount.findOne({ code: discountCode });

        if (!discount) {
            return res.status(404).json({ message: 'Discount code not found' });
        }

        // Áp dụng mã giảm giá cho đơn hàng

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Discount applied successfully', discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Xem tất cả mã giảm giá của người dùng
exports.viewDiscounts = async (req, res) => {
    try {
        // Tìm tất cả các mã giảm giá trong cơ sở dữ liệu
        const discounts = await Discount.find();

        // Trả về danh sách các mã giảm giá
        res.status(200).json({ discounts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};