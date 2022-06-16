import mongoose from "mongoose";

const CartCollection = 'cart';

const CartSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true, index: true},
    date: {type: Date, required: true},
    product: {type: Array, required: true}
})

const Cart = mongoose.model(CartCollection, CartSchema);

export default Cart;