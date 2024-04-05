const User = require('../models/userModel');

// Xem danh sách khách hàng
exports.getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ isAdmin: false });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xem thông tin khách hàng cụ thể
exports.getCustomerById = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa tài khoản khách hàng
exports.deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await User.findByIdAndDelete(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tìm kiếm khách hàng
exports.searchCustomers = async (req, res) => {
    const { username, email } = req.query;
    try {
        const customers = await User.find({
            isAdmin: false,
            $or: [
                { username: { $regex: username, $options: 'i' } },
                { email: { $regex: email, $options: 'i' } }
            ]
        });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
