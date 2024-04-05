const Product = require('../models/productModel');
const axios = require('axios');

const API_KEY = 'AIzaSyCF-qOICUcZerbjn1kJB7iE7lH9UD8eiX4';

// Hàm để đẩy ảnh lên Google Drive và trả về link đã lưu
const uploadPhotoToGoogleDrive = async (photoData) => {
    try {
        const folderId = "1wAwrFrocqiTOlbPluC_6BFo2ZsE8fltj";
        const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=media&parents=${folderId}`
        const response = await axios.post(url, photoData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'image/jpeg', // Thay đổi loại ảnh tương ứng
            },
        });
        console.log('Photo uploaded to Google Drive:', response.data);
        return response.data.webContentLink; // Trả về link đã lưu
    } catch (error) {
        console.error('Error uploading photo to Google Drive:', error.response.data);
        throw error;
    }
};
// Controller: Thêm một sản phẩm mới
exports.addProduct = async (req, res) => {
    try {
        const { name, price,typeOf, description, category, quantity, brand, photos,size } = req.body;

        // Đẩy ảnh lên Google Drive và lấy link đã lưu
        const photoLinks = [];
        for (const photoPath of photos) {
            const photoData = fs.readFileSync(photoPath); // Đọc nội dung của tệp ảnh
            const photoLink = await uploadPhotoToGoogleDrive(photoData); // Gửi dữ liệu ảnh đã đọc lên Google Drive
            photoLinks.push(photoLink);
        }

        // Lưu sản phẩm vào MongoDB với các link ảnh đã lưu
        const product = new Product({ name, price, description,typeOf, category, quantity, brand, photos,size });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Chỉnh sửa thông tin của một sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description,typeOf, category, quantity, brand, photos,size } = req.body;
        const productId = req.params.productId;

        // Đẩy ảnh lên Google Drive và lấy link đã lưu
        const photoLinks = [];
        for (const photoPath of photos) {
            const photoData = fs.readFileSync(photoPath); // Đọc nội dung của tệp ảnh
            const photoLink = await uploadPhotoToGoogleDrive(photoData); // Gửi dữ liệu ảnh đã đọc lên Google Drive
            photoLinks.push(photoLink);
        }

        // Cập nhật thông tin sản phẩm và các link ảnh vào MongoDB
        const updatedProduct = await Product.findByIdAndUpdate(productId, 
            { name, price, description,typeOf, category, quantity, brand, photos,size },
            { new: true }
        );
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Xóa một sản phẩm khỏi cửa hàng
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
