import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { InputAdornment, IconButton, Box, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";

export default function LoginSignUp({ isLogin }) {
  
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [usuarioRegister, setUsuarioRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dni: ""
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });


  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };

  const datosCompletos = (objeto) => {
    return Object.values(objeto).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const manejarEnvio = async () => {
    const duration = 2000;
    setIsLoading(false);
    if (isLogin == true) {
        await axios.post("http://localhost:8080/login", {
          email: usuario.email,
          password: usuario.password,
        })
        .then (response => {
            console.log(response);
            setLoadingScreen({
              message: "",
              duration: duration,
            }),
            setIsLoading(true),
            setTimeout(() => {
              navigate("/home");
            }, duration)
        })
        .catch (e => {
          console.log(e);
        })
        .finally(
          setUsuario({
              email: "",
              password: "",
          })
        )
    } else {
        await axios.post("http://localhost:8080/signUp", {
            firstName: usuarioRegister.firstName,
            lastName: usuarioRegister.lastName,
            email: usuarioRegister.email,
            password: usuarioRegister.password,
            dni: usuarioRegister.dni
        })
        .then(response =>{
            console.log(response);
            navigate("/");
        })
        .catch(e => {
            console.log(e);
        })
        .finally (
            setUsuarioRegister({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                dni: ""
            })
        )
      }
    } 

  const textFieldStyle = {
     '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff5a5f',
      },
      '&:hover fieldset': {
        borderColor: '#ff5a5f',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff5a5f',
      },
     },
    '& label.Mui-focused': {
      color: '#ff5a5f',
    },
    '& label': {
      color: '#ff5a5f',
    },
  };

  return (
      <Container sx={{display:"flex", alignItems:"center", flexDirection:"column", p:5, gap:"20px"}}>
        <Box pb={5}>
          <img src="/assets/bannerAirbnb.png" alt="" style={{height:"120px"}}/>
        </Box>
        <Card variant="elevation" elevation={5} sx={{backgroundColor:"#fffff", borderRadius:"3px"}}>
          <CardContent sx={{display:"flex", flexDirection:"column", gap:"30px", p:5}}>
              <Typography
                    variant="h4"
                    color="black"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {isLogin === true
                      ? "Iniciar Sesión"
                      : "Registrarse"
                    }
              </Typography>
              {!isLogin && (
                <>
                  <TextField
                    id="firstName"
                    label="Nombre"
                    value={usuarioRegister.firstName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        firstName: e.target.value
                      })
                    }
                    size="small"
                    sx={textFieldStyle}
                  />
                  <TextField
                    id="lastName"
                    label="Apellido"
                    value={usuarioRegister.lastName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        lastName: e.target.value
                      })
                    }
                    size="small"
                    sx={textFieldStyle}
                  />
                </>
              )}
              <TextField
                id=""
                type="text"
                label="E-mail"
                name="email"
                size="small"
                value={
                  isLogin === true
                    ? usuario.email
                    : usuarioRegister.email
                }
                onChange={(e) =>
                  isLogin === true
                    ? setUsuario({ ...usuario, email: e.target.value })
                    : setUsuarioRegister({
                        ...usuarioRegister,
                        email: e.target.value,
                      })
                }
                sx={textFieldStyle}
              />
              <TextField
                  id=""
                  type={passwordVisibility ? "text" : "password"}
                  label="Contraseña"
                  name="contraseña"
                  size="small"
                  value={
                    isLogin == true
                      ? usuario.password
                      : usuarioRegister.password
                  }
                  onChange={(e) =>
                    isLogin === true
                      ? setUsuario({ ...usuario, password: e.target.value })
                      : setUsuarioRegister({
                          ...usuarioRegister,
                          password: e.target.value,
                        })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={changePasswordVisibility}
                          edge="end"
                          sx={{ p: 1, color: "black" }}
                        >
                          {passwordVisibility ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyle}
                />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#ff5a5f",
                  "&.Mui-disabled": {
                    backgroundColor: "#cdcdcd",
                    color: "#666",
                  },
                }}
                disabled={
                  !datosCompletos(
                    isLogin === true
                      ? usuario
                      : usuarioRegister
                  )
                }
                endIcon={
                  isLogin === true ? (
                    <LoginIcon />
                  ) : isLogin === false ? (
                    <HowToRegIcon />
                  ) : (
                    <CheckIcon />
                  )
                }
                onClick={manejarEnvio}
              >
                {isLogin === true
                  ? "Ingresar"
                  : "Crear Cuenta"
                }
              </Button>
          </CardContent>
      </Card>
      {isLogin && 
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"5px"}}>
         <Typography
            variant="p"
            color="black"
          >
            ¿Todavía no tenes una cuenta?{"\n"}
          </Typography>
          <Typography
            variant="p"
            fontWeight="bold"
            color="#ff5a5f"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleNavigateSignUp}
          >
            Registrate acá
          </Typography>
      </Box>
      }
      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
    </Container>
  );
}

LoginSignUp.propTypes = {
  isLogin: PropTypes.string.isRequired,
};
