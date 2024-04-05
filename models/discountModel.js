const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    quantity: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Lưu danh sách ID người dùng đã sử dụng mã
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
