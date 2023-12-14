const mongoose=require('mongoose');
const placeSchema=new mongoose.Schema({
    owner:String,
   title: {
    type:String,
    unique:[true,"unique title is must"]
   },
   address:String,
   addedPhotos:[String],
   description:String,
   perks:[String],
   extraInfo:String,
   checkIn:Number,
   checkOut:Number,
   price:Number,
   maxGuests:Number, 
});

const PlaceSchema=mongoose.model('Place',placeSchema);
module.exports=PlaceSchema;