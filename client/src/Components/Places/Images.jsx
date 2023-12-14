import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Images = () => {
  const { title } = useParams();
  const [userPlace, setUserPlace] = useState(null);

  useEffect(() => {
    const fetchUserPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/place/${title}`);
        setUserPlace(response.data);
      } catch (error) {
        console.error('Error fetching user place:', error);
      }
    };

    fetchUserPlace();
  }, [title]);

  return (
    <div>
      {userPlace && (
        <Link to={`/property/${encodeURIComponent(title)}`} className='justify-center'>
          <h2 className='flex m-auto text-3xl font-bold'>{userPlace.title}</h2>
          <div className="flex flex-col justify-center items-center">
            {userPlace.addedPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={'best hotel'}
                className="w-3/4 h-96 object-cover m-2 rounded"
              />
            ))}
          </div>
        </Link>
      )}
    </div>
  );
};

export default Images;
