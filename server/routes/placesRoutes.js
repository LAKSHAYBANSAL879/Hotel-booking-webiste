const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const upload = multer();
const placesRouter = express.Router();

const placesController = require('../controllers/placeControllers');

placesRouter.post('/create-place', placesController.createPlace);
placesRouter.get('/user-places', placesController.getUserPlaces);


placesRouter.put('/update-place', placesController.updatePlace);
placesRouter.get('/getallPlaces', placesController.getAllPlaces);
placesRouter.get('/:title', placesController.getPlaceByTitle);

const pictureSchema = new mongoose.Schema({
  url: String,
});

const Picture = mongoose.model('Picture', pictureSchema);

placesRouter.use(cors());

placesRouter.post('/upload/link', upload.none(), async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Invalid request. Provide a URL.' });
    }

    const newPicture = new Picture({ url });
    await newPicture.save();

    res.status(201).json({ message: 'Picture uploaded successfully!', url: newPicture.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

placesRouter.post('/upload/gallery', upload.array('photos'), async (req, res) => {
  try {
    const uploadedFiles = req.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'Invalid request. Provide at least one file.' });
    }

    const savedPictures = await Promise.all(
      uploadedFiles.map(async (file) => {
        const newPicture = new Picture({ url: file.buffer.toString('base64') });

        return await newPicture.save();
      })
    );

    res.status(201).json({
      message: 'Pictures uploaded successfully!',
      urls: savedPictures.map((picture) => picture.url),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = placesRouter;

