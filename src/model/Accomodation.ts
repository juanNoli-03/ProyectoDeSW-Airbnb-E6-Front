export class Accommodation {
    idAccommodation: number;
    title: string;
    description: string;
    country: string;
    city: string;
    continent: string;
    address: string;
    pricePerNight: number;
    available: boolean;
    imageUrl: string;
    rating: number;
    numberOfGuests: number;
    accommodationDetail: AccommodationDetail;
}

export class AccommodationDetail {
    rooms: number;
    beds: number;
    bathrooms: number;
}

export enum Continent {
    SUDAMERICA = "Sudamérica",
    EUROPA = "Europa",
    ASIA = "Asia"
}