const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
