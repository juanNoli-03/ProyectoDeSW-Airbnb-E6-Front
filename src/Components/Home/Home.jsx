import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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

  const handleClick = (accommodation) => {
    navigate(`/accommodationDetails/${accommodation.idAccommodation}`);
  };

  return (
    <>
      {accommodations.map((accommodation) => (
        <div key={accommodation.id}>
          {accommodation.id} -{" "}
          <span
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            onClick={() => handleClick(accommodation)}
          >
            {accommodation.title}
          </span>
        </div>
      ))}
    </>
  );
}