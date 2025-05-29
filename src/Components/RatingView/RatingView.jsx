import DialogContent from '@mui/material/DialogContent';
import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Rating} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import BookingService from '../../service/BookingService';


function RatingView({mostrarAlerta, closeAlerta, booking}) {

    const [value, setValue] = useState(0);
    const [ratingSuccess, setRatingSuccess] = useState(null);


    //Actualizar Rating de la propiedad
    const handleRating= async()=>{
        try {
        await   BookingService.updateBookingRating(booking,value);
                setRatingSuccess("Reserva realizada con éxito 🎉");
        } catch {
                setRatingSuccess("Error al realizar la reserva.");
        }


    }

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
        <h1>Calificá tu estadia en {booking.accommodation.title} </h1> 
        
        <Box sx={{ '& > legend': { mt: 2 } }}>
        <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
        </Box>

        <button onClick={handleRating}>Enviar</button>

    </DialogContent>
  </Dialog>
  );
} 


RatingView.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    };

export default RatingView;