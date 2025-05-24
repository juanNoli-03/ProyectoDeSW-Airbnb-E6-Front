import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccomodationService from '../../service/AccomodationService';
import BookingService from '../../service/BookingService';
import { Accommodation } from '../../model/Accomodation';
import { PaymentMethod, Booking } from '../../model/Booking';
import UserService from '../../service/UserService';

const AccommodationDetail = () => {
  const { id: accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDITO);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const email = localStorage.getItem("email");
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    if (accommodationId) fetchAccommodation();
  }, [accommodationId]);

  useEffect(() => {
    if (!email) return;
    
    UserService.getUserData(email).then((res) => {
      setUserData(res.data);
    });
  }, [email])

  const fetchAccommodation = async () => {
    try {
      const res = await AccomodationService.getAccommodation(accommodationId!);
      setAccommodation(res.data);
    } catch {
      setError("No se pudo cargar el alojamiento.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!accommodation || !startDate || !endDate || !userData) return;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      setBookingSuccess("Las fechas seleccionadas no son válidas.");
      return;
    }

    const booking: Booking = {
      startDate: start.toISOString().split('.')[0],
      endDate: end.toISOString().split('.')[0],
      numberOfGuests,
      numberOfNights: nights,
      finalAmount: (nights * accommodation.pricePerNight),
      paymentMethod,
      rating: 0,
      accommodation: { idAccommodation: Number(accommodationId) },
      user: { idUser: userData.idUser },
    };

    try {
      await BookingService.createBooking(booking);
      setBookingSuccess("Reserva realizada con éxito 🎉");
    } catch {
      setBookingSuccess("Error al realizar la reserva.");
    }
  };

  const renderStars = (rating: number = 0) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#ffc107', fontSize: '2rem' }}>{'★'.repeat(full)}</span>
        <span style={{ color: '#ccc', fontSize: '2rem' }}>{'★'.repeat(empty)}</span>
        <span style={{ margin: "5px 0 0 5px" }}><strong>{rating}/5</strong></span>
      </div>
    );
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!accommodation) return <p style={{ textAlign: 'center' }}>No se encontró el alojamiento.</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ marginBottom: 10 }}>{accommodation.title}</h2>
      {accommodation.imageUrl && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <img
            src={accommodation.imageUrl}
            alt={accommodation.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 60%' }}>
          <p><strong>Vivienda para alquiler ubicada en {accommodation.city}, {accommodation.country}</strong></p>
          {renderStars(4)}
          <hr />
          <p>{accommodation.description}</p>
        </div>

        <div style={{
          flex: '1 1 30%',
          padding: '1rem',
          border: '1px solid #ddd',
          borderRadius: '12px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            ${accommodation.pricePerNight} / noche
          </p>
          <p>{accommodation.available ? 'Disponible ✅' : 'No disponible ❌'}</p>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <label>Fecha inicio:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Fecha fin:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Huéspedes:</label>
            <input type="number" min="1" value={numberOfGuests} onChange={(e) => setNumberOfGuests(Number(e.target.value))} style={{ width: '100%', marginBottom: '0.5rem' }} />

            <label>Método de pago:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} style={{ width: '100%' }}>
              <option value={PaymentMethod.CREDITO}>Tarjeta de crédito</option>
              <option value={PaymentMethod.DEBITO}>Tarjeta de débito</option>
              <option value={PaymentMethod.TRANSFERENCIA}>Transferencia</option>
            </select>
          </div>

          <button
            onClick={handleBooking}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Reservar
          </button>

          {bookingSuccess && <p style={{ marginTop: '1rem', color: bookingSuccess.includes("éxito") ? 'green' : 'red' }}>{bookingSuccess}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
