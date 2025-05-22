import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AccommodationDetail() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/accommodations/${id}`);
        setAccommodation(response.data);
      } catch (err) {
        setError("No se pudo cargar el alojamiento.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!accommodation) return <p>No se encontró el alojamiento.</p>;

  return (
    <div>
      <h2>{accommodation.title}</h2>
      <p>ID: {accommodation.idAccommodation}</p>
      <p>Descripción: {accommodation.description}</p>
      {/* Agrega más campos que tengas en el objeto alojamiento */}
    </div>
  );
}