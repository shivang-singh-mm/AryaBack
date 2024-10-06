const Order = require("../models/Order");

const getOrders = async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json(orders);
};

const getOrdersId = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ userId: id });
  return res.status(200).json(orders);
};

const getSingleOrderById = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ _id: id });
  return res.status(200).json(orders);
};

const getPastOrders = async (req, res) => {
  const { id } = req.params;
  // const currentTime = getCurrentTime();
  const currentUTCDate = new Date();

  // Adjust the date to IST (UTC+5:30)
  const currentISTDate = new Date(currentUTCDate.getTime() + 330 * 60000);

  const orders = await Order.find({
    userId: id,
    check_out: { $lt: currentISTDate },
  });

  return res.status(201).json(orders);
};

const getCurrentOrders = async (req, res) => {
  const { id } = req.params;
  // const currentTime = getCurrentTime();
  const currentUTCDate = new Date();

  // Adjust the date to IST (UTC+5:30)
  const currentISTDate = new Date(currentUTCDate.getTime() + 330 * 60000);

  const orders = await Order.find({
    userId: id,
    check_out: { $gt: currentISTDate },
  });

  return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  try {
    // req.body.createdBy = req.user.userId;
    const {
      userId,
      propertyId,
      amenities,
      guest,
      accomodation,
      check_in,
      check_out,
    } = req.body;

    if (
      !userId ||
      !propertyId ||
      !amenities ||
      !guest ||
      !accomodation ||
      !check_in ||
      !check_out
    ) {
      return res.status(401).send("Please fill the missing fields");
    }

    const order = await Order.create({ ...req.body });
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params;
    const order = await Order.findById({ _id: orderID });

    if (!order) {
      return res.status(404).json({ msg: `No task with id : ${orderID}` });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderID },
      req.body,
      {
        new: true,
        // runValidators:true,
      }
    );

    return res.status(201).json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
};

const updateReviewed = async (req, res) => {
  try {
    const { id: orderID } = req.params;
    const order = await Order.findById({ _id: orderID });

    if (!order) {
      return res.status(404).json({ msg: `No task with id : ${orderID}` });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderID },
      { reviewed: true },
      { new: true }
    );

    return res.status(201).json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findById({ _id: orderID });
  if (!order) {
    return res.status(404).json({ msg: `No task with id: ${orderID}` });
  }

  await Order.findByIdAndDelete({ _id: orderID });
  return res.status(200).json(order);
};
const deleteOrdersByPropertyId = async (req, res) => {
  const { id: propertyId } = req.params;
  const orders = await Order.deleteMany({ propertyId: propertyId });

  if (!orders) {
    return res
      .status(404)
      .json({ msg: `No orders with proeprty id: ${propertyId}` });
  }

  return res.status(200).json(orders);
};

module.exports = {
  getOrders,
  getOrdersId,
  createOrder,
  updateOrder,
  deleteOrder,
  getPastOrders,
  getCurrentOrders,
  getSingleOrderById,
  deleteOrdersByPropertyId,
  getSingleOrderById,
  updateReviewed,
};
