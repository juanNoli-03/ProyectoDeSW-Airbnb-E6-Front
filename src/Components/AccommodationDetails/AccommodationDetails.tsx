import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccomodationService from '../../service/AccomodationService';
import BookingService from '../../service/BookingService';
import { Accommodation } from '../../model/Accomodation';
import { PaymentMethod, Booking } from '../../model/Booking';
import UserService from '../../service/UserService';
import { Button, Divider, GridLegacy as Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AccomodationsDescriptions } from './AccommodationsDescriptions';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MailIcon from '@mui/icons-material/Mail';
import ContactModal from '../UI/Modals/ContactModal';
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";

const AccommodationDetail = () => {
  const { id: accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDITO);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const email = localStorage.getItem("email");
  const [userData, setUserData] = useState<any>();
  const[randomUserData, setRandomUserData] = useState<any>();
  const esVisitante = localStorage.getItem("sesionActiva");
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
      message: "",
      duration: 0,
    });
  
  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  
  const [showContactModal, setContactModal] = useState<Boolean>(false);
  const openContactModal = () => {
    setContactModal(true);
  }
  const closeContactModal = () => {
    setContactModal(false);
  }
  const enviarMensajeAnfitrión = () => {
    setLoadingScreen({
      message: "Contactandote con el anfitrión",
      duration: 3000,
    }),
    setSnackbar({
      status:"success",
      message:"Mensaje enviado!"
    })
    setIsLoading(true),
    closeContactModal();
    setTimeout(() => {
      setIsLoading(false);
      setSnackbarVisibility(true);
    }, 3000)
    setSnackbarVisibility(false);
  }

  useEffect(() => {
    if (accommodationId) fetchAccommodation();
  }, [accommodationId]);

  useEffect(() => {
    if (!email) return;
    
    UserService.getUserData(email).then((res) => {
      setUserData(res.data);
    });
  }, [email])

  const fetchAccommodation = async () => {
    try {
      const res = await AccomodationService.getAccommodation(accommodationId!);
      setAccommodation(res.data);
    } catch {
      setError("No se pudo cargar el alojamiento.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomUser = async (accommodationId) => {
      try {
        const res = await UserService.getRandomUser(accommodationId);
        console.log(res.data.results[0]);
        setRandomUserData(res.data.results[0]);
      } catch {
        setError("No se pudo cargar el alojamiento.");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRandomUser(accommodationId);
  }, [])

  const handleBooking = async () => {
    if (!accommodation || !startDate || !endDate || !userData) return;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      setBookingSuccess("Las fechas seleccionadas no son válidas.");
      return;
    }

    const booking: Booking = {
      startDate: start.toISOString().split('.')[0],
      endDate: end.toISOString().split('.')[0],
      numberOfGuests,
      numberOfNights: nights,
      finalAmount: (nights * accommodation.pricePerNight),
      paymentMethod,
      rated: false,
      accommodation: { idAccommodation: Number(accommodationId) },
      user: { idUser: userData.idUser },
    };

    try {
      await BookingService.createBooking(booking);
      setBookingSuccess("Reserva realizada con éxito 🎉");
    } catch {
      setBookingSuccess("Error al realizar la reserva.");
    }
  };

  const renderStars = (rating: number = 0) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#ffc107', fontSize: '2rem' }}>{'★'.repeat(full)}</span>
        <span style={{ color: '#ccc', fontSize: '2rem' }}>{'★'.repeat(empty)}</span>
        <span style={{ margin: "5px 0 0 5px" }}><strong>{rating}/5</strong></span>
      </div>
    );
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!accommodation) return <p style={{ textAlign: 'center' }}>No se encontró el alojamiento.</p>;

  const images: string[] = [
    `../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`,
    `../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.1.jpg`,
    `../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.2.jpg`,
    `../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.3.jpg`,
    `../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.4.jpg`,
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ marginBottom: 10 }}>{accommodation.title}</h2>
      {accommodation.imageUrl && (
      <Grid container spacing={1} sx={{pt:2, pb:2}}>
        <Grid item xs={12} md={6}>
          <img
            src={`../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`}
            alt={accommodation.title}
            style={{ width: '100%', height:"100%", objectFit: 'cover', borderRadius: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            {images.slice(1).map((img: string, index: number) => (
              <Grid item xs={6} key={index}>
                  <img
                    src={img}
                    alt={accommodation.title}
                    style={{ width: '100%', height:"200px", objectFit: 'cover', borderRadius: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 60%'}}>
          <h2><strong>Vivienda para alquiler ubicada en {accommodation.city}, {accommodation.country}</strong></h2>
          <h3 style={{fontWeight:"400", paddingTop:"5px"}}>
            {accommodation.numberOfGuests} huéspedes - {accommodation.accommodationDetail.rooms} dormitorios - {accommodation.accommodationDetail.beds} camas - {accommodation.accommodationDetail.bathrooms} baños. 
          </h3>
          <Divider sx={{p:0.5, borderBottomWidth: 2}}></Divider>
          <div style={{display:"flex", flexDirection:"row", paddingTop:"30px", paddingBottom:"30px", alignItems:"center", gap:"20px"}}>
            <Avatar alt="" src={`${randomUserData?.picture?.large}`} sx={{width:"90px", height:"90px"}}/>
            <div>
              <h3>Anfitrión:</h3>
              <h3 style={{fontWeight:"200"}}>{randomUserData?.name?.first + " " + randomUserData?.name?.last}</h3>
            </div>
            <Button variant='contained' sx={{fontSize:"small", borderRadius:"15px", fontWeight:"bold", backgroundColor:"#ff5a5f"}} endIcon={<MailIcon/>}
            onClick={openContactModal} disabled={esVisitante == null}>Contactarse </Button>
          </div>
          <div style={{paddingBottom:"15px"}}>
              <h2>Descripción del alojamiento</h2>
              <Divider sx={{p:0.5, borderBottomWidth: 2}}></Divider>
              <p style={{textAlign:"justify", lineHeight:"30px"}}>{AccomodationsDescriptions[accommodation.idAccommodation - 1]?.desc}</p>
          </div>
           <div style={{display:"flex", flexDirection:"column"}}>
              <h2>¿Que ofrece este lugar?</h2>
              <Divider sx={{p:0.5, borderBottomWidth: 2}}></Divider>
              <div style={{display:"flex", flexDirection:"row", paddingTop:"20px", gap:"150px"}}>
                <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <WifiIcon sx={{fontSize:"30px"}}></WifiIcon> <p style={{fontSize:"20px", fontWeight:"300"}}>Wifi</p>
                  </div>
                   <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <LocalDiningIcon sx={{fontSize:"30px"}}></LocalDiningIcon> <p style={{fontSize:"20px", fontWeight:"300"}}>Cocina</p>
                  </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                  <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                    <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                      <LocalLaundryServiceIcon sx={{fontSize:"30px"}}></LocalLaundryServiceIcon> <p style={{fontSize:"20px", fontWeight:"300"}}>Lavarropas</p>
                    </div>
                    <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                      <AcUnitIcon sx={{fontSize:"30px"}}></AcUnitIcon> <p style={{fontSize:"20px", fontWeight:"300"}}>Aire acondicionado</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div style={{
          flex: '1 1 30%',
          padding: '1rem',
          border: '1px solid #ddd',
          borderRadius: '12px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
          height:"100%"
        }}>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            ${accommodation.pricePerNight} / noche
          </p>
          <p>{accommodation.available ? 'Disponible ✅' : 'No disponible ❌'}</p>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <label>Fecha inicio:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Fecha fin:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Huéspedes:</label>
            <input type="number" min="1" value={numberOfGuests} onChange={(e) => setNumberOfGuests(Number(e.target.value))} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Método de pago:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} style={{ width: '100%' }}>
              <option value={PaymentMethod.CREDITO}>Tarjeta de crédito</option>
              <option value={PaymentMethod.DEBITO}>Tarjeta de débito</option>
              <option value={PaymentMethod.TRANSFERENCIA}>Transferencia</option>
            </select>
          </div>

          <button
            onClick={handleBooking}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Reservar
          </button>

          {bookingSuccess && <p style={{ marginTop: '1rem', color: bookingSuccess.includes("éxito") ? 'green' : 'red' }}>{bookingSuccess}</p>}
        </div>
      </div>
      <ContactModal
        mostrarContactModal={showContactModal}
        closeContactModal={closeContactModal}
        hostName={randomUserData?.name?.first + " " + randomUserData?.name?.last}
        accommodationName={accommodation.title}
        accion={enviarMensajeAnfitrión}
      />
      {snackbarVisibility && (
        <GenericSnackbar
          status={snackbar.status}
          message={snackbar.message}
          visibility={snackbarVisibility}
        />
      )}
      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
    </div>
  );
};

export default AccommodationDetail;
