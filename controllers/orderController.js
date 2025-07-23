const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const order = await Order.create({
    product: req.body.product,
    quantity: req.body.quantity,
    buyer: req.user._id
  });
  res.json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user._id }).populate('product');
  res.json(orders);
};
