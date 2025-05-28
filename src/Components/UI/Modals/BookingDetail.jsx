import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function BookingDetail({mostrarAlerta, closeAlerta, mensajeAlerta,booking}) {

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
    <DialogContent >
            <p><strong>Fecha de inicio:</strong> {new Date(booking.startDate).toLocaleString()}</p>
            <p><strong>Fecha de fin:</strong> {new Date(booking.endDate).toLocaleString()}</p>
            <p><strong>Número de huéspedes:</strong> {booking.numberOfGuests}</p>
            <p><strong>Noches:</strong> {booking.numberOfNights}</p>
            <p><strong>Monto final:</strong> ${booking.finalAmount}</p>
            <p><strong>Método de pago:</strong> {booking.paymentMethod}</p>
            <p><strong>Rating:</strong> {booking.accommodation.rating} ⭐</p>
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