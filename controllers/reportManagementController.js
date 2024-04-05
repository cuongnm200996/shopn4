const Report = require('../models/reportModel');
const Order = require('../models/orderModel');

//Phân tích tạo báo cáo
exports.generateReport = async () => {
    try {
        // Tính toán doanh thu tổng cộng
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'completed' } }, // Lọc ra các đơn hàng đã hoàn thành
            { $group: { _id: null, total: { $sum: '$totalPrice' } } } // Tính tổng giá trị các đơn hàng
        ]);
        const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

        // Đếm tổng số đơn hàng
        const totalOrders = await Order.countDocuments();

        // Tìm sản phẩm bán chạy nhất
        const bestsellingProducts = await Order.aggregate([
            { $unwind: '$products' }, // Tách ra từng sản phẩm trong mỗi đơn hàng
            { $group: { _id: '$products.productId', totalQuantity: { $sum: '$products.quantity' } } }, // Tính tổng số lượng của từng sản phẩm
            { $sort: { totalQuantity: -1 } }, // Sắp xếp giảm dần theo số lượng
            { $limit: 5 } // Giới hạn chỉ lấy 5 sản phẩm bán chạy nhất
        ]);

        // Đếm số đơn hàng thành công
        const successfulOrders = await Order.countDocuments({ status: 'completed' });

        // Đếm số đơn hàng thất bại
        const failedOrders = await Order.countDocuments({ status: 'failed' });

        // Tính tỷ lệ đơn hàng thành công
        const successRate = totalOrders > 0 ? (successfulOrders / totalOrders) * 100 : 0;

        // Tạo báo cáo mới
        const report = new Report({
            revenue,
            totalOrders,
            bestsellingProducts,
            successfulOrders,
            failedOrders,
            successRate,
            createdAt: new Date()
        });

        // Lưu báo cáo vào cơ sở dữ liệu
        await report.save();

        console.log('Report generated successfully');
    } catch (error) {
        console.error('Error generating report:', error);
    }
};

//Xem tất cả báo cáo
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Xem chi tiết từng báo cáo
exports.getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        // Tìm báo cáo trong cơ sở dữ liệu bằng ID
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};