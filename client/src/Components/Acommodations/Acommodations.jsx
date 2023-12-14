import React, { useContext, useEffect, useState } from 'react';
import { Account } from '../Account/Account';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../../UserContext';

export const Acommodations = () => {
  const { ownerName } = useContext(UserContext);
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await axios.get('https://hotel-booking-webiste.vercel.app/api/v1/place/getallPlaces', {});
        const filteredPlaces = response.data.filter(place => place.owner === ownerName);

        setUserPlaces(filteredPlaces);
       console.log(filteredPlaces);
   
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchUserPlaces();
  }, [ownerName]); 

  const handleDeletePlace = async (placeId) => {
    try {
      
      const updatedPlaces = userPlaces.filter(place => place._id !== placeId);
      setUserPlaces(updatedPlaces);
      
     alert(`place deleted sucessfully`)

    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  return (
    <div>
      <Account />
      <div className='flex mt-10 pl-5 pr-5 align-middle justify-center items-center gap-3 rounded-full bg-red-500 w-fit p-3 font-bold text-white m-auto'>
        <Link to='/places'>Add new Place</Link>
        <FontAwesomeIcon icon={faAdd} className='text-xl font-extrabold cursor-pointer' />
      </div>

      <div>
        <h2 className="text-2xl font-bold flex justify-center mt-4 mb-3 ">My Places</h2>
        {userPlaces.map(place => (
          <Link to={`/property/${encodeURIComponent(place.title)}`} key={place._id} className="border p-4 mb-4 flex flex-row gap-3 w-auto md:w-3/4 mx-auto rounded-md">
             <div className=''>
           <img src={place.addedPhotos[0]} alt="" className='w-auto md:w-48 h-auto md:h-full rounded-xl'/>
           </div>
           <div className='flex flex-row justify-around w-3/4'>
            <div className='flex flex-col justify-start align-left ml-8 w-full'>
            <h3 className="text-3xl font-bold  uppercase">{place.title}</h3>
            <p className='font-semibold first-letter:uppercase'>{place.address}</p>
            <p>{place.description}</p>
            <p className='mt-3'> {place.perks.map((perk, index) => (
                  <span key={index} className="mr-2 p-2 border rounded-md">{perk}</span>
                ))}</p>
            </div>
       
          
            <div className=''>
            <button onClick={() => handleDeletePlace(place._id)}>
              <FontAwesomeIcon icon={faTrash} className='text-red-500 ml-5 text-2xl cursor-pointer' />
            </button>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
