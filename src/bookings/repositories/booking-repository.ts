import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../interfaces/booking.interface';
import { BookingRepositoryInterface } from '../interfaces/booking-repository.interface';

@Injectable()
export class BookingRepository implements BookingRepositoryInterface {
  constructor(@InjectModel('Booking') private readonly bookingModel: Model<Booking>) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: number): Promise<Booking | undefined> {
    return this.bookingModel.findOne({ id }).exec();
  }

  async create(booking: Booking): Promise<Booking> {
    const newBooking = new this.bookingModel(booking);
    return newBooking.save();
  }
}
