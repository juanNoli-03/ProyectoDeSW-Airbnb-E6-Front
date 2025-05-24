import axios from "axios";
import { Constants } from "../constants";

class AccommodationService {
    getAccommodation(id: string){
        return axios.get(`${Constants.BASE_URL}/accommodations/${id}`);
    }
    getAccommodations(){
        return axios.get(`${Constants.BASE_URL}/accommodations`);
    }
}

export default new AccommodationService();