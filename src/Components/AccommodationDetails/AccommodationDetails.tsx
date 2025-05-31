import { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import AccomodationService from '../../service/AccomodationService';
import BookingService from '../../service/BookingService';
import { Accommodation } from '../../model/Accomodation';
import { PaymentMethod, Booking } from '../../model/Booking';
import UserService from '../../service/UserService';
import { Button, Divider, FormControl, GridLegacy as Grid, TextField, Select, MenuItem, Card } from '@mui/material';
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
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddHomeIcon from '@mui/icons-material/AddHome';
import StarIcon from '@mui/icons-material/Star';

const AccommodationDetail = () => {
  const { id: accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
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
  
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(dayjs("04/04/2025"));
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(dayjs("04/05/2025"));

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
    if (!accommodation || !fechaInicio || !fechaFin || !userData) return;

    const start = fechaInicio.toDate();
    const end = fechaFin.toDate();

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
      setLoadingScreen({
        message: "Realizando reserva",
        duration: 3000,
      }),
      setSnackbar({
        status:"success",
        message:"Reserva realizada con éxito!"
      })
      setIsLoading(true),
      setTimeout(() => {
        setIsLoading(false);
        setSnackbarVisibility(true);
      }, 3000)
      setSnackbarVisibility(false);
      } catch {
        setBookingSuccess("Error al realizar la reserva.");
      }
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

   const textFieldStyle = {
     '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff5a5f',
      },
      '&:hover fieldset': {
        borderColor: '#ff5a5f',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff5a5f',
      },
     },
    '& label.Mui-focused': {
      color: '#ff5a5f',
    },
    '& label': {
      color: '#ff5a5f',
    },
  };
  

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
          <div style={{display:"flex", flexDirection:"row", paddingTop:"5x", gap:"5px", alignItems:"center"}}>
            <StarIcon sx={{ fontSize: "30px", color: "gold" }} /> <p style={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>{accommodation.rating.toFixed(1)}</p>
          </div>
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

        <Card elevation={10} style={{
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

          <div style={{ marginTop: '1rem', textAlign: 'left', display:"flex", flexDirection:"column", gap:"10px"}}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Fecha Inicio"
                    value={fechaInicio}
                    onChange={(newValue) => setFechaInicio(newValue)}
                    format="DD/MM/YYYY"
                    enableAccessibleFieldDOMStructure={false}
                    slots={{ textField: TextField }}
                    slotProps={{
                      textField: {
                        sx: textFieldStyle,
                        fullWidth: true,
                      },
                    }}
                    
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Fecha Fin"
                    value={fechaFin}
                    onChange={(newValue) => setFechaFin(newValue)}
                    format="DD/MM/YYYY"
                    enableAccessibleFieldDOMStructure={false}
                    slots={{ textField: TextField }}
                    slotProps={{
                      textField: {
                        sx: textFieldStyle,
                        fullWidth: true,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl>
                <TextField 
                  color="error"
                  type='number' 
                  id="outlined-basic" 
                  label="Huespedes" 
                  variant="outlined" 
                  value={numberOfGuests} 
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  inputProps={{
                    min: 1, // valor mínimo permitido
                    max: accommodation.numberOfGuests,
                    step: 1, // incremento
                  }}
                  sx={textFieldStyle}
                  
                />
              </FormControl>

            <FormControl sx={textFieldStyle}>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
              <MenuItem value={PaymentMethod.CREDITO}>Tarjeta de crédito</MenuItem>
              <MenuItem value={PaymentMethod.DEBITO}>Tarjeta de débito</MenuItem>
              <MenuItem value={PaymentMethod.TRANSFERENCIA}>Transferencia</MenuItem>
            </Select>
            </FormControl>
          </div>

          <Button
            onClick={handleBooking}
            variant='contained'
            type='submit'
            sx={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              fontSize:"medium",  
              fontWeight:"bold", 
              backgroundColor:"#ff5a5f",
              cursor:"pointer",
              borderRadius:"20px",
              "&.Mui-disabled": {
                backgroundColor: "#cdcdcd",
                color: "#666",
              },
            }}
            endIcon={<AddHomeIcon />}
            disabled={localStorage.getItem("sesionActiva") == null}
          >
            Reservar
          </Button>
        </Card>
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
