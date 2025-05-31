import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import { Dialog, Divider } from '@mui/material';

function BookingDetail({mostrarAlerta, closeAlerta, booking}) {

  const fechaInicio = dayjs(booking.startDate).format("DD/MM/YY")
  const fechaFin = dayjs(booking.endDate).format("DD/MM/YY")

  return (
    <Dialog
    onClose={closeAlerta}
    aria-labelledby="customized-dialog-title"
    open={mostrarAlerta}
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "16px", 
        backgroundColor: "#f0f0f0",
        width: "600px",
      },
    }}
  >
    <IconButton
      aria-label="close"
      onClick={closeAlerta}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:"20px"}}>
              <img src="public\assets\logoLoadingScreen.png" alt="" style={{height:"50px", width:"50px"}} />
              <h2>Detalle de la reserva realizada</h2>
            </div>
            <Divider sx={{ backgroundColor: "#ff5a5f" }} />
            <p><strong>Fecha de inicio:</strong> {fechaInicio}</p>
            <p><strong>Fecha de fin:</strong> {fechaFin}</p>
            <p><strong>Número de huéspedes:</strong> {booking.numberOfGuests}</p>
            <p><strong>Cantidad de noches:</strong> {booking.numberOfNights}</p>
            <p><strong>Monto final:</strong> ${booking.finalAmount}</p>
            <p><strong>Método de pago:</strong> {booking.paymentMethod}</p>
    </DialogContent>
  </Dialog>
  );
}


BookingDetail.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    mensajeAlerta: PropTypes.string.isRequired,
    booking: PropTypes.object.isRequired
};

export default BookingDetail;