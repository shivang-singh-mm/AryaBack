const Review = require("../models/Review");
const Property = require("../models/Property");
const ObjectId = require("mongodb").ObjectId;

const getAllReviews = async (req, res) => {
  const reviews = await Review.find();
  return res.status(200).json(reviews);
};

// use id(propertyId) to find the property and add review
const createReview = async (req, res) => {
  try {
    // req.body.createdBy = req.user.userId;
    const { userId, propertyId, rating, description } = req.body;

    if (!userId || !propertyId || !rating || !description) {
      return res.status(401).send("Please fill the missing fields");
    }

    const review = await Review.create({ ...req.body });

    const currentProperty = await Property.findById({ _id: propertyId });
    if (!currentProperty) {
      return res.status(401).send("No property with given id");
    }

    currentProperty.reviews.push(review);
    await currentProperty.save();

    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
  }
};

const getReviewsByReviewId = async (req, res) => {
  const { id } = req.params;
  const review = await Review.find({ _id: id });
  return res.status(200).json(review);
};

const getReviewsByPropertyId = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if the propertyId is a valid ObjectId
    if (!ObjectId.isValid(propertyId)) {
      return res.status(400).json({ msg: "Invalid propertyId" });
    }

    // Find reviews that match the provided propertyId
    const reviews = await Review.find({ propertyId: propertyId });

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ msg: "No reviews found for this propertyId" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const review = await Review.findById({ _id: reviewId });

    if (!review) {
      return res.status(404).json({ msg: `No review with id: ${reviewId}` });
    }

    await Review.findByIdAndDelete({ _id: reviewId });
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllReviews,
  createReview,
  // getReviewsByReviewId,
  deleteReview,
  getReviewsByPropertyId,
};
