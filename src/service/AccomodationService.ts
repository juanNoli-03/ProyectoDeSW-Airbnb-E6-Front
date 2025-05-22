import axios from "axios";
import { Constants } from "../constants";

class AccommodationService {
    getAccommodation(id: string){
        return axios.get(`${Constants.BASE_URL}/accommodations/${id}`);
    }
}

export default new AccommodationService();