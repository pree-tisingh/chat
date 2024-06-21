const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/contactus', contactController.getContactUs);
router.post('/contactus', contactController.postContactUs);

module.exports = router;
