import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import { Account } from '../Account/Account';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ownerName } = useContext(UserContext);

  useEffect(() => {
    fetch('https://hotel-booking-webiste.vercel.app/api/v1/booking/getBooking')
      .then(response => response.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  const getHotelDetails = async (title) => {
    try {
      const response = await fetch(`https://hotel-booking-webiste.vercel.app/api/v1/place/${encodeURIComponent(title)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      return null;
    }
  };

  const renderBookings = () => {
    // Filter bookings based on matching bookingName and user name
    const filteredBookings = bookings.filter(booking => booking.bookingName === ownerName);

    return filteredBookings.map(booking => (
      <>
     
      <div key={booking.id} className='flex flex-col mb-8 bg-gray-200 p-4 m-4 rounded-3xl'>
      
        <div className='flex flex-row mb-4'>
          <div className='flex-shrink-0 p-4'>
            {/* <img src={booking.title} alt="" className='w-24 h-24 object-cover rounded' /> */}
          </div>
          <div className='flex-grow p-4'>
            <HotelDetails title={booking.title} />
          </div>
        </div>
        <div className='p-4 bg-white rounded-3xl text-lg'>
          <h2 className='text-2xl font-bold mb-2'>Booking Details</h2>
          <p>Check-In Date: {booking.checkInDate}</p>
          <p>Check-Out Date: {booking.checkOutDate}</p>
          <h1 className='text-xl'><span>Total Amount :</span><span className='font-bold text-2xl'>Rs{booking.totalAmount}</span></h1>
          <h1 className='text-xl'><span>Number of Guests :</span><span className='font-bold text-2xl'>{booking.numGuests}</span></h1>

          {/* Add more booking details here */}
        </div>
      </div>
      </>
    ));
  };

  const HotelDetails = ({ title }) => {
    const [hotelDetails, setHotelDetails] = useState(null);

    useEffect(() => {
      // Check if the title has changed before fetching data
      if (title !== hotelDetails?.title) {
        getHotelDetails(title).then(data => setHotelDetails(data));
      }
    }, [title, hotelDetails]); 

    if (!hotelDetails) {
      return <p>Loading hotel details...</p>;
    }

    return (
      <>
      
       <Link   to={`/property/${encodeURIComponent(title)}`}className='flex flex-row w-full gap-10'>
        <div className='flex w-1/2'>
          <img src={hotelDetails.addedPhotos[0] || hotelDetails.addedPhotos[1]} alt="" className='w-96 h-40 object-cover rounded-3xl' />
        </div>
        <div className='flex flex-col'>
          <h3 className='text-2xl font-extrabold'>{hotelDetails.title}</h3>
          <p className='font-bold text-lg'>{hotelDetails.address}</p>
          <p>{hotelDetails.description}</p>
        </div>
      </Link>
      </>
   
    );
  };

  return (

    <div>
      <Account/>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div>
          {/* <h1 className='text-3xl font-bold mb-4'>Your Bookings</h1> */}
          {renderBookings()}
        </div>
      )}
    </div>
  );
};

export default Bookings;
