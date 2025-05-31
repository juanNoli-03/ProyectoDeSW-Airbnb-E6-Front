import React from "react";
import { Box, Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
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
import { AccommodationFilters } from "../../model/AccommodationFilters";

interface Props {
  setFilters: (filtersValue: AccommodationFilters) => void;
}

export const Header = ({ setFilters }: Props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: 0,
  });

  const executeFilters = () => {
    const filters: AccommodationFilters = {
      continent: continente ?? null,
      country: pais ?? null,
      city: null,
      pricePerNight: precio ?? null,
      available: includeAll ? false : true,
      sortByPriceDesc: sortOrder === "desc",
    }

    setFilters(filters);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleNavigateLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

   const handleNavigateProfile= () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleNavigateHome = () => {
    navigate("/home");
  };

  const [continente, setContinente] = useState(null);

  const handleChangeContinente = (event) => {
    setContinente(event.target.value);
  };

  const [pais, setPais] = useState(null);

  const handleChangePais = (event) => {
    setPais(event.target.value);
  };

  const [precio, setPrecio] = useState(150);
  const sesionActiva = localStorage.getItem("sesionActiva") != null;
  const handleLogout = () => {
    setAnchorEl(null);
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
      fontWeight: "bold"
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
    borderRadius: "25px"
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

  const [sortOrder, setSortOrder] = useState("asc");
  const [includeAll, setIncludeAll] = useState(false);



  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "solid 3px #ff5a5f",
        pt: 2,
        pb: 2,
        pl: 3,
        pr: 3
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

      {!(location.pathname.startsWith("/profile") || location.pathname.startsWith("/accommodationDetails")) && (
        <Box sx={{
          display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white", boxShadow: "0 0 10px 0 grey",
          borderRadius: "45px", p: 1, pl: 2, pr: 2, gap: "10px"
        }}>
          <Box>
            <FormControl sx={selectStyle}>
              <InputLabel id="continente-label" sx={selectStyle}>Continente</InputLabel>
              <Select
                labelId="continente-label"
                id="continente-select-autowidth"
                value={continente}
                onChange={handleChangeContinente}
                autoWidth
                label="Continente"
                size="medium"
                sx={selectStyle}
              >
                <MenuItem value={undefined}>No Aplica</MenuItem>
                <MenuItem value={"Sudamerica"}>Sudamerica</MenuItem>
                <MenuItem value={"Europa"}>Europa</MenuItem>
                <MenuItem value={"Asia"}>Asia</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <FormControl sx={selectStyle}>
              <InputLabel id="pais-label" sx={selectStyle}>País</InputLabel>
              <Select
                labelId="pais-label"
                id="pais-select-autowidth"
                value={pais}
                onChange={handleChangePais}
                autoWidth
                label="Pais"
                size="medium"
                sx={selectStyle}
              >
                <MenuItem value={undefined}>No Aplica</MenuItem>
                <MenuItem value={"Argentina"}>Argentina</MenuItem>
                <MenuItem value={"Brasil"}>Brasil</MenuItem>
                <MenuItem value={"Colombia"}>Colombia</MenuItem>
                <MenuItem value={"Perú"}>Perú</MenuItem>
                <MenuItem value={"España"}>España</MenuItem>
                <MenuItem value={"Italia"}>Italia</MenuItem>
                <MenuItem value={"Alemania"}>Alemania</MenuItem>
                <MenuItem value={"Francia"}>Francia</MenuItem>
                <MenuItem value={"Japón"}>Japón</MenuItem>
                <MenuItem value={"China"}>China</MenuItem>
                <MenuItem value={"India"}>India</MenuItem>
                <MenuItem value={"Tailandia"}>Tailandia</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: 200, ml: 2, mr: 2, display: "flex", flexDirection: "row", alignItems: "center", gap: "3px" }}>
            <Slider
              aria-label="Precio por noche"
              value={precio}
              onChange={(event, newValue) => setPrecio(newValue)}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={10}
              marks
              min={10}
              max={300}
              sx={sliderStyle}
            />
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <AttachMoneyIcon></AttachMoneyIcon>
              <Typography sx={{ fontWeight: "bold" }}>{precio}</Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <FormControl sx={selectStyle}>
              <InputLabel id="order-label" sx={selectStyle}>Orden</InputLabel>
              <Select
                labelId="order-label"
                id="order-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Orden"
                sx={selectStyle}
              >
                <MenuItem value="asc">Precio (Menor a Mayor)</MenuItem>
                <MenuItem value="desc">Precio (Mayor a Menor)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeAll}
                  onChange={(e) => setIncludeAll(e.target.checked)}
                  sx={{
                    color: '#ff5a5f',
                    '&.Mui-checked': {
                      color: '#ff5a5f',
                    },
                  }}
                />
              }
              label="Incluir no disponibles"
              sx={{ ml: 1 }}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <SearchIcon onClick={executeFilters} fontSize="large" sx={{ color: "white", backgroundColor: "#ff5a5f", padding: "8px", borderRadius: "20px", cursor: "pointer" }}></SearchIcon>
          </Box>
        </Box>)}

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
              sx={{ backgroundColor: "black" }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            >
              {localStorage.getItem("firstName")?.charAt(0)}
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

export default Header;