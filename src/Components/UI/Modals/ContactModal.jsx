import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Textarea from '@mui/joy/Textarea';
import PropTypes from "prop-types";
import { Button, Dialog } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ContactModal({mostrarContactModal, closeContactModal, hostName, accommodationName, accion}) {

  const mensaje = `Hola ${hostName}! Soy ${localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")} y me gustaría saber más acerca de ${accommodationName}!`
  const modalStyle = {
    '&:focus-within': {
      '--Textarea-focusedHighlight': '#ff5a5f',
    },
    fontWeight:"bold"
  }

  return (
    <Dialog
    onClose={closeContactModal}
    aria-labelledby="customized-dialog-title"
    open={mostrarContactModal}
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "20px", 
        backgroundColor: "#f3f3f3",
        width: "600px",
      },
    }}
  >
    <IconButton
      aria-label="close"
      onClick={closeContactModal}
      sx={{
        position: 'absolute',
        right: 5,
        top: 5,
        color: 'black',
      }}
    >
    <CloseIcon />
    </IconButton>
    <DialogContent sx={{display:"flex", flexDirection:"column", gap:"25px"}}>
      <div style={{display:"flex", justifyContent:"center"}}>
        <h2 style={{display:"flex", alignItems:"center", gap:"10px", textAlign:"center"}}>Contactar al anfitrión <img src="../../../../public/assets/logoLoadingScreen.png" 
        alt="" style={{height:"50px", width:"50px"}} /></h2>
      </div>
      <Textarea
        color='black'
        minRows={2}
        size="lg"
        variant="outlined"
        defaultValue={mensaje}
        sx={modalStyle}
      />
      <Button sx={{width:"40%", alignSelf:"center", fontWeight:"bold", backgroundColor:"#ff5a5f"}} variant='contained' endIcon={<SendIcon/>} onClick={accion}>Enviar mensaje</Button>
    </DialogContent>
  </Dialog>
  );
}

ContactModal.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    hostName: PropTypes.string.isRequired,
    accommodationName: PropTypes.string.isRequired,
    accion: PropTypes.func.isRequired
};

export default ContactModal;