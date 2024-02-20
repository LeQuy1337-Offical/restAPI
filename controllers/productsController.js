const Product = require("../models/Products");

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        console.log(newProduct);
        try {
            await newProduct.save();
            res.status(200).json("Product created successfully");
        } catch (error) {
            res.status(500).json("failed to create Product");
            console.log(error);
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("failed to get all products");
            console.log(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("failed to get product");
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*",
                            },
                        },
                    },
                },
            ]);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json("failed to get product");
        }
    },
};
