import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import UserService from '../../service/UserService';
import BookingService from '../../service/BookingService';
import BookingDetail from '../../Components/UI/Modals/BookingDetail';


export default function Profile() {
  const [hoverSobreMi, setHoverSobreMi] = useState(false);
  const [hoverViajes, setHoverViajes] = useState(false);
  const navigate = useNavigate();
  const [opcion, setOpcion] = useState("Sobre mí");

  const [lstBookings, setLstBookings] = useState({
    all: [],
    past: [],
    current: [],
    future: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState({
        idBooking: "",
        startDate: "",
        endDate: "",
        numberOfGuests: "",
        numberOfNights: "",
        finalAmount: "",
        paymentMethod: "",
        rated:"",
        accommodation: {
            idAccommodation: ""
        },
        user: {
            idUser: ""
        },
  });


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
         BookingService.getAllBookingsByUser(userId).then((res) =>{
          setLstBookings(prev => ({
            ...prev,
            all: res.data
          }));
         }).catch ( (err) =>{
        console.error("Error al obtener reservas:", err);
        setError("Error al cargar las reservas.");
      });

        BookingService.getPastBookingsByUser(userId).then((res) =>{
          setLstBookings(prev => ({
            ...prev,
            past: res.data
          }));
         }).catch ( (err) =>{
        console.error("Error al obtener reservas:", err);
        setError("Error al cargar las reservas.");
      });

        BookingService.getInProgressBookingsByUser(userId).then((res) =>{
          setLstBookings(prev => ({
            ...prev,
            current: res.data
          }));
         }).catch ( (err) =>{
        console.error("Error al obtener reservas:", err);
        setError("Error al cargar las reservas.");
      });
      
      BookingService.getFutureBookingsByUser(userId).then((res) =>{
          setLstBookings(prev => ({
            ...prev,
            future: res.data
          }));
         }).catch ( (err) =>{
        console.error("Error al obtener reservas:", err);
        setError("Error al cargar las reservas.");
      });
    
    };

    fetchIdUser();
  }, []);
  
  const handleAccommodationDetail = (id) =>{
    navigate(`/accommodationDetails/${id}`);
  }

  //
  const [bookingDetail, setBookingDetail] = useState(false);
  const closeBookingDetail = () => {
    setBookingDetail(false);
  };
  const openBookingDetail = (booking) => {
    setBooking(booking);
    setBookingDetail(true);
  };

  
  //Para no cargar tanto el return
  const renderBookingCard = (booking,  showRateButton) => (

  <div>
    <p><strong>Propiedad:</strong> {booking.accommodation.title}</p>
    <img src={`../../../public/assets/${booking.accommodation.imageUrl}/${booking.accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px", cursor:"pointer"}} onClick={()=> handleAccommodationDetail(booking.accommodation.idAccommodation)} 
              />
    
      <button onClick={()=>openBookingDetail(booking)} >
        Ver detalle
      </button>
    {showRateButton && !booking.rated && (
    
      <button>
        Calificar Estadía
      </button>
    )}
  </div>
);




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
            onClick={() => setOpcion("Historial de reservas")}
            onMouseEnter={() => setHoverViajes(true)}
            onMouseLeave={() => setHoverViajes(false)}
            style={buttonStyle(hoverViajes)}
          >
            Historial de reservas
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
      {opcion === "Historial de reservas" && (
        <div style={{ position: "absolute", zIndex: 0, top: 145, left: 650 }}>
          <h2>Historial de reservas </h2>

          {loading && <p>Cargando reservas...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && lstBookings.all.length === 0 && (
            <p>No tienes reservas aún.</p>
          )}

          {!loading && !error && lstBookings.all.length > 0 && (      
              <div>
                    <h3>Reservas Pasadas</h3>
                    {lstBookings.past.length > 0 ? (
                      lstBookings.past.map((booking) => (
                        <div key={booking.id} style={{
                            boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.25)",
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,true)}
                        </div>
                      ))
                    ) : (
                      <p>No tienes reservas pasadas.</p>
                    )}

                    <h3>Reservas en Curso</h3>
                    {lstBookings.current.length > 0 ? (
                      lstBookings.current.map((booking) => (
                        <div key={booking.id} style={{
                            boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.25)",
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,false)}
                        </div>
                      ))
                    ) : (
                      <p>No tienes reservas en curso.</p>
                    )}

                    <h3>Reservas Futuras</h3>
                    {lstBookings.future.length > 0 ? (
                      lstBookings.future.map((booking) => (
                        <div key={booking.id} style={{
                            boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.25)",
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,false)}
                        </div>
                      ))
                    ) : (
                      <p>No tienes reservas futuras.</p>
                    )}
                 
          
                      <BookingDetail
                        mostrarAlerta={bookingDetail}
                        closeAlerta={closeBookingDetail}
                        booking={booking}
                        mensajeAlerta="Vas a ver un detalle"
                      />
          </div> 
          )}
        </div>
      )}
    </>
  );
}