const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrdersId,
  createOrder,
  updateOrder,
  deleteOrder,
  getPastOrders,
  getSingleOrderById,
  getCurrentOrders,
  deleteOrdersByPropertyId,
  updateReviewed,
} = require("../controllers/order");

router.route("/").get(getOrders).post(createOrder);
router
  .route("/:id")
  .get(getSingleOrderById)
  .patch(updateOrder)
  .delete(deleteOrder);

// id => user
router.route("/past/:id").get(getPastOrders);
router.route("/current/:id").get(getCurrentOrders);
router.route("/user/:id").get(getOrdersId);

//id => propertyId
router.route("/property/:id").delete(deleteOrdersByPropertyId);

router.route("/reviewed/:id").patch(updateReviewed);

module.exports = router;
