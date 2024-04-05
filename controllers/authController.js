const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { SECRET_KEY } = require('../keys');

// Function to generate a refresh token
const generateRefreshToken = () => {
    return jwt.sign({}, SECRET_KEY, { expiresIn: '7d' }); // Expire in 7 days
};

// Controller: Đăng nhập vào tài khoản của người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Tạo token JWT bằng SECRET_KEY
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        
        // Tạo refresh token
        const refreshToken = generateRefreshToken();

        // Lưu refresh token vào cơ sở dữ liệu hoặc gửi nó cho người dùng

        // Trả về token và refresh token
        res.status(200).json({ token, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Đăng ký một tài khoản mới cho người dùng
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    try {
        // Kiểm tra xem password có tồn tại và không rỗng không
        if (!password || typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: 'Invalid password', password });
        }

        // Kiểm tra xem email đã được sử dụng chưa
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Tạo một user mới
        user = new User({
            username,
            email,
            password
        });

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)
        user.password = hashedPassword;

        // Lưu user vào cơ sở dữ liệu
        await user.save();

        // Trả về thông tin user đã được tạo
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error); // Thêm log để kiểm tra lỗi
        res.status(500).json({ message: error.message });
    }
};



// Controller: Gửi email để khôi phục mật khẩu cho người dùng
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Tạo token JWT bằng email của người dùng
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        // Tạo URL đặt lại mật khẩu với mã token
        const resetPasswordUrl = `http://yourwebsite.com/auth/reset-password/${token}`;

        // Thiết lập transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cuong.nm.2301@aptechlearning.edu.vn',
                pass: 'Cuong1996'
            }
        });

        // Cấu hình email
        const mailOptions = {
            from: 'cuong.nm.2301@aptechlearning.edu.vn',
            to: email,
            subject: 'Password Reset Request',
            text: `Please follow the link to reset your password: ${resetPasswordUrl}`
        };

        // Gửi email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent for password reset' });
            }
        });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Error during password reset' });
    }
};

// Controller: Đặt lại mật khẩu cho người dùng
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Giải mã mã token để lấy email của người dùng
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userEmail = decodedToken.email;

        // Tìm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mã hóa mật khẩu mới trước khi lưu vào cơ sở dữ liệu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới cho người dùng
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Error during password reset' });
    }
};

// Controller: Đặt lại mật khẩu cho người dùng
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Giải mã mã token để lấy email của người dùng
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userEmail = decodedToken.email;

        // Tìm người dùng trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mã hóa mật khẩu mới trước khi lưu vào cơ sở dữ liệu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới cho người dùng
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Error during password reset' });
    }
};

// Controller: Đăng xuất khỏi tài khoản của người dùng
exports.logout = async (req, res) => {
    try {
        // Xóa token khỏi localStorage
        localStorage.removeItem('authToken'); // 'authToken' là key chứa token trong localStorage
         // Xóa token khỏi cookie
         res.clearCookie('authToken'); // 'authToken' là tên của cookie chứa token

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Error logging out' });
    }
};
