const Product = require("../models/Products");
const Cart = require("../models/Cart");

module.exports = {
     addToCart : async (req, res) => {
        const { userId, cartItem, quantity } = req.body;

        console.log(cartItem)
        

        try {
            let cart = await Cart.findOne({ userId });

            if (cart) {
                // Tìm kiếm sản phẩm trong giỏ hàng
                const existingProduct = cart.products.find(
                    (product) => product.cartItem.toString() === cartItem._id
                );

                if (existingProduct) {
                    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
                    existingProduct.quantity += quantity;
                } else {
                    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào mảng
                    cart.products.push({ cartItem, quantity });
                }
            } else {
                // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
                cart = new Cart({
                    userId,
                    products: [ { cartItem, quantity } ],
                });
            }
 
            await cart.save();
            res.status(200).json("Product added to cart");
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getCart: async (req, res) => {
        const userId = req.params.id;

        try {
            const cart = await Cart.find({ userId }).populate(
                "products.cartItem",
                "_id title supplier price imagUrl"
            );

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteCartItem: async (req, res) => {
        const cartItemId = req.params.cartItemId;

        try {
            const updateCart = await Cart.findOneAndUpdate(
                { "products._id": cartItemId },
                { $pull: { products: { _id: cartItemId } } },
                { new: true }
            );

            if (!updateCart) {
                return res.status(404).json("Cart item not found");
            }

            res.status(200).json(updateCart);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    decrementCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;

        try {
            const cart = Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).json("cart not fount");
            }

            const existingProduct = cart.products.find(
                (product) => product.cartItem.toString() === cartItem
            );

            if (!existingProduct) {
                return res.status(404).json("Product not found");
            }

            if (existingProduct.quantity === 1) {
                cart.products = cart.products.filter(
                    (product) => product.cartItem.toString() !== cartItem
                );
            } else {
                existingProduct.quantity -= 1;
            }
            await cart.save();

            if (existingProduct.quantity === 0) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { cartItem } } }
                )
            }

            res.status(200).json("Product updated successfully")
        } catch (error) { }
    },
};
