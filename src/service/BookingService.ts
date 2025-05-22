import axios from "axios";
import { Constants } from "../constants";

class BookingService {
    createBooking(payload: any){
        return axios.post(`${Constants.BASE_URL}/booking`, payload);
    }
}

export default new BookingService();