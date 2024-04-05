const Notification = require('../models/notificationModel');

// Controller: Gửi thông báo cho người dùng
exports.sendNotification = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Tạo một thông báo mới
        const notification = new Notification({
            title,
            content
        });

        // Lưu thông báo vào cơ sở dữ liệu
        await notification.save();

        res.status(201).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lấy thông báo
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};