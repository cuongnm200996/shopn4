const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

// Controller: Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lấy danh sách sản phẩm theo typeOf
exports.getProductsByTypeOf = async (req, res) => {
    const typeOf = req.params.typeOf;
    console.log(typeOf)
    try {
        const products = await Product.find({ typeOf: typeOf });
        res.json(products);
        console.log(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lấy danh sách sản phẩm theo category
exports.getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    console.log(category)
    try {
        const products = await Product.find({ category: category });
        res.json(products);
        console.log(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lấy danh sách sản phẩm theo brand
exports.getProductsByBrand = async (req, res) => {
    const brand = req.params.brand;
    console.log(brand)
    try {
        const products = await Product.find({ brand: brand });
        res.json(products);
        console.log(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lấy thông tin chi tiết về sản phẩm theo productId
exports.getProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Tìm kiếm sản phẩm theo từ khóa (name, typeOf, category, brand)
exports.searchProduct = async (req, res) => {
    const { name, typeOf,category, brand } = req.query;
    try {
        // Tìm kiếm sản phẩm với từ khóa
        const searchCriteria = {};
        // Kiểm tra và thêm điều kiện tìm kiếm cho từng trường chỉ khi giá trị được gửi trong yêu cầu
        if (name) searchCriteria.name = { $regex: name, $options: 'i' };
        if (typeOf) searchCriteria.typeOf = { $regex: typeOf, $options: 'i' };
        if (category) searchCriteria.category = { $regex: category, $options: 'i' };
        if (brand) searchCriteria.brand = { $regex: brand, $options: 'i' };

        // Tìm kiếm sản phẩm với các điều kiện tìm kiếm đã xác định
        const products = await Product.find(searchCriteria);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: So sánh các sản phẩm với nhau
exports.compareProducts = async (req, res) => {
    try {
        // Lấy thông tin sản phẩm từ yêu cầu
        const { productId1, productId2 } = req.query;

        // Kiểm tra xem productId1 và productId2 có được cung cấp không
        if (!productId1 || !productId2) {
            return res.status(400).json({ message: 'Please provide productId1 and productId2' });
        }

        // Tìm kiếm thông tin của sản phẩm 1
        const product1 = await Product.findById(productId1);
        if (!product1) {
            return res.status(404).json({ message: 'Product 1 not found' });
        }

        // Tìm kiếm thông tin của sản phẩm 2
        const product2 = await Product.findById(productId2);
        if (!product2) {
            return res.status(404).json({ message: 'Product 2 not found' });
        }

        // So sánh các giá trị của 2 sản phẩm
        // Đây chỉ là một ví dụ, bạn có thể thực hiện các phép so sánh khác tùy theo yêu cầu của ứng dụng

        const comparisonResult = {
            product1: {
                name: product1.name,
                typeOf: product1.typeOf,
                category: product1.category,
                description: product1.description,
                price: product1.price,
                brand: product1.brand,
            },
            product2: {
                name: product2.name,
                typeOf: product2.typeOf,
                category: product2.category,
                description: product2.description,
                price: product2.price,
                brand: product2.brand,
            }
        };

        // Trả về kết quả so sánh
        res.status(200).json(comparisonResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Lọc sản phẩm
exports.filterProducts = async (req, res) => {
    try {
        // Lấy các tham số từ yêu cầu
        const { minPrice, maxPrice, brand, typeOf, category } = req.query;

        // Tạo điều kiện truy vấn MongoDB dựa trên các tham số
        const filterConditions = {};
        if (minPrice && maxPrice) {
            filterConditions.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            filterConditions.price = { $gte: minPrice };
        } else if (maxPrice) {
            filterConditions.price = { $lte: maxPrice };
        }
        if (brand) {
            filterConditions.brand = brand;
        }
        if (typeOf) {
            filterConditions.color = typeOf;
        }
        if (category) {
            filterConditions.color = category;
        }

        // Tìm kiếm sản phẩm dựa trên điều kiện lọc
        const filteredProducts = await Product.find(filterConditions);

        // Trả về danh sách sản phẩm đã lọc
        res.status(200).json(filteredProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller: Sắp xếp sản phẩm
exports.sortProducts = async (req, res) => {
    try {
        // Lấy tham số sắp xếp từ yêu cầu
        const { sortBy } = req.query;

        // Kiểm tra nếu không có tham số sắp xếp hoặc tham số không hợp lệ
        if (!sortBy || (sortBy !== 'price' && sortBy !== 'rating' )) {
            return res.status(400).json({ message: 'Invalid sort parameter' });
        }

        let sortedProducts;

        // Sắp xếp sản phẩm dựa trên tham số
        if (sortBy === 'rating') {
            // Lấy tất cả đánh giá của sản phẩm
            const reviews = await Review.find({ productId: req.params.productId });

            // Tính toán rating trung bình
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            // Sắp xếp sản phẩm theo rating trung bình
            sortedProducts = await Product.find().sort({ rating: -1 });
        } else {
            // Sắp xếp theo các tiêu chí khác
            sortedProducts = await Product.find().sort({ [sortBy]: 1 });
        }

        // Trả về danh sách sản phẩm đã sắp xếp
        res.status(200).json(sortedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
