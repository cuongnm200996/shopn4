const Message = require('../models/messageModel');

// Controller: Xem tất cả tin nhắn từ khách hàng
exports.getAllCustomerMessages = async (req, res) => {
    try {
        const receiverId = req.user._id
        const messages = await Message.find({ receiverId }).populate('senderId');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Trả lời tin nhắn từ khách hàng
exports.replyToCustomerMessage = async (req, res) => {
    const { messageId, replyContent } = req.body;
    try {
        // Tìm tin nhắn dựa trên ID và người nhận là admin
        const message = await Message.findOne({ _id: messageId, receiverId: req.user._id });
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found or you are not authorized to reply to this message' });
        }

        // Tạo tin nhắn trả lời
        const replyMessage = new Message({
            senderId: req.user._id,
            receiverId: message.senderId,
            content: replyContent
        });

        // Lưu tin nhắn trả lời vào cơ sở dữ liệu
        await replyMessage.save();

        res.status(201).json({ message: 'Reply sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
