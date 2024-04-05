const Message = require('../models/messageModel');

exports.sendMessageToAdmins = async (req, res) => {
    const { content } = req.body;
    const senderId = req.user._id; // Lấy id của người gửi từ token đã được xác thực
    try {
        // Tìm tất cả người dùng là admin
        const admins = await User.find({ isAdmin: true });

        // Gửi tin nhắn cho mỗi người dùng admin
        const promises = admins.map(async (admin) => {
            const message = new Message({ senderId, receiverId: admin._id, content });
            await message.save();
        });

        // Chờ tất cả các promise hoàn thành trước khi trả về kết quả
        await Promise.all(promises);

        res.status(201).json({ message: 'Message sent to all admins successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Xem tất cả tin nhắn
exports.getAllMessages = async (req, res) => {
    const userId = req.user._id; // Lấy id của người dùng từ token đã được xác thực
    try {
        const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] })
                                      .populate('senderId')
                                      .populate('receiverId')
                                      .sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};