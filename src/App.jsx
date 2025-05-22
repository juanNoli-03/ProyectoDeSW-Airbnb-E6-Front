import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Page from "./Components/UI/Page";
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home/Home';
import AccommodationDetails from './Components/AccommodationDetails/AccommodationDetails';
import Profile from './Components/Profile/Profile';
import BookingHistory from './Components/BookingHistory/BookingHistory';


function App() {
  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/login" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/" element={<Home/>} />
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
