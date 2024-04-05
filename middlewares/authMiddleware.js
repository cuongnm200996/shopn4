const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../keys');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        // Xác thực access token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Lưu thông tin người dùng vào request để sử dụng sau này
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Nếu access token hết hạn, kiểm tra refresh token
            const refreshToken = req.headers['x-refresh-token'];

            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token is missing' });
            }

            try {
                // Xác thực refresh token
                const decodedRefreshToken = jwt.verify(refreshToken, SECRET_KEY);

                // Tạo access token mới từ refresh token và gửi lại cho client
                const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, SECRET_KEY, { expiresIn: '1h' });

                // Gửi access token mới cho client
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                res.status(200).json({ message: 'New access token generated', accessToken: newAccessToken });
            } catch (error) {
                return res.status(401).json({ message: 'Refresh token is invalid' });
            }
        } else {
            return res.status(401).json({ message: 'Access token is invalid' });
        }
    }
};

module.exports = authMiddleware;