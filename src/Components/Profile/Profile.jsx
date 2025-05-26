import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import UserService from '../../service/UserService';
import axios from "axios";

export default function Profile() {
  const [hoverSobreMi, setHoverSobreMi] = useState(false);
  const [hoverViajes, setHoverViajes] = useState(false);
  const navigate = useNavigate();
  const [opcion, setOpcion] = useState("Sobre mí");

  const [lstBookings, setLstBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchIdUser = async () => {
      UserService.getUserData(email).then((res) => {
        const userData = res.data;
        setUser(userData);
        fetchBookingHistory(userData.idUser);
      }).catch((err) => {
        console.error("Error al obtener usuario:", err);
        setError("Error al cargar el usuario.");
      }).finally(() => setLoading(false));
    };

    const fetchBookingHistory = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8080/user/bookings/${userId}`);
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

  const buttonStyle = (hover) => ({
    backgroundColor: hover ? "#e0e0e0" : "#f5f5f5",
    boxShadow: hover
      ? "0px 6px 14px rgba(0, 0, 0, 0.5)"
      : "0px 4px 10px rgba(0, 0, 0, 0.3)",
    padding: "25px 20px",
    width: "300px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "left",
    transition: "all 0.3s ease"
  });

  return (
    <>
      {/* Panel de opciones */}
      <div style={{ position: "absolute", zIndex: 0, top: 145, left: 100 }}>
        <h2 style={{ fontSize: "41px" }}>Perfil</h2>

        <div style={{ marginBottom: "15px", marginTop: "20px" }}>
          <button
            onClick={() => setOpcion("Sobre mí")}
            onMouseEnter={() => setHoverSobreMi(true)}
            onMouseLeave={() => setHoverSobreMi(false)}
            style={buttonStyle(hoverSobreMi)}
          >
            Sobre mí
          </button>
        </div>

        <div>
          <button
            onClick={() => setOpcion("Viajes anteriores")}
            onMouseEnter={() => setHoverViajes(true)}
            onMouseLeave={() => setHoverViajes(false)}
            style={buttonStyle(hoverViajes)}
          >
            Mis viajes anteriores
          </button>
        </div>
      </div>

      {/* Línea divisoria */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: "550px",
          height: "80%",
          width: "3px",
          backgroundColor: "red",
          boxShadow: "0px 4px 9px rgba(0,0,0,0.4)"
        }}
      ></div>

      {/* Panel de información de usuario */}
      {opcion === "Sobre mí" && (
        <div style={{ position: "absolute", zIndex: 0, top: 145, left: 700 }}>
          <h2 style={{ fontSize: "41px" }}>Sobre mí</h2>

          <div
            style={{
              marginTop: "20px",
              width: "350px",
              height: "230px",
              borderRadius: "30px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              sx={{ backgroundColor: "black", width: "100px", height: "100px" }}
              alt="Usuario"
              src="/broken-image.jpg"
            >
              {localStorage.getItem("firstName")?.charAt(0)}
            </Avatar>
            <h3>{localStorage.getItem("firstName")}</h3>
          </div>

          
          <h3>Nombre de usuario: {localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")}</h3>
          <h3>E-mail: {localStorage.getItem("email")}</h3>
          
        </div>
      )}

      {/* Panel de historial de reservas */}
      {opcion === "Viajes anteriores" && (
        <div style={{ position: "absolute", zIndex: 0, top: 145, left: 650 }}>
          <h2>Viajes anteriores</h2>

          {loading && <p>Cargando reservas...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && lstBookings.length === 0 && (
            <p>No tienes reservas aún.</p>
          )}

          {!loading && !error && lstBookings.length > 0 && (
            lstBookings.map((booking) => (
              <div key={booking.id} style={{
                boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.25)",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px"
              }}>
                <p><strong>Propiedad:</strong> {booking.accommodation.title}</p>
                <p><strong>Fecha de inicio:</strong> {new Date(booking.startDate).toLocaleString()}</p>
                <p><strong>Fecha de fin:</strong> {new Date(booking.endDate).toLocaleString()}</p>
                <p><strong>Número de huéspedes:</strong> {booking.numberOfGuests}</p>
                <p><strong>Noches:</strong> {booking.numberOfNights}</p>
                <p><strong>Monto final:</strong> ${booking.finalAmount}</p>
                <p><strong>Método de pago:</strong> {booking.paymentMethod}</p>
                <p><strong>Rating:</strong> {booking.rating} ⭐</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}