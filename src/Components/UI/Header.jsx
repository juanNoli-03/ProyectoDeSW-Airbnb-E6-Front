import { Box, Tooltip, IconButton } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import { useState } from "react";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import { Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleNavigateLogin = () => {
    navigate("/login");
  };

   const handleNavigateProfile= () => {
    navigate("/profile");
  };

  const handleNavigateHome= () => {
    navigate("/home");
  };

  const sesionActiva = localStorage.getItem("sesionActiva") != null;
  const handleLogout = () => {
    const duration = 3000;
    setLoadingScreen({
      message: "",
      duration: duration,
    });
    setIsLoading(true),
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, duration);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "solid 3px #ff5a5f",
        p:2,
      }}
    >
      <Link to="/">
      <Box>
        <img
          src="../../../public/assets/bannerAirbnb.png"
          alt=""
          onClick={handleNavigateHome}
          style={{ height: "35px", width: "110px", cursor: "pointer" }}
        />
      </Box>
      </Link>

      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <IconButton
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ color: "#ff5a5f", fontSize: "30px" }} />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {sesionActiva ? (
            <>
              <MenuItem sx={{ fontSize: "14px" }} onClick={handleNavigateProfile} >
                <ListItemIcon>
                  <PersonIcon fontSize="medium" sx={{ color: "black" }} />
                </ListItemIcon>
                Mi perfil
              </MenuItem>
              <Divider />
              <MenuItem sx={{ fontSize: "14px" }} onClick={handleLogout}>
                <ListItemIcon>
                  <Logout
                    fontSize="medium"
                    fontColor="#6655D9"
                    sx={{ color: "black" }}
                    onClick={handleLogout}
                  />
                </ListItemIcon>
                Cerrar Sesión
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem sx={{ fontSize: "14px" }} onClick={handleNavigateLogin}>
                <ListItemIcon>
                  <PersonIcon fontSize="medium" sx={{ color: "black" }} />
                </ListItemIcon>
                Iniciá sesión o registrate
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Box>
  );
}
