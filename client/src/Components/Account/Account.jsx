import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faUser,faHotel } from '@fortawesome/free-solid-svg-icons';
export const Account = () => {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className='flex flex-row justify-evenly mt-4 text-xl font-semibold'>
      <div
        className={`${
          isActive('/profile') ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
        }  flex flex-row justify-center items-center gap-2 font-bold p-3 rounded-full`}
      >
        <FontAwesomeIcon icon={faUser}/>
        <Link to='/profile'>My Profile</Link>
      </div>
      <div
        className={`${
          isActive('/bookings') ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
        } flex flex-row justify-center items-center gap-2  font-bold p-3 rounded-full`}
      >
        <FontAwesomeIcon icon={faList}/>

        <Link to='/bookings'>My Bookings</Link>
      </div>
      <div
        className={`${
          isActive('/accomodations') ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
        }  flex flex-row justify-center items-center gap-2 font-bold p-3 rounded-full`}
      >
        <FontAwesomeIcon icon={faHotel}/>

        <Link to='/accomodations'>My Accommodations</Link>
      </div>
    </div>
  );
};
