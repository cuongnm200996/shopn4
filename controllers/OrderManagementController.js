const Order = require('../models/orderModel');

exports.getOrders = async (req, res) => {
    try {
        // Lấy danh sách các đơn hàng từ cơ sở dữ liệu
        const orders = await Order.find();

        // Trả về danh sách các đơn hàng
        res.status(200).json(orders);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
};

// Tìm kiếm đơn hàng theo mã đơn hàng
exports.searchOrdersByOrderId = async (req, res) => {
    try {
        // Lấy thông tin mã đơn hàng từ query parameter
        const { orderId } = req.query;

        // Tìm kiếm đơn hàng theo mã đơn hàng
        const orders = await Order.find({ orderId });

        // Trả về danh sách các đơn hàng
        res.status(200).json(orders);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
};

// cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Kiểm tra trạng thái được cập nhật
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Tìm và cập nhật trạng thái của đơn hàng
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        // Kiểm tra nếu không tìm thấy đơn hàng
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Trả về thông tin đơn hàng sau khi được cập nhật
        res.status(200).json(updatedOrder);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
};

//xác nhận đơn hàng giao thành công
exports.confirmOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Xác nhận đơn hàng trong cơ sở dữ liệu
        await Order.findByIdAndUpdate(orderId, { status: 'delivered' });

        // Trả về thông báo xác nhận thành công
        res.status(200).json({ message: 'Order confirmed successfully' });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
};

//Hủy đơn hàng
exports.cancelOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Hủy đơn hàng trong cơ sở dữ liệu
        await Order.findByIdAndUpdate(orderId, { status: 'cancelled' });

        // Trả về thông báo hủy đơn hàng thành công
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
};
