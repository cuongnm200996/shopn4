const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Router: Lấy danh sách tất cả sản phẩm
router.get('/all', productController.getAllProducts);

// Router: Lấy danh sách sản phẩm theo typeOf
router.get('/typeOf/:typeOf', productController.getProductsByTypeOf);

// Router: Lấy danh sách sản phẩm theo category
router.get('/category/:category', productController.getProductsByCategory);

// Router: Lấy danh sách sản phẩm theo brand
router.get('/brand/:brand', productController.getProductsByBrand);

// Router: Lấy thông tin chi tiết về sản phẩm theo productId
router.get('/details/:productId', productController.getProductById);

// Router: Tìm kiếm sản phẩm theo từ khóa
router.get('/search', productController.searchProduct);

// Router: So sánh các sản phẩm với nhau
router.get('/compare', productController.compareProducts);

// Router: Lọc sản phẩm
router.get('/filter', productController.filterProducts);

// Router: Sắp xếp sản phẩm
router.get('/sort', productController.sortProducts);

module.exports = router;
