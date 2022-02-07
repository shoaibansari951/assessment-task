const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    details: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;