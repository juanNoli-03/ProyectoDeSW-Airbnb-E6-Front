import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
export default function Profile() {
 
    
  const navigate = useNavigate();

  const handleNavigateBookingHistory = () => {
    navigate("/bookingHistory");
  };



  return (
    <div>
      <h2>Sobre Mí</h2>
      <p>Nombre de usuario: {localStorage.getItem("firstName") +" " + localStorage.getItem ("lastName") }</p>
      <p>E-mail: {localStorage.getItem("email")}</p>
      

      <Button onClick={handleNavigateBookingHistory}>
        Ver historial de reservas
      </Button>
    </div>

    
  );
}