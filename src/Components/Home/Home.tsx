import React, { useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { AccommodationFilters } from '../../model/AccommodationFilters';
import AccommodationService from '../../service/AccomodationService';
import { Accommodation, Continent } from '../../model/Accomodation';
import PersonIcon from "@mui/icons-material/Person";

interface Props {
  filters: AccommodationFilters;
}

export default function Home({ filters }: Props) {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filters) return;

    AccommodationService.filterAccommodations(filters).then((res) => {
      setAccommodations(res.data);
    }).catch((err) => {
      console.error("Unexpected error while filtering Accommodations", err)
      setAccommodations([])
    });
  }, [filters]);


  const handleAccommodationDetail = (id) => {
    navigate(`/accommodationDetails/${id}`);
  };

  const fetchAllAccommodations = async () => {
    try {
      const accommodations = await AccommodationService.getAccommodations().then((res) => {
        return res.data;
      })

      setAccommodations(accommodations);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  useEffect(() => {
    fetchAllAccommodations();
  }, []);

  const renderAccommodations = () => {
    const groupedAccommodations = accommodations.reduce((map, accommodation) => {
      const continent = accommodation.continent as Continent;
      if (!map.has(continent)) {
        map.set(continent, []);
      }
      map.get(continent)!.push(accommodation);
      return map;
    }, new Map<Continent, Accommodation[]>());

    return Object.values(Continent).map((continent) => {
      const accommodationsInContinent = groupedAccommodations.get(continent) || [];
      if (!accommodationsInContinent.length) return null;

      return (
        <Container sx={{ display: "flex", flexDirection: "column", m: 2, p: 3 }}>
          <Box>
            <h1>Alojamientos populares en {continent}</h1>
          </Box>
          <Box>
            <Divider sx={{ p: 0.5, width: "118%", borderBottomWidth: 2 }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", pt: 2, gap: "30px", width: "120%" }}>
            {accommodationsInContinent.map((accommodation, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <img
                  src={`../../../public/assets/${accommodation.imageUrl}/${accommodation.imageUrl}.jpg`}
                  alt=""
                  style={{ borderRadius: "15px", width: "250px", height: "220px", cursor: "pointer" }}
                  onClick={() => handleAccommodationDetail(accommodation.idAccommodation)}
                />
                <h5>{accommodation.title}</h5>
                <Divider sx={{ backgroundColor: "#ff5a5f" }} />
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ alignSelf: "start" }}>
                    <p style={{ fontSize: "15px", color: "grey" }}><b>${accommodation.pricePerNight}</b> USD por noche</p>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2px" }}>
                      <PersonIcon sx={{ color: "grey", fontSize: "20px", cursor: "pointer", "&:hover": { color: "red" } }} />
                      <p style={{ fontSize: "15px", color: "grey", fontWeight: "bold" }}>{accommodation.numberOfGuests}</p>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "2px" }}>
                      <StarIcon sx={{ fontSize: "20px", color: "gold" }} />
                      <p style={{ fontSize: "15px", color: "grey", fontWeight: "bold" }}>{accommodation.rating.toFixed(1)}</p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      );
    })
  };

  return (
    <>
      {accommodations.length === 0 ? (
        <Container sx={{ mt: 4, textAlign: 'center' }}>
          <h2>No se encontraron alojamientos.</h2>
        </Container>
      ) : (
        renderAccommodations()
      )}
    </>
  );
}
