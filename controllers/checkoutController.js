const CartItem = require('../models/cartModel');
const Order = require('../models/orderModel');
const Discount = require('../models/discountModel');

// Controller: Thực hiện thanh toán cho một số lượng sản phẩm trong giỏ hàng của người dùng
exports.checkout = async (req, res) => {
    const { userId, products, shippingAddress, shippingWard, shippingDistrict, shippingCity, discountCode } = req.body;

    try {
        // Tính tổng giá trị của các sản phẩm trong giỏ hàng
        let totalPriceproduct = 0;
        products.forEach(product => {
            totalPriceproduct += product.price * product.quantity;
        });

        // Tính phí vận chuyển dựa vào vị trí của địa chỉ giao hàng
        let shippingFee = 0;
        if (shippingCity === 'Hanoi' || shippingDistrict === 'Hanoi') {
            shippingFee = 25000; // Phí vận chuyển trong Hà Nội
        } else {
            shippingFee = 35000; // Phí vận chuyển ngoài Hà Nội
        }

        // Tính tổng giá trị của đơn hàng (bao gồm giảm giá nếu có)
        let price = totalPriceProducts;
        if (discountCode) {
            const discount = await Discount.findOne({ code: discountCode });
            if (discount) {
                const discountAmount = (totalPriceProducts * discount.discountPercentage) / 100;
                price -= discountAmount;
            }
        }
        let totalPrice = shippingFee + totalPriceproduct;


        // Tạo đơn hàng mới chỉ với các sản phẩm được chọn, tổng giá trị và phí vận chuyển
        const order = new Order({
            userId,
            products,
            totalPriceproduct,
            totalPrice,
            status: 'pending',
            shippingAddress,
            shippingWard,
            shippingDistrict,
            shippingCity,
            totalShip: shippingFee // Tổng phí vận chuyển)
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await order.save();

        // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng của người dùng
        for (const product of products) {
            await CartItem.deleteOne({ userId, productId: product.productId });
        }

        res.status(201).json({ message: 'Checkout successful', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

