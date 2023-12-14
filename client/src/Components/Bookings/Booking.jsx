import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faWallet } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
const Booking = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const [bookingName, setBookingName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  if (!state) {
    return <div>No booking information found</div>;
  }

  const { checkInDate, checkOutDate, numGuests, totalAmount, place,title } = state;

  function cancelBooking() {
    Navigate('/');
  }

  function handlePayment() {

    fetch('http://localhost:8080/api/v1/booking/saveBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkInDate,
        checkOutDate,
        numGuests,
        totalAmount,
        title,
        bookingName,
        email,
        mobile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Booking details saved:', data);
        emailjs.send(
          'service_vzmpatt', // Replace with your emailjs service ID
          'template_vsttvtw', // Replace with your emailjs template ID
          {
            to_email: email,
            name: bookingName,
            
          },
          'oBEiH_ZT_LChWgZx4' // Replace with your emailjs user ID
        );
        Navigate('/payment');
      })
      .catch((error) => {
        console.error('Error saving booking details:', error);
      });
  }

  return (
    <div className='flex flex-col justify-center w-1/2 m-auto bg-gray-200 rounded-3xl p-3 items-center mt-3'>
      <div>
        <h1 className='text-3xl font-extrabold border-b-4 border-black '>Booking Confirmation</h1>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='flex flex-row text-xl justify-between align-middle'>
          Hotel Name: <span className='font-bold'>{title}</span>
        </p>
        <p className='flex flex-row text-xl justify-between  align-middle'>Check-In Date: <span className='text-xl font-bold'> {checkInDate}</span></p>
      <p className='flex flex-row text-xl justify-between align-middle'>Check-Out Date: <span className='font-bold'>{checkOutDate}</span></p>
      <p className='flex flex-row text-xl justify-between align-middle'>Number of Guests: <span className='font-bold'>{numGuests}</span></p>
      <p className='flex flex-row text-xl justify-between align-middle'>Total Amount: <span className='font-bold'>Rs{totalAmount}</span></p>
      </div>
      <div>
        <form className='flex flex-col justify-start font-bold text-xl mt-2'>
         <label htmlFor="bookingName">Booking Name</label>
         <input type="text" name="bookingName" id="bookingName" value={bookingName}  onChange={(e) => setBookingName(e.target.value)} className='p-2 rounded-3xl font-bold mt-2' placeholder='Booking Name'/>
         <label htmlFor="email">Email</label>
         <input type="email" name="email" id="email" value={email}  onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-3xl font-bold mt-2' placeholder='abc@gmail.com'/>
         <label htmlFor="mobile">Mobile</label>
         <input type="number" name="mobile" id="mobile" value={mobile}  onChange={(e) => setMobile(e.target.value)} className='p-2 rounded-3xl font-bold mt-2 mb-2' placeholder='+91'/>
          <div className='flex flex-row w-full justify-around text-xl font-bold text-white'>
            <button
              className='bg-red-500  p-2 mt-2 rounded-3xl pl-4 pr-4'
              onClick={cancelBooking}
            >
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
            <button
              className='bg-red-500 p-2 mt-2 pl-4 pr-4 rounded-3xl'
              onClick={handlePayment}
            >
              <FontAwesomeIcon icon={faWallet} /> Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;

