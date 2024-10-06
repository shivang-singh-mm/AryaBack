const express = require('express');
const router = express.Router();

const {
  getSlides,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide,
} = require('../controllers/slide');

router.route('/').get(getSlides).post(createSlide);
router.route('/:id').get(getSlideById).patch(updateSlide).delete(deleteSlide);

module.exports = router;