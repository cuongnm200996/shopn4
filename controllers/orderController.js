const Order = require('../models/orderModel');

// Controller: Lấy lịch sử các đơn hàng mà người dùng đã đặt trước đó
exports.getOrderHistory = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Tìm tất cả các đơn hàng của người dùng dựa trên userId
        const orders = await Order.find({ userId });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Trả về thông tin trạng thái của đơn hàng theo mã đơn hàng
exports.trackOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Tìm đơn hàng trong cơ sở dữ liệu bằng mã đơn hàng
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Trả về thông tin trạng thái của đơn hàng
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};