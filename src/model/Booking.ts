export enum PaymentMethod {
    DEBITO = "DEBITO",
    CREDITO = "CREDITO",
    TRANSFERENCIA = "TRANSFERENCIA",
  }
  
export class Booking {
    idBooking?: number;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    numberOfNights: number;
    finalAmount: number;
    paymentMethod: PaymentMethod;
    rated:boolean;
    accommodation: {
        idAccommodation: number;
    };
    user: {
        idUser: number;
    };
}
  