import { useEffect, useState } from 'react'
import axios from "axios";

export default function Home() {

  const [accommodations, setAccommodationts] = useState([]);

  useEffect(() => {
    
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/accommodations");
        setAccommodationts(response.data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
  };
  
  fetchAccommodations();
  }, []);

  return (
    <>
    {accommodations.map((accommodation) => (
      
      <div>{accommodation.id} - {accommodation.title}</div>

    ))}
    </>
  )
}
