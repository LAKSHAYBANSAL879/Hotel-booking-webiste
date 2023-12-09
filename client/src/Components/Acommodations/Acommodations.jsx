import React, { useContext, useEffect, useState } from 'react';
import { Account } from '../Account/Account';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../../UserContext';


export const Acommodations = () => {
  const { ownerName } = useContext(UserContext);
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/place/getallPlaces', {
         
        });

        // Filter places based on ownerName
        const filteredPlaces = response.data.filter(place => place.owner=== ownerName);

        setUserPlaces(filteredPlaces);
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchUserPlaces();
  }, [ownerName]); // Re-fetch places when ownerName changes

  return (
    <div>
      <Account />
      <div className='flex mt-10 pl-5 pr-5 align-middle justify-center items-center gap-3 rounded-full bg-red-500 w-fit p-3 font-bold text-white m-auto'>
        <Link to='/places'>Add new Place</Link>
        <FontAwesomeIcon icon={faAdd} className='text-xl font-extrabold cursor-pointer' />
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">My Places</h2>
        {userPlaces.map(place => (
          <div key={place._id} className="border p-4 mb-4 rounded-md">
            <h3 className="text-xl font-bold">{place.title}</h3>
            <p>{place.address}</p>
            {/* Add more details you want to display */}
          </div>
        ))}
      </div>
    </div>
  );
};
