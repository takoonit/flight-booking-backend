import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking, PassengerDetails } from './interfaces/booking.interface';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: number): Promise<Booking | undefined> {
    return this.bookingsService.getBookingById(id);
  }

  @Post()
  async createBooking(
    @Body('flightId') flightId: number,
    @Body('passengerDetails') passengerDetails: PassengerDetails,
    @Body('paymentChannel') paymentChannel: 'CreditCard' | 'PayPal' | 'BankTransfer',
    @Body('amount') amount: number,
    @Body('travelDate') travelDate: string,
  ): Promise<Booking> {
    return this.bookingsService.createBooking(flightId, passengerDetails, paymentChannel, amount, travelDate);
  }
}
