import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Page from "./Components/UI/Page";
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home/Home';
import AccommodationDetails from './Components/AccommodationDetails/AccommodationDetails';
import Profile from './Components/Profile/Profile';
import BookingHistory from './Components/BookingHistory/BookingHistory';
import { useState } from 'react';
import { AccommodationFilters } from './model/AccommodationFilters';


function App() {
  const [filters, setFilters] = useState();
  
  return (
    <Router>
    <Page setFilters={setFilters}>
        <Routes>
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/" element={<Home filters={filters}/>} />
          <Route path="/profile" element={<Profile/>} />   
          <Route path="/bookingHistory" element={<BookingHistory/>} />         
          <Route path="/accommodationDetails/:id" element={<AccommodationDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Page>
    </Router>
  )
}

export default App
