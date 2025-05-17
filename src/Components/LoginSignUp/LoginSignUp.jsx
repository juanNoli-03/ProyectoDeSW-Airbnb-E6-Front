import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
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

  const [errores, setErrores] = useState({});

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };

  const datosCompletos = (objeto) => {
    return Object.values(objeto).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

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

  const manejarEnvio = async () => {
    if (isLogin == true) {
        await axios.post("http://localhost:8080/login", {
          email: usuario.email,
          password: usuario.password,
        })
        .then (response => {
            console.log(response);
            navigate("/home");
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
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#6655D9",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#505050",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#BBBBBB",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6655D9",
    },
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "red",
    },
    "& .MuiInputBase-input": {
      color: "#BBBBBB",
      "&:focus": {
        color: "#BBBBBB",
      },
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "red",
    },
  };

  return (
      <Container sx={{display:"flex", justifyContent:"center", p:5}}>
        <Box>
          <img src="/assets/bannerAirbnb.png" alt="" style={{height:"120px"}}/>
        </Box>
      </Container>
  );
}

LoginSignUp.propTypes = {
  isLogin: PropTypes.string.isRequired,
};
