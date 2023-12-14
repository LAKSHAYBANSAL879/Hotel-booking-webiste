
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/Signup/LoginSignup';
import {Signup} from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import { UserContextProvider } from './UserContext';
import { Profile } from './Components/Signup/Profile';
import { Account } from './Components/Account/Account';
import  {Acommodations} from './Components/Acommodations/Acommodations';
import Bookings from './Components/Bookings/Bookings';
import  Places  from './Components/Places/Places';
import PropertyDetails from './Components/Places/Property';
import Images from './Components/Places/Images';
import Booking from './Components/Bookings/Booking';
import { Payments } from './Components/Payments/Payments';

function App() {
  return (
    <UserContextProvider>
      
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<LoginSignup/>}/>
    <Route path='/userSignup' element={<Signup/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/account' element={<Account/>}/>
    <Route path='/accomodations' element={<Acommodations/>}/>
    <Route path='/bookings' element={<Bookings/>}/>
    <Route path='/places' element={<Places/>}/>
    <Route path='/property/:title' element={<PropertyDetails/>}/>
    <Route path='/property/:title/photos' element={<Images/>}/>
    <Route path='/booking' element={<Booking/>}/>
    <Route path='/payment' element={<Payments/>}/>







   </Routes>

    </UserContextProvider>
  );
}

export default App;
