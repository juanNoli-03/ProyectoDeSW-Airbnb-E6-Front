import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Page from "./Components/UI/Page";
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Home from './Components/Home/Home';
import AccommodationDetails from './Components/AccommodationDetails/AccommodationDetails';

function App() {
  return (
    <Router>
    <Page>
        <Routes>
          <Route path="/" element={<LoginSignUp isLogin={true} />} />
          <Route path="/signUp" element={<LoginSignUp isLogin={false} />} />
          <Route path="/home" element={<Home/>} />
         <Route path="/accommodationDetails/:id" element={<AccommodationDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
    </Page>
    </Router>
  )
}

export default App
