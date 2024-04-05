const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/Shop_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.once('open', () => {
  console.log('Kết nối MongoDB thành công.');
});


// Sử dụng body-parser middleware để xử lý dữ liệu từ request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import và sử dụng router cho các chức năng 
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const addressRouter = require('./routers/addressRouter');
const orderRouter = require('./routers/orderRouter');
const checkoutRouter = require('./routers/checkoutRouter');
const discountRoutes = require('./routers/discountRoutes');
const favoriteRouter = require('./routers/favoriteRouter');
const reviewRouter = require('./routers/reviewRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const notificationRouter = require('./routers/notificationRouter');
const messageRouter = require('./routers/messageRouter');

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', orderRouter);
app.use('/api/discount', discountRoutes);
app.use('/api/favorite', favoriteRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/message', messageRouter);


// Import và sử dụng router cho các chức năng admim
const adminRouter = require('./routers/adminRouter');
const reportManagementRouter = require('./routers/reportManagementRouter');
const OrderManagementRouter = require('./routers/OrderManagementRouter');
const ProductManagementRouter = require('./routers/ProductManagementRouter');
const feedbackManagementRouter = require('./routers/feedbackManagementRouter');
const customerManagementRouter = require('./routers/customerManagementRouter');
const discountManagementRouter = require('./routers/discountManagementRouter');
const messageManagementRouter = require('./routers/messageManagementRouter');

app.use('/api/admin', adminRouter);
app.use('/api/admin/Products', ProductManagementRouter);
app.use('/api/admin/Orders', OrderManagementRouter);
app.use('/api/admin/customers', customerManagementRouter);
app.use('/api/admin/reports', reportManagementRouter);
app.use('/api/admin/discounts', discountManagementRouter);
app.use('/api/admin/feedbacks', feedbackManagementRouter);
app.use('/api/admin/message', messageManagementRouter);

// Xử lý lỗi 404 - Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Xử lý lỗi 500 - Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Cổng mặc định
const PORT = process.env.PORT || 5000;

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
