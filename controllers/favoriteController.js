const Favorite = require('../models/favoriteModel');

// Xem danh sách sản phẩm yêu thích của người dùng
exports.getFavorites = async (req, res) => {
    try {
        const userId = req.params.userId

        const favorites = await Favorite.find({ userId});
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm sản phẩm vào danh sách yêu thích của người dùng
exports.addToFavorites = async (req, res) => {
    const { productId, userId } = req.body;

    try {
        // Thực hiện xác thực người dùng ở đây nếu cần thiết

        const existingFavorite = await Favorite.findOne({ userId, productId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Product already in favorites' });
        }

        const newFavorite = new Favorite({ userId, productId });
        await newFavorite.save();

        res.status(201).json({ message: 'Product added to favorites', favorite: newFavorite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sản phẩm khỏi danh sách yêu thích của người dùng
exports.removeFromFavorites = async (req, res) => {
    const { productId } = req.params;

    try {
        // Thực hiện xác thực người dùng ở đây nếu cần thiết

        const favorite = await Favorite.findOneAndDelete({ productId });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Product removed from favorites', favorite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
