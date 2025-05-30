import DialogContent from '@mui/material/DialogContent';
import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Rating} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import BookingService from '../../service/BookingService';


function RatingView({mostrarAlerta, closeAlerta, booking, onRatingSuccess}) {

    const [value, setValue] = useState(0);
    const [ratingSuccess, setRatingSuccess] = useState(null);


    //Actualizar Rating de la propiedad
    const handleRating= async()=>{
        try {
        await   BookingService.updateBookingRating(booking,value);
                setRatingSuccess("Calificacion realizada con éxito 🎉");
                
                const cantRatings = booking.accommodation.numberOfRating +1 ;
                const newRating= (booking.accommodation.rating * booking.accommodation.numberOfRating +value) /cantRatings;


                onRatingSuccess(booking.idBooking,newRating);
                
                setTimeout(() => {
                    closeAlerta();
                }, 1500);
                
        } catch {
                setRatingSuccess("Error al realizar la Calificacion.");
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

    {/* Mensaje de éxito o error */}
    {ratingSuccess && (
      <Typography sx={{ mt: 2, color: ratingSuccess.includes("éxito") ? 'green' : 'red' }}>
        {ratingSuccess}

      </Typography>
    )}

    </DialogContent>
  </Dialog>
  );
} 


RatingView.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    onRatingSuccess: PropTypes.func.isRequired
};

export default RatingView;