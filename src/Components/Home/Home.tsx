import { useEffect, useState } from 'react';
import axios from "axios";
import { Box, Container, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { AccommodationFilters } from '../../model/AccommodationFilters';
import AccomodationService from '../../service/AccomodationService';
import { Accommodation } from '../../model/Accomodation';
import PersonIcon from "@mui/icons-material/Person";

interface Props{
  filters: AccommodationFilters
}

export default function Home({filters}: Props) {
  const [accommodationsSudamerica, setAccommodationsSudamerica] = useState<Accommodation[]>([]);
  const [accommodationsEuropa, setAccommodationsEuropa] = useState<Accommodation[]>([]);
  const [accommodationsAsia, setAccommodationsAsia] = useState<Accommodation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filters) return;
    console.log("Updated filters in Home -> ", filters)
    AccomodationService.filterAccommodations(filters).then((res) => {
      console.log("Filtered accommodations response:", res.data);  
    });
    
  }, [filters])

  const handleAccommodationDetail = (id) =>{
    navigate(`/accommodationDetails/${id}`);
  }

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
      <Container sx={{display:"flex", flexDirection:"column", m:2, p:3}}  >
        <Box>
          <h1>Alojamientos populares en Sudamérica</h1>
        </Box>
        <Box>
          <Divider sx={{p:0.5, width:"118%",  borderBottomWidth: 2}}></Divider>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", pt:2, gap:"30px", width:"120%"}} > 
          {accommodationsSudamerica.map((accommodation, index) => (
            <Box key={index} sx={{display:"flex", flexDirection:"column", gap:"5px"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px", cursor:"pointer"}} onClick={()=> handleAccommodationDetail(accommodation.idAccommodation)} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
                <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                  <Box sx={{display:"flex", alignSelf:"start"}}>
                    <p style={{fontSize:"15px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD por noche</p>
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", gap:"5px"}}>
                    <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"2px"}}>
                      <PersonIcon sx={{color:"grey", fontSize:"20px", cursor:"pointer", "&:hover":{color:"red"}}}/>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>{accommodation.numberOfGuests}</p>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"20px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>5</p>
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
            <Box sx={{display:"flex", flexDirection:"column", gap:"5px"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px", cursor:"pointer"}}
                onClick={()=> handleAccommodationDetail(accommodation.idAccommodation)} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
              <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                  <Box sx={{display:"flex", alignSelf:"start"}}>
                    <p style={{fontSize:"15px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD por noche</p>
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", gap:"5px"}}>
                    <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"2px"}}>
                      <PersonIcon sx={{color:"grey", fontSize:"20px", cursor:"pointer", "&:hover":{color:"red"}}}/>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>{accommodation.numberOfGuests}</p>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"20px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>5</p>
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
            <Box sx={{display:"flex", flexDirection:"column", gap:"5px"}}>
              <img src={`../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`} alt="" style={{borderRadius:"15px", width:"250px", 
                height:"220px", cursor:"pointer"}}
                onClick={()=> handleAccommodationDetail(accommodation.idAccommodation)} 
              />
              <h5>{accommodation.title}</h5>
              <Divider sx={{backgroundColor:"#ff5a5f"}}></Divider>
             <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                  <Box sx={{display:"flex", alignSelf:"start"}}>
                    <p style={{fontSize:"15px", color:"grey"}}><b>${accommodation.pricePerNight}</b> USD por noche</p>
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", gap:"5px"}}>
                    <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"2px"}}>
                      <PersonIcon sx={{color:"grey", fontSize:"20px", cursor:"pointer", "&:hover":{color:"red"}}}/>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>{accommodation.numberOfGuests}</p>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", gap:"2px"}}>
                      <StarIcon sx={{fontSize:"20px", color:"gold"}}></StarIcon>
                      <p style={{fontSize:"15px", color:"grey", fontWeight:"bold"}}>5</p>
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