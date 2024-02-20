const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        supplier: { type: String, required: true },
        price: { type: Number, required: true }, // Sửa kiểu dữ liệu thành Number
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
        product_location: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
