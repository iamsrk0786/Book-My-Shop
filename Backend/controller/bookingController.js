const Booking = require('../model/booking');
exports.createBooking = async (req, res, next) => {
  try {
    const { name, date, time, serviceId } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      serviceId,
      name,
      date,
      time,
    });
    if (!booking) {
      const error = new Error('Failed to create booking');
      error.statusCode = 400;
      throw error;
    }

    req.io.emit('newbooking', booking) ;        // here we emit an event which can be listen in frontend
   

    res.status(201).json({
      message: 'Success',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find().populate('userId').populate('serviceId');

    res.status(200).json({
      booking,
    });
  } catch (error) {
    next(error);
  }
};
