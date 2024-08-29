import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { PaymentService } from '../payments/payments.service';
import { Booking, PassengerDetails } from './interfaces/booking.interface';
import { BOOKING_REPOSITORY_TOKEN } from './bookings.constant';
import { BookingRepository } from './repositories/booking-repository';
// Mock Booking Data
const mockBooking: Booking = {
  id: 1,
  flightId: 101,
  passengerDetails: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  },
  paymentInfo: {
    paymentChannel: 'CreditCard',
    paymentReferenceId: 'PAY-123456',
    status: 'Completed',
    amount: 300,
  },
  travelDate: '2024-09-01',
};

// Mock Payment Service
const mockPaymentService = {
  processPayment: jest.fn().mockResolvedValue({
    paymentChannel: 'CreditCard',
    paymentReferenceId: 'PAY-123456',
    status: 'Completed',
    amount: 300,
  }),
};

// Mock Booking Repository
const mockBookingRepository = {
  findAll: jest.fn().mockResolvedValue([mockBooking]),
  findById: jest.fn().mockResolvedValue(mockBooking),
  create: jest.fn().mockResolvedValue(mockBooking),
};

describe('BookingsService', () => {
  let bookingsService: BookingsService;
  let paymentService: PaymentService;
  let bookingRepository: BookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: PaymentService, useValue: mockPaymentService }, // Use the mock payment service
        { provide: BOOKING_REPOSITORY_TOKEN, useValue: mockBookingRepository }, // Use the mock repository
      ],
    }).compile();

    bookingsService = module.get<BookingsService>(BookingsService);
    paymentService = module.get<PaymentService>(PaymentService);
    bookingRepository = module.get<BookingRepository>(BOOKING_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(bookingsService).toBeDefined();
  });

  it('should return all bookings', async () => {
    const result = await bookingsService.getAllBookings();
    expect(result).toEqual([mockBooking]);
    expect(bookingRepository.findAll).toHaveBeenCalled();
  });

  it('should return a booking by ID', async () => {
    const result = await bookingsService.getBookingById(1);
    expect(result).toEqual(mockBooking);
    expect(bookingRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should create a booking with secure payment processing', async () => {
    const passengerDetails: PassengerDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    };
    const paymentChannel = 'CreditCard';
    const amount = 300;
    const travelDate = '2024-09-01';

    const result = await bookingsService.createBooking(
      101,
      passengerDetails,
      paymentChannel,
      amount,
      travelDate,
    );

    expect(result).toEqual(mockBooking);
    expect(paymentService.processPayment).toHaveBeenCalledWith(amount, paymentChannel);
    expect(bookingRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      flightId: 101,
      passengerDetails,
      paymentInfo: expect.objectContaining({
        paymentChannel: 'CreditCard',
        paymentReferenceId: 'PAY-123456',
        status: 'Completed',
        amount: 300,
      }),
      travelDate,
    }));
  });

  it('should handle payment processing failure', async () => {
    mockPaymentService.processPayment.mockRejectedValueOnce(new Error('Payment failed'));

    await expect(
      bookingsService.createBooking(101, mockBooking.passengerDetails, 'CreditCard', 300, '2024-09-01'),
    ).rejects.toThrow('Failed to create booking');
  });
});
