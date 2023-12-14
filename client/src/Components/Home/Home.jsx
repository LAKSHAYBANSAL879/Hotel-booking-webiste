import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/place/getallPlaces', {});
        setUserPlaces(response.data);
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchUserPlaces();
  }, []);

  const getRandomRating = () => {
    return (Math.random() * (5 - 4) + 4).toFixed(1);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToWishlist = (placeId) => {
    console.log(`Added to wishlist: ${placeId}`);
  };

  const filteredPlaces = userPlaces.filter((place) => {
    const titleMatch = place.title.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = place.address.toLowerCase().includes(searchLocation.toLowerCase());
    return titleMatch && locationMatch;
  });

  return (
    <div className="container overflow-hidden mx-auto mt-8">
      <div className="flex justify-center m-auto items-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none ml-2"
        />
        <button
          onClick={() => {
            setSearchTerm('');
            setSearchLocation('');
          }}
          className="bg-red-400 p-2 rounded text-white ml-2"
        >
          Clear
        </button>
      </div>
      <h1 className="text-4xl ml-10 font-bold mb-4">Explore Nearby Places</h1>
      <div className="flex flex-wrap -mx-4">
        {filteredPlaces.map((place) => (
          <Link
            key={place._id}
            to={`/property/${encodeURIComponent(place.title)}`}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-8"
          >
            <Slider {...carouselSettings} className="carousel">
              {place.addedPhotos.map((photo, photoIndex) => (
                <div key={photoIndex}>
                  <img
                    src={photo}
                    alt={'best hotel'}
                    className="w-5/6 m-auto h-56 object-cover rounded-xl"
                  />
                </div>
              ))}
            </Slider>
            <div className="border rounded-3xl flex flex-row justify-between w-3/4 m-auto border-gray-300 p-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 uppercase">{place.title}</h3>
                <p className="text-gray-600 mb-1 first-letter:uppercase">{place.address}</p>
                <h2 className='font-bold'>Rs{place.price} per night</h2>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <h2 className='text-yellow-500'><FontAwesomeIcon icon={faStar}/> {getRandomRating()}</h2>
                <button
                  onClick={() => handleAddToWishlist(place._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
                >
                  <FontAwesomeIcon icon={faHeart}/>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
