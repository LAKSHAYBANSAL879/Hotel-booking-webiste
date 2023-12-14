const Booking = require('../models/bookings');

exports.saveBooking = async (req, res) => {
  const {
    checkInDate,
    checkOutDate,
    numGuests,
    totalAmount,
    title,
    bookingName,
    email,
    mobile,
  } = req.body;
console.log(req.body);
  try {
    const newBooking = new Booking({
      checkInDate,
      checkOutDate,
      numGuests,
      totalAmount,
      title,
      bookingName,
      email,
      mobile,
    });

    await newBooking.save();
    res.json({ message: 'Booking details saved successfully' });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getBookings = async (req, res) => {
  try {
   
    const bookings = await Booking.find();

    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};