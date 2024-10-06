const express = require('express');
const router = express.Router();


const {
  getAllImages,
  getSingleImage,
  updateImage,
  deleteImage,
  createImage
} = require('../controllers/image');

router.route('/').post(createImage).get(getAllImages);
router.route('/:id').get(getSingleImage).patch(updateImage).delete(deleteImage);

module.exports = router;