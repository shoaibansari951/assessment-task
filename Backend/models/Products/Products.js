const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    timestamp : {
        type:String,
        default:Date.now()
    }
    // description: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true,
    //     default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F527182705879098984%2F&psig=AOvVaw2_X_Z_X_X_X_X_X_X_X&ust=1589788240870000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDyq-_X-oCFQAAAAAdAAAAABAD"
    // },
});
const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
