import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Card, Divider, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import UserService from '../../service/UserService';
import BookingService from '../../service/BookingService';
import BookingDetail from '../../Components/UI/Modals/BookingDetail';
import RatingView from '../RatingView/RatingView';
import LuggageIcon from '@mui/icons-material/Luggage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HistoryIcon from '@mui/icons-material/History';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

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

  //Abrir detalle de la reserva
  const [bookingDetail, setBookingDetail] = useState(false);
  const closeBookingDetail = () => {
    setBookingDetail(false);
  };
  const openBookingDetail = (booking) => {
    setBooking(booking);
    setBookingDetail(true);
  }


  //Abrir modal para calificar

  const [ratingView, setRatingView ] = useState(false);

  const closeRatingView = () => {
    setRatingView(false);
  };
  const openRatingView = (booking) => {
    setBooking(booking);
    setRatingView(true);
  }

  
  //Para no cargar tanto el return
  const renderBookingCard = (booking,  showRateButton) => (
  <div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"center", gap:"20px"}}>
    <div style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}>
      <img src={`../../../public/assets/${booking.accommodation.imageUrl}/${booking.accommodation.imageUrl}.jpg`} alt="" style={{width:"180px", 
        height:"180px", cursor:"pointer", borderRadius:"20px"}} onClick={()=> handleAccommodationDetail(booking.accommodation.idAccommodation)} 
      />
      <h3 style={{fontWeight:"600"}}>{booking.accommodation.title}</h3>
    </div>
  
    <div style={{display:"flex", flexDirection:"column", gap:"20px", alignItems:"center"}}>

      {lstBookings.past.includes(booking) ? (
        
        <HistoryIcon sx={{ color: '#9e9e9e', fontSize:"40px" }} />  
      
      ) : lstBookings.current.includes(booking) ? (
        
        <AccessTimeIcon sx={{ color: '#ffb300', fontSize:"40px" }} />
      
      ) : (

        <FlightTakeoffIcon sx={{ color: '#00acc1', fontSize:"40px" }} />  
      )} 

      <Button variant='contained' size='small' sx={{fontWeight:"bold", backgroundColor:"#ff5a5f"}} endIcon={<VisibilityIcon/>} onClick={()=>openBookingDetail(booking)} >
        Ver detalle
      </Button>
      {showRateButton && !booking.rated && (
        <Button variant='contained' size='small' sx={{fontWeight:"bold", backgroundColor:"#ff5a5f"}} endIcon={<BookmarkAddedIcon/>} onClick={()=>openRatingView(booking)}>
          Calificar Estadía
        </Button>
      )}
    </div>
</div>
);

 //Actualizar luego de calificar
  const handleRatingSuccess = (idBooking,newRating) => {
  setLstBookings(prevState => {
    return {
      ...prevState,
      past: prevState.past.map(booking =>
        booking.idBooking === idBooking
          ?{
            ...booking,
            rated: true,
            accommodation: {
              ...booking.accommodation,
              rating: newRating
            }
          }
          : booking
      )
    };
  });
};


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
          height: "150%",
          width: "3px",
          backgroundColor: "red",
          boxShadow: "0px 4px 9px rgba(0,0,0,0.4)"
        }}
      ></div>

      {/* Panel de información de usuario */}
      {opcion === "Sobre mí" && (
        <div style={{ position: "absolute", zIndex: 0, top: 145, left: 700, display:"flex", flexDirection:"column", justifyContent:"center", gap:"20px" }}>
          <h2 style={{ fontSize: "41px", textAlign:"center"}}>Sobre mí</h2>
          <Card
            elevation={20}
            sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column",
              padding:"30px",
              gap:"15px"
            }}
          >
            <Avatar
              sx={{ backgroundColor: "black", width: "100px", height: "100px" }}
              alt="Usuario"
              src="/broken-image.jpg"
            >
              {localStorage.getItem("firstName")?.charAt(0)}
            </Avatar>
            <h2>{localStorage.getItem("firstName")}</h2>
            <div style={{display:"flex", flexDirection:"row", gap:"5px", alignItems:"center"}}>
              <h3 style={{fontWeight:"400"}}>Viajero</h3> <LuggageIcon sx={{color:"#A52A2A", fontSize:"x-large"}}/>
            </div>
            <h5 style={{fontWeight:"450"}}><b>Nombre de usuario:</b> {localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")}</h5>
            <h5 style={{fontWeight:"450"}}><b>E-mail:</b> {localStorage.getItem("email")}</h5>
          </Card>
        </div>
      )}

      {/* Panel de historial de reservas */}
      {opcion === "Historial de reservas" && (
        <div style={{ position: "absolute", zIndex: 0, top: 145, left: 650}}>
          <div>
            <h1>Historial de reservas</h1>
            <Divider sx={{p:0.5, width:"180%",  borderBottomWidth: 2}}></Divider>
          </div>

          {loading && <p>Cargando reservas...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && lstBookings.all.length === 0 && (
            <p>No tienes reservas aún.</p>
          )}

          {!loading && !error && lstBookings.all.length > 0 && (      
              <div>
                    <h2 style={{paddingTop:"20px", paddingBottom:"20px"}}>Reservas pasadas</h2>
                    <div style={{display:"flex", flexDirection:"row", gap:"20px", flexWrap:"wrap", alignItems:"center"}}>
                    {lstBookings.past.length > 0 ? (
                      lstBookings.past.map((booking) => (
                        <Card key={booking.id} elevation={20} sx={{
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,true)}
                        </Card>
                      ))
                    ) : (
                      <p>No tienes reservas pasadas.</p>
                    )}
                    </div>

                    
                    <h2 style={{paddingTop:"20px", paddingBottom:"20px"}}>Reservas en curso</h2>
                    <div style={{display:"flex", flexDirection:"row", gap:"20px", flexWrap:"wrap", alignItems:"center"}}>
                    {lstBookings.current.length > 0 ? (
                      lstBookings.current.map((booking) => (
                        <Card key={booking.id} elevation={20} sx={{
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,false)}
                        </Card>
                      ))
                    ) : (
                      <p>No tienes reservas en curso.</p>
                    )}
                    </div>
                    
                    <h2 style={{paddingTop:"20px", paddingBottom:"20px"}}>Reservas futuras</h2>
                    <div style={{display:"flex", flexDirection:"row", gap:"20px", flexWrap:"wrap", alignItems:"center"}}>
                    {lstBookings.future.length > 0 ? (
                      lstBookings.future.map((booking) => (
                        <Card key={booking.id} elevation={20} sx={{
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "8px"
                          }}>
                          {renderBookingCard(booking,false)}
                        </Card>
                      ))
                    ) : (
                      <p>No tienes reservas futuras.</p>
                    )}
                     </div>
          
                      <BookingDetail
                        mostrarAlerta={bookingDetail}
                        closeAlerta={closeBookingDetail}
                        booking={booking}
                        mensajeAlerta="Vas a ver un detalle"
                      />
                      <RatingView
                        mostrarAlerta={ratingView}
                        closeAlerta={closeRatingView}
                        booking={booking}
                        onRatingSuccess= {handleRatingSuccess}
                      />
          </div> 
          )}
        </div>
      )}
    </>
  );
}