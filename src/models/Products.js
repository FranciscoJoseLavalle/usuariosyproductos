import mongoose from "mongoose";

const collection = "Products";

const productsSchema = new mongoose.Schema({
    products: Array,
    userId: String
})

const productsService = mongoose.model(collection,productsSchema);

export default productsService;