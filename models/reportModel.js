const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    revenue: { type: Number, required: true },
    totalOrders: { type: Number, required: true },
    bestsellingProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    successfulOrders: { type: Number, required: true },
    failedOrders: { type: Number, required: true },
    successRate: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
