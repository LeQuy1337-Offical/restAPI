const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                cartItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
