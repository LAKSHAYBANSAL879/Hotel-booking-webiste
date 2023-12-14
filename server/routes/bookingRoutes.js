const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const bookingRouter=express.Router();
const bookingController=require('../controllers/bookingController');
bookingRouter.post('/saveBooking',bookingController.saveBooking);
bookingRouter.get('/getBooking',bookingController.getBookings);

module.exports=bookingRouter;