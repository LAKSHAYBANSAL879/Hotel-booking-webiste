import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faStar,
  faImage,
  faLocationPin,
  faClock,
  faPeopleGroup,
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons';
import Perks from './Perks';
import { useNavigate } from 'react-router-dom';

const PropertyDetails = () => {
  const Navigate = useNavigate();

  const { title } = useParams();
  const [place, setProperty] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numGuests: 1, // Default value
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/place/${title}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [title]);

  const handleShowAllPhotos = () => {
    window.open(`/property/${encodeURIComponent(title)}/photos`, '_blank');
  };

  const getRandomRating = () => {
    return (Math.random() * (5 - 4) + 4).toFixed(1);
  };

  const handleBooking = () => {
    const { checkInDate, checkOutDate, numGuests } = formData;

    // Calculate the number of days between check-in and check-out
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const numDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));

    // Calculate the total cost
    const roomPrice = place.price * numDays;
    let calculatedTotalCost = 0;

    if (numGuests <= 2) {
      // For 1 room
      calculatedTotalCost = roomPrice;
    } else {
      // For multiple rooms
      const numRooms = Math.ceil(numGuests / 2);
      calculatedTotalCost = roomPrice * numRooms;
    }

    setTotalCost(calculatedTotalCost);

    // Store booking information in state
    setBookingInfo({
      numDays,
      numGuests,
    });
    Navigate('/booking', {
      state: {
        place,
        title: place.title,
        ...formData,
        totalAmount: calculatedTotalCost.toFixed(2),
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update formData state with the new values
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  useEffect(() => {
   
    if (place && formData.checkInDate && formData.checkOutDate && formData.numGuests) {
      const { checkInDate, checkOutDate, numGuests } = formData;
  
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const numDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
  
      const roomPrice = place.price * numDays;
      let calculatedTotalCost = 0;
  
      if (numGuests <= 2) {
        calculatedTotalCost = roomPrice;
      } else {
        const numRooms = Math.ceil(numGuests / 2);
        calculatedTotalCost = roomPrice * numRooms;
      }
  
      setTotalCost(calculatedTotalCost);
  
      setBookingInfo({
        numDays,
        numGuests,
      });
    }
  }, [place, formData.checkInDate, formData.checkOutDate, formData.numGuests]);
  return (
    <div className='bg-gray-200 m-5 h-full rounded-3xl '>
      {place ? (
        <div className='flex flex-col justify-start'>
          <div className='flex flex-row justify-around'>
            <div className='flex flex-col gap-1 mb-3 mt-3'>
              <h1 className='text-3xl mr-96 font-extrabold uppercase'>{place.title}</h1>
              <h2 className='text-xl font-semibold first-letter:uppercase'>
                <FontAwesomeIcon icon={faLocationPin} />
                {place.address}
              </h2>
            </div>
            <div>
              <div className='mt-3 text-2xl'>
                <h1 className='font-bold'>
                  <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                  {getRandomRating()}
                </h1>
              </div>
              <div className='mt-3'>
                <h1>
                  <FontAwesomeIcon icon={faHeart} className='text-3xl text-red-500' />
                </h1>
              </div>
            </div>
          </div>
          <div className='w-3/4 m-auto h-96 gap-2 rounded-3xl flex '>
            <img src={place.addedPhotos[0]} alt='' className='w-2/3 rounded-3xl h-full' />
            <div className='flex gap-2 flex-col w-1/3 relative'>
              {place.addedPhotos.slice(1).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt=''
                  className={`h-1/2 rounded-3xl ${index > 1 ? 'hidden' : ''}`}
                />
              ))}
              {place.addedPhotos.length > 2 && (
                <button
                  onClick={handleShowAllPhotos}
                  className='absolute bottom-2 right-2 bg-black text-white py-2 px-4 rounded cursor-pointer'
                >
                  <FontAwesomeIcon icon={faImage} /> Show More Photos
                </button>
              )}
            </div>
          </div>
          <div className='flex flex-row justify-around'>
            <div className='flex flex-col w-2/4'>
              <h1 className='text-2xl font-bold ml-8 mt-4 border-b-4 border-black w-fit '>
                Description
              </h1>
              <h2 className='ml-8 text-xl font-semibold font-serif mt-3'>{place.description}</h2>
              <div className='flex flex-row text-xl font-semibold text-black gap-3 ml-8 mt-3'>
                <h3>
                  <FontAwesomeIcon icon={faClock} />
                  CheckIn:{place.checkIn}
                </h3>
                <h3>
                  <FontAwesomeIcon icon={faClock} />
                  CheckOut:{place.checkOut}
                </h3>
                <h3>
                  <FontAwesomeIcon icon={faPeopleGroup} />
                  Max Guests(in Room):{place.maxGuests}
                </h3>
              </div>
              <div className='flex ml-8 mt-4 w-2/4 flex-col'>
                <h1 className='text-2xl font-bold  border-b-4 border-black w-fit '>Perks</h1>
                <div className='w-fit text-lg font-bold'>
                  <Perks selected={place.perks} className='cursor-none' />
                </div>
              </div>
            </div>

            <div className='w-1/3 flex rounded-2xl h-fit p-2 flex-col bg-white mt-5 mb-4'>
              <h1 className=' p-2 flex align-middle  mx-auto'>
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className='mt-1 text-3xl font-bold'
                />
                <span className='mr-2 text-4xl font-extrabold'>{place.price}/- </span> per
                night
              </h1>
              <div className='flex flex-col '>
                <form
                  action='#'
                  method='post'
                  className='flex flex-row justify-between ml-3 '
                  onChange={handleInputChange}
                >
                  <div className='flex flex-col'>
                    <label htmlFor='checkInDate' className='font-bold text-xl'>
                      CheckIn:
                    </label>
                    <input
                      type='date'
                      name='checkInDate'
                      id='checkInDate'
                      className='w-32 border-2 border-gray-200 focus:border-black'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='flex flex-col mr-4'>
                    <label htmlFor='checkOutDate' className='font-bold text-xl'>
                      CheckOut:
                    </label>
                    <input
                      type='date'
                      name='checkOutDate'
                      id='checkOutDate'
                      className='w-32 border-2 border-gray-200 focus:border-black'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='flex flex-col mr-4'>
                    <label htmlFor='numGuests' className='font-bold text-xl'>
                      Guests:
                    </label>
                    <input
                      type='number'
                      name='numGuests'
                      id='numGuests'
                      className='w-32 border-2 border-gray-200 focus:border-black'
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
                <button
                  type='submit'
                  className='w-3/4 mx-auto mt-3 rounded-3xl p-2 bg-red-500 text-white font-bold text-xl'
                  onClick={(e) => {
                    e.preventDefault();
                    handleBooking();
                  }}
                >
                  Book A Room
                </button>
                {totalCost > 0 && (
                  <div className='text-xl ml-3 mt-3'>
                    <p className='flex justify-between'>
                      Total Cost:<span className='font-bold'> Rs {totalCost.toFixed(2)}</span>
                    </p>
                    <p className='text-lg border-b-2 border-black w-fit'>Price Breakup:</p>
                    <p className='flex justify-between'>
                      Room Price: <span>Rs {place.price.toFixed(2)} per night</span>{' '}
                    </p>
                    <p className='flex justify-between'>
                      Number of Rooms: <span>{Math.ceil(bookingInfo?.numGuests / 2)}</span>
                    </p>
                    <p className='flex justify-between'>
                      Number of Nights: <span>{bookingInfo?.numDays}</span>
                    </p>
                    <p className='flex justify-between'>
                      Number of Guests: <span>{bookingInfo?.numGuests}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-24'>
            <h1 className='text-2xl font-bold border-b-4 border-black w-fit'>Extra Info</h1>
            <p className='text-lg font-semibold first-letter:uppercase'>{place.extraInfo}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PropertyDetails;
