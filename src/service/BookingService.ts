import axios from "axios";
import { Constants } from "../constants";

class BookingService {
    createBooking(payload: any){
        return axios.post(`${Constants.BASE_URL}/booking`, payload);
    }

    updateBookingRating(booking, value: number ){
        return console.log(value);  //axios.post(`${Constants.BASE_URL}/booking`, payload);
    }

    getAllBookingsByUser(idUser :string){
        return axios.get(`http://localhost:8080/user/bookings/${idUser}`);
    }

    getPastBookingsByUser(idUser :string){
        return axios.get(`http://localhost:8080/user/bookingsPast/${idUser}`);
    }

    getFutureBookingsByUser(idUser :string){
        return axios.get(`http://localhost:8080/user/bookingsFuture/${idUser}`);
    }
    getInProgressBookingsByUser(idUser :string){
        return axios.get(`http://localhost:8080/user/bookingsInProgress/${idUser}`);
    }
}

export default new BookingService();