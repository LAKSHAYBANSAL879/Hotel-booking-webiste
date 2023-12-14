const mongoose=require('mongoose');
const bookingSchema = new mongoose.Schema({
    checkInDate: String,
    checkOutDate: String,
    numGuests: Number,
    totalAmount: Number,
    title: String,
    bookingName: String,
    email: String,
    mobile: String,
  });
  
  const Booking= mongoose.model('Booking', bookingSchema);
  module.exports=Booking;