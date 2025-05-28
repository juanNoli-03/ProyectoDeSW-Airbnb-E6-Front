export class Accommodation {
    idAccommodation: number;
    title: string;
    description: string;
    country: string;
    city: string;
    address: string;
    pricePerNight: number;
    available: boolean;
    imageUrl: string;
    numberOfGuests: number;
    accommodationDetail: AccommodationDetail;
}

export class AccommodationDetail {
    rooms: number;
    beds: number;
    bathrooms: number;
}