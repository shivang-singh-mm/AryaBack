const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  createReview,
  // getReviewsByReviewId,
  getReviewsByPropertyId,
  deleteReview,
} = require("../controllers/review");

router.route("/").get(getAllReviews).post(createReview);
router.route("/:id").get(getReviewsByPropertyId); //.delete(deleteReview);

module.exports = router;
