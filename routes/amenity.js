const express = require('express');
const router = express.Router();


const {
  getAllAmenities,
  getSingleAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require('../controllers/amenity');

router.route('/').get(getAllAmenities).post(createAmenity);
router.route('/:id').get(getSingleAmenity).patch(updateAmenity).delete(deleteAmenity);

module.exports = router;