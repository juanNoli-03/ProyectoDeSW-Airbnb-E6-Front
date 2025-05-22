import { Box, Tooltip } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import { useState } from "react";


export default function Header() {
  
  const navigate = useNavigate ();


  const [isLoading, setIsLoading] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });

  const sesionActiva = localStorage.getItem("sesionActiva") != null;
  
  const handleLogout = () => {
    const duration = 1000;
    setLoadingScreen({
      message: "Cerrando sesion",
      duration: duration,
    })

    setIsLoading(true),
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, duration)


  }
    return (
      <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"space-between", borderBottom:"solid 3px #ff5a5f", pl:2, pr:2}}>
        <Box>
          <img src="../../../public/assets/logoLoadingScreen.png" alt="" style={{height:"60px"}}/>
        </Box>

        {isLoading && (
          <LoadingScreen
            message={loadingScreen.message}
            duration={loadingScreen.duration}
          />
        )}

        { sesionActiva && (

        <Box> 
          <Tooltip title="Logout">
            <Logout
            fontSize="large"
            fontColor="#ff5a5f"
            sx={{ color: "#ff5a5f", cursor:"pointer" }}
            onClick={handleLogout}
            
          />  
          </Tooltip>
        </Box>
         
         
        )
          }
      </Box>

    );
  }