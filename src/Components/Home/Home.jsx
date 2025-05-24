import { useEffect, useState } from 'react';
import axios from "axios";
import { Box, Container, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



export default function Home() {
  const [accommodationsSudamerica, setAccommodationsSudamerica] = useState([]);
  const [accommodationsEuropa, setAccommodationsEuropa] = useState([]);
  const [accommodationsAsia, setAccommodationsAsia] = useState([]);

  //const navigate = useNavigate();

  const fetchAccommodationsSudamerica = async () => {
    try {
      const response = await axios.get("http://localhost:8080/accommodationsByContinent/Sudamérica");
      setAccommodationsSudamerica(response.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const fetchAccommodationsEuropa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/accommodationsByContinent/Europa");
      setAccommodationsEuropa(response.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const fetchAccommodationsAsia = async () => {
    try {
      const response = await axios.get("http://localhost:8080/accommodationsByContinent/Asia");
      setAccommodationsAsia(response.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  useEffect(() => {
    fetchAccommodationsSudamerica();
    fetchAccommodationsEuropa();
    fetchAccommodationsAsia();
  }, []);

  return (
    <>
      <Container sx={{display:"flex", flexDirection:"column", m:2, p:3}}>
        <Box>
          <h1>Alojamientos populares en Sudamérica</h1>
        </Box>
        <Box>
          <Divider sx={{p:0.5, width:"118%",  borderBottomWidth: 2}}></Divider>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", pt:2, gap:"30px", width:"120%"}}> 
          {accommodationsSudamerica.map((accommodation) => (
            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", cursor:"pointer"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px"}} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
              <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Box>
                  <p style={{fontSize:"13px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD <p>por noche</p></p>
                </Box>
                 <Box>
                    <FavoriteBorderIcon sx={{color:"grey", fontSize:"20px", "&:hover":{color:"red"}}}></FavoriteBorderIcon>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"15px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"13px", color:"grey"}}>5</p>
                    </Box>
                </Box>
              </Box>
            </Box>
          ))}          
        </Box>
      </Container>

       <Container sx={{display:"flex", flexDirection:"column", m:2, p:3}}>
        <Box>
          <h1>Alojamientos populares en Europa</h1>
        </Box>
        <Box>
          <Divider sx={{p:0.5, width:"118%",  borderBottomWidth: 2}}></Divider>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", pt:2, gap:"30px", width:"120%"}}> 
          {accommodationsEuropa.map((accommodation) => (
            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", cursor:"pointer"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px"}} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
              <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Box>
                  <p style={{fontSize:"13px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD <p>por noche</p></p>
                </Box>
                 <Box>
                    <FavoriteBorderIcon sx={{color:"grey", fontSize:"20px", "&:hover":{color:"red"}}}></FavoriteBorderIcon>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"15px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"13px", color:"grey"}}>5</p>
                    </Box>
                </Box>
              </Box>
            </Box>
          ))}          
        </Box>
      </Container>

      <Container sx={{display:"flex", flexDirection:"column", m:2, p:3}}>
        <Box>
          <h1>Alojamientos populares en Asia</h1>
        </Box>
        <Box>
          <Divider sx={{p:0.5, width:"118%",  borderBottomWidth: 2}}></Divider>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", pt:2, gap:"30px", width:"120%"}}> 
          {accommodationsAsia.map((accommodation) => (
            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", cursor:"pointer"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px"}} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
              <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Box>
                  <p style={{fontSize:"13px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD <p>por noche</p></p>
                </Box>
                 <Box>
                    <FavoriteBorderIcon sx={{color:"grey", fontSize:"20px", "&:hover":{color:"red"}}}></FavoriteBorderIcon>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"15px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"13px", color:"grey"}}>5</p>
                    </Box>
                </Box>
              </Box>
            </Box>
          ))}          
        </Box>
      </Container>
    </>
  );
}