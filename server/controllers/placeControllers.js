const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Place = require('../models/places');
const jwtSecret = "key_secret";

const verifyToken = (req, res, next) => {
    const token1 = req.cookies.token1;

    if (!token1) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token1, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};

exports.createPlace = async (req, res) => {
  try {
    

      const {
          owner,title, address, addedPhotos, description, price,
          perks, extraInfo, checkIn, checkOut, maxGuests,
      } = req.body;

      // Use the owner's name from the decoded token
      const placeDoc = await Place.create({
          owner,
          price,
          title,
          address,
          addedPhotos: Array.isArray(addedPhotos) ? addedPhotos.map(photo => photo.url) : [],
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
      });

      // Generate a new JWT token with updated user information
      if (owner) {
          const newToken = jwt.sign({ name:owner}, jwtSecret);
          res.cookie('token1', newToken, { httpOnly: true });
      }

      res.json(placeDoc);
  } catch (error) {
      console.error('Error creating place:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

exports.getUserPlaces = async (req, res) => {
  try {
      const { token1 } = req.cookies;
      const userData = jwt.verify(token1, jwtSecret);
      const { name } = userData;
      const userPlaces = await Place.find({ owner: name });
      res.json(userPlaces);
  } catch (error) {
      console.error('Error getting user places:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};



exports.getPlaceByTitle = async (req, res) => {
  try {
    const { title } = req.params;

   
    const place = await Place.findOne({ title });

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error getting place by title:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

  

exports.updatePlace = async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      id, title, address, addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;

    const userData = jwt.verify(token, jwtSecret);
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos: addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
      });
      await placeDoc.save();
      res.json('ok');
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

exports.getAllPlaces = async (req, res) => {
  try {
    const allPlaces = await Place.find();
    res.json(allPlaces);
  } catch (error) {
    console.error('Error getting all places:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
