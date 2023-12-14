import React, { useContext } from 'react'
import logo from "../images/bookit-high-resolution-logo-removebg-preview.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUser,faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
export const Navbar = () => {
  const {user}=useContext(UserContext);
  return (
    <div className='w-full h-28 flex flex-row justify-between align-middle text-center items-center bg-gray-100'>
      <div>
        <Link to='/'><img src={logo} alt="bookIt" className='w-44'/></Link>
      </div>
      <div className='flex mr-10 cursor-pointer  flex-row gap-3 border-2 text-xl border-black rounded-2xl  h-fit p-3 font-bold '> 
        <div className=' border-r-gray-300 border-r-4 border-spacing-4 mr-1 pr-2 '>Location</div>
        <div className=' border-r-gray-300 border-r-4 border-spacing-4 mr-1 pr-2  '>Duration</div>
        <div>Add Guests</div>
        <div><button className='bg-red-500 ml-2 rounded-full py-1 px-2 text-white text-sm'><FontAwesomeIcon icon={faSearch}/></button></div>
      </div>

      <div>
       <div className='mr-20 cursor-pointer flex flex-row w-fit gap-3 border-4 border-gray-300 rounded-3xl p-2  text-3xl'>
        <Link to={user?'/profile':'/signin'} className='flex flex-row gap-2'><FontAwesomeIcon icon={faBars} className='hidden text-lg mt-2'/>
        <FontAwesomeIcon icon={faUser} className=''/>
        {!!user && (
          <div className='flex flex-row text-lg font-bold '>
            {user.name}
          </div>
        )}
        </Link>
        </div>
      </div>
    </div>
  )
}