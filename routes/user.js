const express = require("express");
const router = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getWishlist,
  removeFromWishlist,
  addToWishlist,
} = require("../controllers/user");

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/wishlist/:id").get(getWishlist).patch(addToWishlist);
router.route("/wishlist/remove/:id").patch(removeFromWishlist);

module.exports = router;
