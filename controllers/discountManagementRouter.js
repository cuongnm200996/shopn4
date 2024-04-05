const Discount = require('../models/discountModel');

// Tạo mã giảm giá mới
exports.createDiscount = async (req, res) => {
    try {
        const { code, discountPercentage, startDate, endDate, quantity }= req.body;
        const discount = new Discount({ code, discountPercentage, startDate, endDate, quantity });
        await discount.save();
        res.status(201).json({ message: 'discount added successfully', discount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Chỉnh sửa thông tin mã giảm giá
exports.updateDiscount = async (req, res) => {
    try {
        const discountId = req.params.discountId;
        const { code, discountPercentage, startDate, endDate, quantity }= req.body;
        const discount = await Discount.findByIdAndUpdate(discountId, {code, discountPercentage, startDate, endDate, quantity }, { new: true });
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }
        res.status(200).json({ success: true, data: discount });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Xóa mã giảm giá
exports.deleteDiscount = async (req, res) => {
    try {
        const discountId = req.params.discountId;
        const discount = await Discount.findById(discountId);
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }

        // Kiểm tra nếu ngày kết thúc (endDate) đã qua thì xóa mã giảm giá
        if (discount.endDate && discount.endDate < Date.now()) {
            await Discount.findByIdAndDelete(discountId);
            return res.status(200).json({ success: true, message: 'Discount deleted successfully' });
        }

        return res.status(400).json({ success: false, message: 'Discount cannot be deleted as it has not expired yet' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};