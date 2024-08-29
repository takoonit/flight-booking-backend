import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { BookingRepositoryInterface } from './interfaces/booking-repository.interface';
import { PaymentService } from '../payments/payments.service';
import { Booking, PassengerDetails } from './interfaces/booking.interface';
import { PaymentInfo } from '../payments/interfaces/payment.interface';
import { BOOKING_REPOSITORY_TOKEN } from './bookings.constant';
@Injectable()
export class BookingsService {
  constructor(
    // Inject the BookingRepository using the BOOKING_REPOSITORY_TOKEN
    @Inject(BOOKING_REPOSITORY_TOKEN)
    private readonly bookingRepository: BookingRepositoryInterface,
    private readonly paymentService: PaymentService, // Inject the PaymentService
  ) {}

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookingRepository.findById(id);
  }

  async createBooking(
    flightId: number,
    passengerDetails: PassengerDetails,
    paymentChannel: 'CreditCard' | 'PayPal' | 'BankTransfer',
    amount: number,
    travelDate: string,
  ): Promise<Booking> {
    try {
      // Process the payment
      const paymentInfo: PaymentInfo = await this.paymentService.processPayment(amount, paymentChannel);

      // Create the booking only after successful payment processing
      const newBooking: Booking = {
        id: 0, // ID will be set by MongoDB
        flightId,
        passengerDetails,
        paymentInfo,
        travelDate,
      };

      return this.bookingRepository.create(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new BadRequestException('Failed to create booking');
    }
  }
}
