import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {   
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imgLink : {
        type: String,
        default : " " 
    }
});

export default mongoose.model("Product", productSchema);