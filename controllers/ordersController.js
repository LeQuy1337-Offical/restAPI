const Order = require('../models/Order');


module.exports = {

  getUserOrders: async (req, res, next) => {
    const userId = req.params.id;


    try {
      const userOrders = await Order.findById({ userId })
        .populate({
          path: "productId",
          select: "-description -product_location"
        }).exec();
      
      res.status(200).json(userOrders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}