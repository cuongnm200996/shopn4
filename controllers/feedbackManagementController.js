const Feedback = require('../models/feedbackModel');

// Controller: Lấy danh sách phản hồi từ khách hàng
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Cập nhật trạng thái của phản hồi
exports.updateFeedbackStatus = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { status } = req.body;

        const feedback = await Feedback.findByIdAndUpdate(feedbackId, { status }, { new: true });

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback status updated successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
