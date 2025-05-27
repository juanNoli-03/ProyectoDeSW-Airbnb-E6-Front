import { Box, IconButton, Typography } from "@mui/material";
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
import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

  const [continente, setContinente] = useState('');

  const handleChangeContinente = (event) => {
    setContinente(event.target.value);
  };

  const [pais, setPais] = useState('');

  const handleChangePais = (event) => {
    setPais(event.target.value);
  };

  const [precio, setPrecio] = useState(30);
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

  const selectStyle = {
     '& .MuiInputLabel-root': {
      color: '#ff5a5f',
      fontWeight:"bold"
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#ff5a5f',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff5a5f',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff5a5f',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff5a5f',
    },
    '& .MuiSvgIcon-root': {
      color: '#ff5a5f',
    },
     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff5a5f',
    },
     m: 0.5, 
     minWidth: 150,
     borderRadius:"25px"
  }

  const sliderStyle = {
     color: '#ff5a5f',
    '& .MuiSlider-thumb': {
      backgroundColor: '#ff5a5f',
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
      backgroundColor: '#ff5a5f',
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "solid 3px #ff5a5f",
        pt:2,
        pb:2,
        pl:3,
        pr:3
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


      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", backgroundColor:"white", boxShadow:"0 0 10px 0 grey", 
        borderRadius:"45px", p:1, pl:2, pr:2, gap:"10px"}}>
        <Box>
           <FormControl sx={selectStyle}>
                <InputLabel id="demo-simple-select-autowidth-label" sx={selectStyle}>Continente</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={continente}
                  onChange={handleChangeContinente}
                  autoWidth
                  label="Continente"
                  size="medium"
                  sx={selectStyle}
                >
                <MenuItem value={"No aplica"}>No aplica</MenuItem>
                <MenuItem value={"Sudamerica"}>Sudamerica</MenuItem>
                <MenuItem value={"Europa"}>Europa</MenuItem>
                <MenuItem value={"Asia"}>Asia</MenuItem>
              </Select>
            </FormControl>
        </Box>
          <Divider orientation="vertical" flexItem />
        <Box>
           <FormControl sx={selectStyle}>
              <InputLabel id="demo-simple-select-autowidth-label" sx={selectStyle}>País</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={pais}
                  onChange={handleChangePais}
                  autoWidth
                  label="Pais"
                  size="Medium"
                  sx={selectStyle}
                >
                <MenuItem value={"No aplica"}>No aplica</MenuItem>
                <MenuItem value={"Sudamerica"}>Argentina</MenuItem>
                <MenuItem value={"Europa"}>Brasil</MenuItem>
                <MenuItem value={"Asia"}>Colombia</MenuItem>
                <MenuItem value={"Sudamerica"}>España</MenuItem>
                <MenuItem value={"Europa"}>Francia</MenuItem>
                <MenuItem value={"Asia"}>Italia</MenuItem>
              </Select>
            </FormControl>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{width: 200, ml:2, mr:2, display:"flex", flexDirection:"row", alignItems:"center", gap:"3px"}}>
          <Slider
            aria-label="Precio por noche"
            value={precio}
            onChange={(event, newValue) => setPrecio(newValue)}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={110}
            sx={sliderStyle}
          />
          <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <AttachMoneyIcon></AttachMoneyIcon>
            <Typography sx={{fontWeight:"bold"}}>{precio}</Typography>
          </Box>
        </Box>
          <Divider orientation="vertical" flexItem />
        <Box>
          <SearchIcon fontSize="large" sx={{color:"white", backgroundColor:"#ff5a5f", padding:"8px", borderRadius:"20px", cursor:"pointer"}}></SearchIcon>
        </Box>
      </Box>


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
          {sesionActiva ? (
            <Avatar
            sx={{backgroundColor:"black"}}
            alt="Remy Sharp"
            src="/broken-image.jpg"
            >
              {localStorage.getItem("firstName").charAt(0)}
            </Avatar>
          ) : (
            <MenuIcon sx={{ color: "black", fontSize: "30px" }} />
          )}
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
