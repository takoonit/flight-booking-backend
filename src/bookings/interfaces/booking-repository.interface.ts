import { Booking } from './booking.interface';

export interface BookingRepositoryInterface {
  findAll(): Promise<Booking[]>;
  findById(id: number): Promise<Booking | undefined>;
  create(booking: Booking): Promise<Booking>;
}
