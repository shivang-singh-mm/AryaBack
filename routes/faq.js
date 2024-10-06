const express = require('express');
const { getAllFaqs, createFaq, updateFaq, deleteFaq, getSingleFaq } = require('../controllers/faq');
const router = express.Router();


router.route('/faq').get(getAllFaqs).post(createFaq);
router.route('/faq/:id').patch(updateFaq).delete(deleteFaq).get(getSingleFaq);

module.exports = router;