const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    image:{
        type:String,
        required:true
    },
    timestamp : {
        type:String,
        default:Date.now()
    }
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;