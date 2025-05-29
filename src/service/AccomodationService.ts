import axios from "axios";
import { Constants } from "../constants";
import { AccommodationFilters } from "../model/AccommodationFilters";
import { Accommodation } from "../model/Accomodation";

class AccommodationService {
    getAccommodation(id: string) {
        return axios.get(`${Constants.BASE_URL}/accommodations/${id}`);
    }
    getAccommodations() {
        return axios.get(`${Constants.BASE_URL}/accommodations`);
    }

    getAccommodationsByCity(city: String) {
        return axios.get(`${Constants.BASE_URL}/accommodationsByCity/${city}`);
    }

    getAccommodationsByContinent(continent: String) {
        return axios.get(`${Constants.BASE_URL}/accommodationsByContinent/${continent}`);
    }

    getAccommodationsByAvailable() {
        return axios.get(`${Constants.BASE_URL}/accommodationsByAvailableTrue`);
    }

    filterAccommodations(filters: AccommodationFilters) {
        return axios.get<Accommodation[]>(`${Constants.BASE_URL}/filterAccommodations`, {
            params: filters
        });
    }

}

export default new AccommodationService();