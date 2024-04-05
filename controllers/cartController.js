const CartItem = require('../models/cartModel');

// Controller: Xem giỏ hàng của người dùng
exports.viewCart = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
        // Lấy danh sách các sản phẩm trong giỏ hàng của người dùng
        const cartItems = await CartItem.find({ userId: userId });

        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Thêm một sản phẩm vào giỏ hàng của người dùng
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
        let cartItem = await CartItem.findOne({ userId: userId, productId: productId });

        if (cartItem) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            cartItem.quantity += quantity;
        } else {
            // Nếu sản phẩm chưa tồn tại, tạo mới
            cartItem = new CartItem({ userId, productId, quantity });
        }

        // Lưu thông tin sản phẩm vào giỏ hàng
        await cartItem.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Cập nhật số lượng của một sản phẩm trong giỏ hàng của người dùng
exports.updateCartItemQuantity = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
        let cartItem = await CartItem.findOne({ userId: userId, productId: productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Cập nhật số lượng sản phẩm
        cartItem.quantity = quantity;

        // Lưu thông tin sản phẩm vào giỏ hàng
        await cartItem.save();

        res.json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

// Controller: Xóa một sản phẩm khỏi giỏ hàng của người dùng
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Tìm kiếm và xóa sản phẩm khỏi giỏ hàng của người dùng
        await CartItem.deleteOne({ userId: userId, productId: productId });

        res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
