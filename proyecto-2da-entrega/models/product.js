import mongoose from "mongoose";

const ProductCollection = 'product';

const ProductSchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const Product = mongoose.model(ProductCollection, ProductSchema);

export default Product;