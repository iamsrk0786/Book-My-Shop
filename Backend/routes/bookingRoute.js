const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const admin = require('../middleware/admin');
const bookingController = require('../controller/bookingController') ;


router.post('/create_booking', protect, bookingController.createBooking)
router.get('/bookings', protect , admin , bookingController.getBooking)


module.exports = router ;