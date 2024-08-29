import { PaymentInfo } from '../../payments/interfaces/payment.interface';

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: number;
  flightId: number;
  passengerDetails: PassengerDetails;
  paymentInfo: PaymentInfo;
  travelDate: string;
}
