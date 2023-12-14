import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faStar } from '@fortawesome/free-solid-svg-icons';
export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function uploadPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/place/upload/link', { url: photoLink });
      const uploadedUrl = response.data.url;
      onChange((prev) => [...prev, { url: uploadedUrl }]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error adding photo by link:', error);
    }
  }

  async function uploadPhotoFromGallery(files) {
    const data = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Check if the file type is not 'image/jpeg'
      if (file.type !== 'image/jpeg') {
        alert('Please upload only JPG images.');
        return;
      }
  
      data.append('photos', file);
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/place/upload/gallery', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      console.log(response);
  
      const uploadedUrls = response.data.urls;
      // Decode base64 images and update the state
      const decodedImages = uploadedUrls.map((url) => ({ url: `data:image/jpg;base64,${url}` }));
      onChange((prev) => [...prev, ...decodedImages]);
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo.url !== filename)]);
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([{ url: filename }, ...addedPhotos.filter((photo) => photo.url !== filename)]);
  }

  return (
    <>
      <div className="flex   gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder="Add using a link ....jpg"
          className='w-1/2 border-2 rounded-xl p-2'
        />
        <button onClick={uploadPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
        <button className="bg-gray-200 px-4 rounded-2xl"
         onClick={() => {
          console.log("Add from Gallery button clicked");
          document.getElementById("gallery-input").click();
        }}
        >
          Add from Gallery
          <input
            id="gallery-input"
            type="file"
            name="photos"
            className="hidden"
            onChange={(ev) => uploadPhotoFromGallery(ev.target.files)}
            multiple
          />
        </button>
      </div>
      <div className="mt-2 flex flex-row flex-wrap w-full gap-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => (
            <div className="w-64 h-32 flex relative" key={index}>
              <img className="rounded-2xl w-full object-cover" src={photo.url} alt="" />
              <button
                onClick={(ev) => removePhoto(ev, photo.url)}
                className="cursor-pointer absolute bottom-1 right-1 bg-black bg-opacity-50 rounded-2xl py-2 px-3"
              >
               <FontAwesomeIcon icon={faTrash} className='text-2xl text-white'
               />
              </button>
              <button
                onClick={(ev) => selectAsMainPhoto(ev, photo.url)}
                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3"
              >
                <FontAwesomeIcon icon={faStar} className='text-2xl text-white hover:text-yellow-300'/>
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
