import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Account } from '../Account/Account';

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState(null);
  const history = useNavigate();

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('token');
    history('/signin');
  };

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          setLoadingLocation(true);

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              const apiKey = '379cea74984b4420afaa386526bc2f71';
              try {
                const response = await axios.get(
                  `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`
                );

                const { results } = response.data;
                if (results.length > 0) {
                  const address = results[0].components;
                  setLocation({
                    state: address.state,
                    country: address.country,
                  });
                }
              } catch (error) {
                console.error('Error getting location:', error.message);
                setErrorLocation('Error getting location details.');
              } finally {
                setLoadingLocation(false);
              }
            },
            (error) => {
              console.error('Error getting location:', error.message);
              setErrorLocation('Error getting location.');
              setLoadingLocation(false);
            }
          );
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
   
    <div className="container mt-1 mx-auto p-4">
       <Account/>
      <div className="max-w-md mt-5 text-lg mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          {user ? (
            <>
              <div className="mb-2">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="mb-2">
                <strong>Phone:</strong> {user.phone}
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}

          {loadingLocation ? (
            <p>Loading location...</p>
          ) : (
            <>
              {location && (
                <div className="mb-4">
                  <strong>State:</strong> {location.state}
                  <br />
                  <strong>Country:</strong> {location.country}
                </div>
              )}
              {errorLocation && <p className="text-red-500">{errorLocation}</p>}
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
