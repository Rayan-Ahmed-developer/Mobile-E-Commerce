const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        price: Number
    }],
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "cancelled", "processing"],
        default: "pending"
    },
    userName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;