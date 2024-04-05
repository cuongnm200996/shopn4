const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Thông tin đơn hàng bị báo cáo
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Khách hàng báo cáo
    content: { type: String, required: true }, // Nội dung báo cáo
    email: { type: String, required: true }, // Email của khách hàng
    reportedAt: { type: Date, default: Date.now }, // Ngày báo cáo
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' } // Trạng thái báo cáo
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
