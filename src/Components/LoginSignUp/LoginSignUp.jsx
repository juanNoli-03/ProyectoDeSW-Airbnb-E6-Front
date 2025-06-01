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
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function LoginSignUp({ isLogin }) {

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [usuarioRegister, setUsuarioRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
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

  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  const handleVisitante = () => {
    navigate("/");
  };
  const datosCompletos = (objeto) => {
    return Object.values(objeto).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const manejarEnvio = async () => {

    setIsLoading(false);
    setSnackbarVisibility(false);

    if (isLogin == true) {
        await axios.post("http://localhost:8080/login", {
          email: usuario.email,
          password: usuario.password,
        })
        .then (response => {
            console.log(response);
            setLoadingScreen({
              message: "Iniciando Sesión",
              duration: 2000,
            }),
            setIsLoading(true),
            setTimeout(() => {
              localStorage.setItem("sesionActiva",true);
              navigate("/");
            }, 2000)
          
          
          localStorage.setItem("firstName",response.data.firstName);
          localStorage.setItem("lastName",response.data.lastName);
          localStorage.setItem("email",response.data.email);
        })
        .catch (e => {
          console.log(e);
          setSnackbar({
            status: "error",
            message: "Datos incorrectos. Verificalos y volvé a ingresarlos.",
          });
          setSnackbarVisibility(true);
        })
        .finally( () =>{
          setUsuario({
              email: "",
              password: "",
          })
          
        })
    } else {
        await axios.post("http://localhost:8080/signUp", {
            firstName: usuarioRegister.firstName,
            lastName: usuarioRegister.lastName,
            email: usuarioRegister.email,
            password: usuarioRegister.password
        })
        .then(response =>{
          console.log(response);
           setLoadingScreen({
              message: "Registrandote",
              duration: 3000,
            }),
            setIsLoading(true)
            setTimeout(() => {
              setSnackbar({
                status: "success",
                message: "Fuiste registrado con éxito.",
              });
              setSnackbarVisibility(true);
            }, 3000)
            navigate("/login");
        })
        .catch(e => {
            console.log(e);
            console.log(e);
          setSnackbar({
            status: "error",
            message: "Ya existe un usuario registrado en el sistema con esos datos.",
          });
          setSnackbarVisibility(true);
        })
        .finally (
            setUsuarioRegister({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
        )
      }
    } 

    
    
    const [errores, setErrores] = useState({});

    const presenciaDeErrores = Object.values(errores).some(
      (valor) => valor != null
    );

    const validarCampo = (campo, valor) => {
    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

    if (campo === "email" && !patronEmail.test(valor) && valor != "") {
      setErrores((errores) => ({
        ...errores,
        email: "El formato del email no es válido.",
      }));
    }

    if (campo === "email" && (patronEmail.test(valor) || valor === "")) {
      setErrores((errores) => ({
        ...errores,
        email: null,
      }));
    }

    if (
      campo === "contraseña" &&
      (valor.length < 6 || valor.length > 20) &&
      valor != ""
    ) {
      setErrores((errores) => ({
        ...errores,
        contraseña: "La contraseña debe ser de entre 6 y 20 caracteres.",
      }));
    }

    if (
      campo === "contraseña" &&
      ((valor.length >= 6 && valor.length <= 20) || valor === "")
    ) {
      setErrores((errores) => ({
        ...errores,
        contraseña: null,
      }));
    }
  };

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
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "red",
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "red",
    },
  };

  return (
     <Container sx={{display:"flex", alignItems:"center", flexDirection:"column", p:5}}>
        <Box pb={3}>
          <img src="/assets/bannerAirbnb.png" alt="" style={{height:"120px"}}/>
        </Box>
        <Box pb={3}>
          <Button variant="contained"  onClick={handleVisitante} endIcon={<LockOpenIcon></LockOpenIcon>} sx={{borderRadius:"5px", backgroundColor: "#ff5a5f", fontWeight:"bold" }}>
            Soy visitante!</Button>
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
                error={Boolean(errores.email)}
                helperText={errores.email}
                onChange={(e) =>
                  isLogin === true
                    ? setUsuario({ ...usuario, email: e.target.value })
                    : setUsuarioRegister({
                        ...usuarioRegister,
                        email: e.target.value,
                      })
                }
                onBlur={(e) => validarCampo("email", e.target.value)}
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
                  helperText={errores.contraseña}
                  error={Boolean(errores.contraseña)}
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
                  onBlur={(e) => validarCampo("contraseña", e.target.value)}
                  sx={textFieldStyle}
                />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#ff5a5f",
                  fontWeight:"bold",
                  "&.Mui-disabled": {
                    backgroundColor: "#cdcdcd",
                    color: "#666",
                    fontWeight:"bold"
                  },
                }}
                disabled={
                  !datosCompletos(
                    isLogin === true
                      ? usuario
                      : usuarioRegister
                  ) || presenciaDeErrores
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
      {!isLogin &&
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", pt:3}}>
          <Typography
            variant="p"
            color="black"
          >
            ¿Ya tenes una cuenta?{"\n"}
          </Typography>
          <Typography
            variant="p"
            fontWeight="bold"
            color="#ff5a5f"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleNavigateLogin}
          >
            Inicia sesión acá
          </Typography>
        </Box>
      }

      {isLogin && 
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", pt:3}}>
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
    </Container>
  );
}

LoginSignUp.propTypes = {
  isLogin: PropTypes.string.isRequired,
};
