const mongoose=require('mongoose');
const placeSchema=new mongoose.Schema({
    owner:String,
   title:String,
   address:String,
   photos:[String],
   description:String,
   perks:[String],
   extraInfo:String,
   checkIn:Number,
   checkOut:Number,
   maxGuests:Number, 
});

const PlaceSchema=mongoose.model('Place',placeSchema);
module.exports=PlaceSchema;