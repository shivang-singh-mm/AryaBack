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
  addAdmin,
  removeAdmin,
  getAllAdmin,
} = require("../controllers/user");

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/wishlist/:id").get(getWishlist).patch(addToWishlist);
router.route("/wishlist/remove/:id").patch(removeFromWishlist);
router.route("/admin/add/").put(addAdmin)
router.route("/admin/remove").put(removeAdmin)
router.route("/admin/fetch").get(getAllAdmin)

module.exports = router;
