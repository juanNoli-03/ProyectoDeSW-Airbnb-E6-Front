import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { dialogClasses } from '@mui/material';

export default function Home() {
  const [accommodations, setAccommodations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/accommodations");
        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };
    fetchAccommodations();
  }, []);

  console.log(localStorage.getItem("sesionActiva") ==null  );
  const handleClick = (accommodation) => {
    navigate(`/accommodationDetails/${accommodation.idAccommodation}`);
  };

  return (
    <>


      <div   style={{padding:"55px"}}>

            <div style={{marginLeft: "250px", marginRight:"250px", border: 
              "2px solid #ccc", borderRadius:"40px",padding:"25px", display:"flex",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)"}}> 
              
              <div style={{marginLeft:"20px"}}>
              <p>pongan filtros</p>
              </div>
              <div style={{marginLeft:"20px"}}>
              <p>muertos</p>
              </div>
              <div style={{marginLeft:"20px"}}>
              <p>aguante chaca</p>
              </div>
              <div style={{marginLeft:"20px"}}>
                <img
                src="../../../public/assets/chaca.png"
                 alt=""
                  style={{ height: "35px", width: "110px" }}
                 />
              </div>

            </div>

     </div>


    <h1 style={{marginLeft:"20px", marginBottom:"30px"}}>Alojamientos disponibles</h1>
    
   <div style={{ marginLeft:"100px", display: "flex", flexWrap: "wrap", gap: "30px" }}>
       {accommodations.map((accommodation) => (

      <div
      key={accommodation.idAccommodation}
      onClick={() => handleClick(accommodation)}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        width: "250px",
        cursor: "pointer",
        marginBottom: "16px",
        borderRadius: "8px"
      }}
    >
        <div style={{
        border: "1px solid #ccc",
        padding: "70px",
        marginLeft:"20px",
        marginRight:"20px",
        cursor: "pointer",
        marginBottom: "16px",
        borderRadius: "8px"
      }}>

          <p>FOTO</p>

        </div>

      <h3>{accommodation.title}</h3>
      <p>Descripción: {accommodation.description}</p>
      <p>Ubicación: {accommodation.city}, {accommodation.country}</p>
      <p>Precio por noche: ${accommodation.pricePerNight}</p>
    </div>
  )     )}
  </div>
  
    </>

  

  );
}