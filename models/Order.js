const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: Number,
    foodcourt_id: Number,
    fname: String,
    description: String,
    amount: Number,
    delivery: {
        name: String,
        mobile: String,
        email: String,
        locality: String,
        city: String
    }
});

var Orders = mongoose.model('Orders', OrderSchema, 'manage_orders');
module.exports = Orders;
