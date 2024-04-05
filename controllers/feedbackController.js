const Feedback = require('../models/feedbackModel');
const nodemailer = require('nodemailer');

// Controller: Gửi phản hồi hoặc báo cáo sự cố
exports.sendFeedback = async (req, res) => {
    try {
        const { orderId, content, email,customer } = req.body;
        // const customer = req.user._id; // Lấy ID của khách hàng từ token

        // Tạo một phản hồi mới
        const feedback = new Feedback({
            orderId,
            customer,
            content,
            email
        });

        // Lưu phản hồi vào cơ sở dữ liệu
        await feedback.save();

        // Gửi email thông báo cho khách hàng
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cuong.nm.2301@aptechlearning.edu.vn',
                pass: 'Cuong1996'
            }
        });

        const mailOptions = {
            from: 'cuong.nm.2301@aptechlearning.edu.vn',
            to: email,
            subject: 'Feedback Received',
            text: 'Thank you for your feedback. We have received your message and will take appropriate action.'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Trả về thông báo thành công
        res.status(201).json({ message: 'Feedback sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
