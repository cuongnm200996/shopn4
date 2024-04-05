const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { SECRET_KEY } = require('../keys');

// Controller: Đăng nhập vào tài khoản của admin
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm admin trong cơ sở dữ liệu bằng email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Kiểm tra xem người dùng có phải là admin không
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to access this resource' });
        }

        // Tạo token JWT bằng SECRET_KEY
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        
        // Tạo refresh token
        const refreshToken = generateRefreshToken();

        // Lưu refresh token vào cơ sở dữ liệu

        // Trả về token và refresh token
        res.status(200).json({ token, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Thêm một tài khoản admin mới
exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isAdmin = true; // Đặt isAdmin là true khi tạo tài khoản admin mới
        
        const admin = new User({ username, email, password, isAdmin });
        await admin.save();

        res.status(201).json({ message: 'Admin account created successfully', admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Chỉnh sửa thông tin của một tài khoản admin
exports.updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { username, email, password } = req.body;

        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin account not found' });
        }

        admin.username = username;
        admin.email = email;
        admin.password = password;
        await admin.save();

        res.status(200).json({ message: 'Admin account updated successfully', admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Xóa một tài khoản admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;

        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin account not found' });
        }

        await User.findByIdAndDelete(adminId);

        res.status(200).json({ message: 'Admin account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



