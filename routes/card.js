const express = require('express');
const router = express.Router();


const {
  getAllCards,
  getSingleCard,
  createCard,
  updateCard,
  deleteCard,
} = require('../controllers/card');

router.route('/').get(getAllCards).post(createCard);
router.route('/:id').get(getSingleCard).patch(updateCard).delete(deleteCard);

module.exports = router;