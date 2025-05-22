import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { useParams } from 'react-router-dom';

export default function BookingHistory() {
 
    const [lstBookings, setLstBookings]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser]=useState(null);

    const email =localStorage.getItem("email");

useEffect(() => {
  const fetchIdUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/email/${email}`);
      const userData = response.data;


      setUser(userData); // Actualizamos el estado
      fetchBookingHistory(userData.idUser); // Usamos directamente los datos


    } catch (err) {
      console.error("Error al obtener usuario:", err);
      setError("Error al cargar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/bookings/${userId}`);
      console.log("respuesta del back", response.data);
      setLstBookings(response.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
      setError("Error al cargar las reservas.");
    }
  };

  fetchIdUser();
}, []);



  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

return (
  <div>
    <h2>Aquí están tus reservas, amigo</h2>

    {loading && <p>Cargando reservas...</p>}

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {!loading && !error && lstBookings.length === 0 && (
      <p>No tienes reservas aún.</p>
    )}

    {!loading && !error && lstBookings.length > 0 && (
      lstBookings.map((booking) => (
        <div key={booking.id} style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px"
        }}>
          <p><strong>ID:</strong> {booking.id}</p>
          <p><strong>Fecha de inicio:</strong> {new Date(booking.startDate).toLocaleString()}</p>
          <p><strong>Fecha de fin:</strong> {new Date(booking.endDate).toLocaleString()}</p>
          <p><strong>Número de huéspedes:</strong> {booking.numberOfGuests}</p>
          <p><strong>Noches:</strong> {booking.numberOfNights}</p>
          <p><strong>Monto final:</strong> ${booking.final_amount}</p>
          <p><strong>Método de pago:</strong> {booking.paymentMethod}</p>
          <p><strong>Rating:</strong> {booking.rating} ⭐</p>
        </div>
      ))
    )}
  </div>
);
}