import { Schema } from 'mongoose';
// This schema represents the structure of a booking document
export const BookingSchema = new Schema({
  flightId: { type: Number, required: true },
  passengerDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentInfo: {
    cardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  travelDate: { type: String, required: true },
});
