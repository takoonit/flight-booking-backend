import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schemas/booking.schema';
import { PaymentsModule } from '../payments/payments.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from './repositories/booking-repository';
import { BookingRepositoryInterface } from './interfaces/booking-repository.interface'
import { BOOKING_REPOSITORY_TOKEN } from './bookings.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    PaymentsModule,
  ],
  providers: [
    BookingsService,
    { provide: BOOKING_REPOSITORY_TOKEN, useClass: BookingRepository },
  ],
  controllers: [BookingsController],
})
export class BookingsModule {
}
