import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Account } from '../Account/Account';
import { Navigate, useParams } from 'react-router-dom';
import PhotosUploader from '../Places/PhotosUploder.jsx';
import Perks from '../Places/Perks.jsx';
import { UserContext } from '../../UserContext.jsx';

export default function Places() {
  const { title: placeTitle } = useParams(); // Use placeTitle instead of id
  const { ownerName: userOwnerName, setOwnerName: setUserOwnerName } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [ownerName, setOwnerName] = useState(userOwnerName || ''); // Initialize with the user's ownerName
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!placeTitle) {
      return;
    }

    axios.get(`/places/${placeTitle}`).then((response) => {
      const { data } = response;
      console.log(response);
      setOwnerName(data.owner);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [placeTitle]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      owner: ownerName,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (placeTitle) {
        // update
        await axios.put(`http://localhost:8080/api/v1/place/update-place/${placeTitle}`, placeData);
      } else {
        // new place
        await axios.post('http://localhost:8080/api/v1/place/create-place', placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error saving place:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/accomodations'} />;
  }

  return (
    <div className="overflow-hidden">
      <Account />
      <form onSubmit={savePlace} className="w-full font-bold mx-20 mt-8">
        <label htmlFor="ownerName">Owner Name</label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={ownerName}
          onChange={(ev) => setOwnerName(ev.target.value)}
          placeholder="Owner's Name"
          className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
        />
        {preInput('Title', 'Title for your place it should be short and catchy as in advertisement')}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title of your property"
          className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
        />
        {preInput('Address', 'Address to this place')}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
          className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
        />
        {preInput('Photos', 'upload minimum 5 photos')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Description of the place')}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="textarea w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
        />
        {preInput('Perks', 'Select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} className="flex flex-row flex-wrap" />
        </div>
        {preInput('Extra info', 'House rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="textarea w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
        />
        {preInput(
          'Check in&out times',
          'Add check-in and out times, remember to have some time window for cleaning the room between guests'
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
              className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
              className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className="w-3/4 border-2 p-2 border-gray-200 rounded-xl focus:border-black"
            />
          </div>
        </div>
        <button className="flex pl-4 pr-4 mt-3 justify-center align-middle items-center m-auto mb-2 text-2xl bg-red-500 text-white font-bold rounded-xl p-2 mt-4">Save</button>
      </form>
    </div>
  );
}

