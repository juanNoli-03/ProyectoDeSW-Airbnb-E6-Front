import DialogContent from '@mui/material/DialogContent';
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Rating, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog, Divider } from '@mui/material';
import BookingService from '../../service/BookingService';
import SendIcon from '@mui/icons-material/Send';
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";

function RatingView({mostrarAlerta, closeAlerta, booking, onRatingSuccess}) {

    const [value, setValue] = useState(0);
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

      const handleClose = () => {
        closeAlerta ();
      }

    //Actualizar Rating de la propiedad
    
    const handleRating= async()=>{
        setSnackbarVisibility(false);
        setIsLoading(false);
        try {
        await   BookingService.updateBookingRating(booking,value);
                
                const cantRatings = booking.accommodation.numberOfRating +1 ;
                const newRating= (booking.accommodation.rating * booking.accommodation.numberOfRating +value) /cantRatings;


                onRatingSuccess(booking.idBooking,newRating);

                setLoadingScreen({
                  message: "Calificando",
                  duration: 3000,
                }),
                setSnackbar({
                  status:"success",
                  message:"Calificación realizada con éxito!"
                })
                handleClose()
                setIsLoading(true)
                setTimeout(() => {
                setIsLoading(false);
                setSnackbarVisibility(true);
              }, 3000)
                
                
        } catch (e) {
          console.log(e);
        }
    }

    return (
    <>
    <Dialog
    onClose={handleClose}
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
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent style={{display:"flex", flexDirection:"column", gap:"10px",}} >
          <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:"20px"}}>
            <img src="public\assets\logoLoadingScreen.png" alt="" style={{height:"50px", width:"50px"}} />
            <h2>Calificá tu estadia en {booking.accommodation.title} </h2> 
          </div>
          <Divider sx={{ backgroundColor: "#ff5a5f" }} />
        
        <Box sx={{display:"flex", justifyContent:"center", pt:1 }}>
        <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          '& .MuiRating-icon': {
          fontSize: '3rem', // Cambiá este valor a gusto (ej: 4rem, 48px, etc)
          },
        }}
      />
        </Box>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Button onClick={handleRating} variant='contained' sx={{width:"50%", mt:3, backgroundColor:"#ff5a5f", fontWeight:"bold"}} endIcon={<SendIcon/>}>
            Calificar</Button>
        </div>

    </DialogContent>
  </Dialog>
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
    </>
  );
} 


RatingView.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    onRatingSuccess: PropTypes.func.isRequired
};

export default RatingView;