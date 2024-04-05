const Address = require('../models/addressModel');

// Controller: Xem tất cả địa chỉ giao hàng của người dùng
exports.getAllAddresses = async (req, res) => {
    const userId = req.params.userId; // Lấy id người dùng từ token hoặc session

    try {
        const addresses = await Address.find({ userId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller: Thêm một địa chỉ giao hàng mới cho người dùng
exports.addAddress = async (req, res) => {
    const { userId, address, ward, district, city, telephone } = req.body;

    try {
        const newAddress = new Address({ userId, address, ward, district, city, telephone });
        await newAddress.save();
        res.status(201).json({ message: 'Address added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller: Cập nhật một địa chỉ giao hàng của người dùng
exports.updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { address, ward, district, city, telephone } = req.body;

    try {
        await Address.findByIdAndUpdate(addressId, { address, ward, district, city, telephone });
        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller: Xóa một địa chỉ giao hàng của người dùng
exports.deleteAddress = async (req, res) => {
    const { addressId } = req.params;

    try {
        await Address.findByIdAndDelete(addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



