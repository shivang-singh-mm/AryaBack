const express = require('express');
const router = express.Router();


const {
  getAllPropertys,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  createProperty
} = require('../controllers/property');

router.route('/').get(getAllPropertys).post(createProperty);
router.route('/:id').get(getSingleProperty).patch(updateProperty).delete(deleteProperty);

module.exports = router;